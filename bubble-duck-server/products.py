from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import json
import time

"""
This script is designed to automate the process of gathering data from specific web pages for the Bubble Duck application. It navigates to designated URLs, extracts relevant information such as product names, ingredients, and other specified data, and stores this information in a structured format for further processing or analysis.

Key Features:
- Navigates through a list of pre-defined URLs.
- Extracts and parses relevant data from the web pages using Selenium.
- Handles pagination and dynamically loaded content where applicable.
- Saves the extracted data into a JSON file for easy integration with other parts of the Bubble Duck application.

Dependencies:
- Selenium WebDriver for automated navigation and interaction with web pages.
- ChromeDriver (or another compatible driver) set up and accessible in the system PATH.

Usage Note:
- This script is intended to be used in compliance with the terms of service of the target website(s) and respects rate-limiting or other scraping policies they may have in place.
"""

def scrape_products():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # For headless operation
    driver = webdriver.Chrome(options=options)

    types = ['cleanser', 'toner', 'serum', 'moisturizer', 'sunscreen']
    base_url = 'https://incidecoder.com/search?query='
    all_products = []

    for product_type in types:
        driver.get(base_url + product_type)
        try:
            # Wait for product links to load
            product_links = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.klavika', 'klavikab lilac'))
            )
            products_info = [{
                'name': link.text.lower(),
                'href': link.get_attribute('href')
            } for link in product_links]
        except TimeoutException:
            print(f"Timed out waiting for {product_type} page to load")
            continue
        
        # Assuming CSS selectors are corrected and 'our-take-icky' class name is accurate
        for product_info in products_info:
            href = product_info['href']
            if "products" in href:
                driver.get(href)
                try:
                    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.ingred-link.black')))
                    # Initialize variables in case they're needed outside the 'try' block
                    ingredients = 'Not available'
                    brand = 'Unknown'
                    image_url = None
                    
                    ingredient_elements = driver.find_elements(By.CSS_SELECTOR, '.product-skim.fs16')  # Corrected CSS selector
                    is_product_okay = True
                    for ingredient_element in ingredient_elements:
                        parent_span = ingredient_element.find_element(By.XPATH, './..')  # Assuming this correctly finds the parent span
                        span_class = parent_span.get_attribute('class')
                        if "our-take-icky" in span_class:
                            is_product_okay = False
                            break

                    if is_product_okay:
                        product_ingredients = [element.text.strip().lower() for element in ingredient_elements]
                        ingredients = ';'.join(set(product_ingredients))  # Process ingredients only if is_product_okay
                        brand = driver.find_element(By.CSS_SELECTOR, 'a.underline').text.strip()
                        image_url = driver.find_element(By.CSS_SELECTOR, '#product-main-image img').get_attribute('src', None)
                        
                        product = {
                            'name': product_info['name'],
                            'brand': brand,
                            'type': product_type,
                            'image': image_url,
                            'ingredients': ingredients,
                        }
                        all_products.append(product)
                except TimeoutException:
                    print("Timed out waiting for ingredients to load")
                    continue
                finally:
                    driver.back()
                    time.sleep(1)

    driver.quit()

    # Write results to file
    with open('products.json', 'w') as f:
        json.dump(all_products, f, indent=2)

if __name__ == '__main__':
    scrape_products()
