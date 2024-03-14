from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import json
from bs4 import BeautifulSoup

"""
Important: run script in products.py to update products.json before running this script.
This script is designed to automate the process of gathering data from specific web pages for the Bubble Duck application. It navigates to designated URLs, extracts relevant information such as product names, ingredients, and other specified data, and stores this information in a structured format for further processing or analysis.

Key Features:
- Navigates through a list of pre-defined URLs.
- Extracts and parses relevant data from the web pages using BeautifulSoup and Selenium.
- Handles pagination and dynamically loaded content where applicable.
- Saves the extracted data into a JSON file for easy integration with other parts of the Bubble Duck application.

Dependencies:
- BeautifulSoup for parsing HTML content.
- Selenium WebDriver for automated navigation and interaction with web pages.
- ChromeDriver (or another compatible driver) set up and accessible in the system PATH.

Usage Note:
- This script is intended to be used in compliance with the terms of service of the target website(s) and respects rate-limiting or other scraping policies they may have in place.
"""

def scrape_products():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)

    # Load products.json
    with open('products.json', 'r', encoding='utf-8') as file:
        products = json.load(file)

    features = []

    for product in products:
        inputString = product['ingredients'].replace(';', '%2C+').replace(' ', '+').replace('(', '28').replace(')', '29')
        url = f"https://www.skincarisma.com/products/analyze?utf8=%E2%9C%93&product%5Bingredient%5D={inputString}"
        driver.get(url)

        # Wait for the page to load
        try:
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.effect-wrapper'))
            )
        except TimeoutException:
            print(f"Timed out waiting for the page to load for product ingredients: {inputString}")
            continue

        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')

        # Extract effects and safety
        effects = [el.get_text().strip() for el in soup.select('.effect-wrapper')]
        effectString = ''.join(effects).replace('\n', '').replace(' ', '')

        # Initialize all effect booleans as False
        acne_fighting = "Acne-Fighting" in effectString
        anti_aging = "Anti-Aging" in effectString
        brightening = "Brightening" in effectString
        uv = "UV Protection" in effectString

        # Extract safety rating
        safetyString = soup.select_one('.progress').get_text().strip()
        safety = int(safetyString.split('%')[0])

        feature = {
            'safety': safety,
            'acne_fighting': acne_fighting,
            'anti_aging': anti_aging,
            'brightening': brightening,
            'uv': uv
        }

        features.append(feature)

    # Update products with features and write to file
    for product, feature in zip(products, features):
        product.update(feature)

    with open('updated_products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2)

    driver.quit()

if __name__ == '__main__':
    scrape_products()
