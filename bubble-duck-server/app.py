from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import openai
import base64
import json

openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
CORS(app)

#TODO:
# create assistant and send knowledge files made from scraper
# verify assistant capability to use knowledge file and provide correct response
# format response display

# response_storage = json.dumps({"choices":[{"finish_reason":"stop","index":0,"message":{"content":"In the photo, you can see the following skincare products:\n\n1. La Roche-Posay Anthelios Mineral Tinted Sunscreen for Face SPF 30 - A tinted mineral sunscreen offering broad-spectrum protection.\n\n2. e.l.f. Skin Superfine Toner - This appears to be a facial toner, likely containing Niacinamide given the text on the packaging.\n\n3. Mario Badescu Skincare Glycolic Acid Toner - A gentle exfoliating toner designed for skincare with glycolic acid as an active ingredient.\n\n4. Laneige Cica Sleeping Mask - This is a sleeping mask that contains Centella Asiatica, also known as cica, which is typically used for its soothing and repairing properties.\n\n5. CeraVe Healing Ointment - A skin protectant ointment that contains ceramides and is used to hydrate and restore the skin's barrier. \n\nThese products seem to cover a range of skincare steps including cleansing, toning, treating, moisturizing, and protecting the skin.","role":"assistant"}}],"created":1709404284,"id":"chatcmpl-8yOQmdig5jvM7y2fbdDIEJEqjkE0P","model":"gpt-4-1106-vision-preview","object":"chat.completion","usage":{"completion_tokens":215,"prompt_tokens":780,"total_tokens":995}})

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
                "text": "Identify the skincare products in this photo. Please list them and provide the primary function of each product."
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
            # Assuming the response from OpenAI is the data to send back
            return jsonify(response_data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        

# old recommendations API call
# @app.route('/recommendations', methods=['POST'])
# def get_recommendations():
    
#     headers = {
#         "Content-Type": "application/json",
#         "Authorization": f"Bearer {openai.api_key}"
#         }

#     payload = {
#     "model": "gpt-4-vision-preview",
#     "messages": [
#         {
#         "role": "user",
#         "content": [
#             {
#             "type": "text",
#             "text": f"Based off the data provided in this JSON response below, what dermatologist recommended products would you suggest adding to this skincare routine? Please provide a list of brand names for each type of product, and a short reason why each type of product is important." 
#             },
#         ]
#         }
#     ],
#     "max_tokens": 1024
#     }

#     try:
#         response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
#         response_data = response.json()
#         # Assuming the response from OpenAI is the data to send back
#         return jsonify(response_data), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

@app.route('/schedule', methods=['POST'])
def get_schedule():

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
            "text": f"Please list a complete morning and nighttime skincare routine incoorporating both the user's current products, and the products you recommended. Take into account the order of application and instructions for each product." 
            },
        ]
        }
    ],
    "max_tokens": 1024
    }

    try:
        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response_data = response.json()
        print(response.json())
        # Assuming the response from OpenAI is the data you want to send back
        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
