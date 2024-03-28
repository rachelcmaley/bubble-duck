from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import openai
import base64
import json
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import logging

openai.api_key = os.getenv('OPENAI_API_KEY')

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def handle_image_upload():
    #check for image in request
    if 'image' not in request.files:
        return 'Image not found', 400
    
    file = request.files['image']

    if file.filename == '':
        return 'No file selected', 400
    
    if file: 
        # Function to encode the image
        def encode_image(file_content):
            return base64.b64encode(file_content).decode('utf-8')

        # Getting the base64 string
        base64_image = encode_image(file.read())

        headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
        }

        payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "Identify the skincare products in this photo. Please create a numbered list with each product's name, product type('cleanser', 'toner/exfoliant', 'toner', 'exfoliant', 'serum', 'moisturizer', 'retinol', 'sunscreen') and function. Please use this format for your response: '1.Product1 name: Product1 Type - Product1 Function\n\n2.Product2 Name: Product2 Type - Product2 Function\n\n2.Product3 Name: Product3 Type - Product3 Function..etc.' "
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{base64_image}"
                }
                }
            ]
            }
        ],
        "max_tokens": 1024
        }

        try:
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            response_data = response.json()
            print(response_data)
            return jsonify(response_data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    data = request.get_json()
    if data is None or 'productTypes' not in data or 'preferences' not in data:
        return jsonify({"error": "Request body is missing or not JSON."}), 400
    
    user_product_types = set(data.get('productTypes', []))
    preferences = data.get('preferences', {})
    skin_type = preferences.get('1')
    budget = preferences.get('2')
    product_count = preferences.get('3')
    skincare_goals = preferences.get('4', [])

    base_query = "SELECT * FROM products WHERE product_type = %s"

    if product_count == "Essentials only (4 - 5 products)":
        base_query += " AND is_essential = TRUE"

    # Define a complete skincare routine
    complete_routine = set(['cleanser', 'toner', 'exfoliant', 'serum', 'moisturizer', 'retinoid', 'sunscreen'])

    # Determine what's missing from the user's routine
    missing_products = complete_routine - user_product_types

    recommendations = []
    
    try:
        # Connect to database
        conn = psycopg2.connect(
            dbname="skincare", user="postgres", password="legopizza", host="localhost"
        )
        cur = conn.cursor()

        # For each missing product, query database for recommendations
        for product_type in missing_products:
            cur.execute(base_query, (product_type,))
            product_data = cur.fetchall()

            for row in product_data:
                recommendations.append({
                    "product_id": row[0],
                    "product_type": row[1],
                    "product_brand": row[2],
                    "product_name": row[3],
                    "product_image": row[4],
                    "is_essential": row[5],
                    "sales_link": row[6],
                    "product_price": row[7],
                    "description": row[8]
                })

        cur.close()
        conn.close()

        return jsonify({"recommendations": recommendations}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/schedule', methods=['POST'])
def get_schedule():
    data = request.get_json()
    if data is None or 'currentProducts' not in data:
        return jsonify({"error": "Request body is missing the required 'currentProducts' field."}), 400

    products_list = data['currentProducts']
    products_text = "\n".join([f"{product['brand']} {product['name']}: {product['description']}" for product in products_list])

    payload = {
        "model": "gpt-3.5-turbo",  
         "messages": [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": f"Based on these skincare products:\n{products_text}\n\nPlease list a complete Morning Skincare Routine and a complete Nighttime Skincare Routine incorporating these products. Take into account the order of application and instructions for each product.",
            },
            ]
            }
        ],
        "max_tokens": 1024,
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response_data = response.json()
        print(response_data)
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)
