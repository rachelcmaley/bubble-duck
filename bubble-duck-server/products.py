from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
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
    options.add_argument('--headless')  
    driver = webdriver.Chrome(options=options)

    types = ['cleanser']
    base_url = 'https://incidecoder.com/search?query='
    all_products = []

    for product_type in types:
        current_page = 1
        has_next_page = True


        while has_next_page:
            driver.get(f"{base_url}{product_type}&ppage={current_page}")

            try:
                # Wait for product links to load
                product_links = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.klavika'))
                )
                product_hrefs = [link.get_attribute('href') for link in product_links if "products" in link.get_attribute('href')]
                for product_href in product_hrefs:
                    driver.get(product_href)
                    if "products" in product_href:
                        driver.get(product_href)
                        try:
                            WebDriverWait(driver, 10).until(
                                EC.presence_of_element_located((By.CSS_SELECTOR, '.product-skim.fs16'))
                            )
                            # Check if any ingredient is marked as 'icky'
                            if not driver.find_elements(By.CSS_SELECTOR, '.our-take.our-take-icky'):
                                product_name = driver.find_element(By.CSS_SELECTOR, 'h1').text
                                product_ingredients = [ingredient.text for ingredient in driver.find_elements(By.CSS_SELECTOR, '.ingred-link.black')]
                                ingredients = '; '.join(product_ingredients)
                                brand = driver.find_element(By.CSS_SELECTOR, 'a.underline').text.strip()
                                image_url = driver.find_element(By.CSS_SELECTOR, '#product-main-image img').get_attribute('src')

                                product = {
                                    'name': product_name,
                                    'brand': brand,
                                    'type': product_type,
                                    'image': image_url,
                                    'ingredients': ingredients,
                                }
                                all_products.append(product)
                        except TimeoutException:
                            print("Timed out waiting for product details to load.")
                        finally:
                            driver.back()
                            WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.klavika')))
                
                # Check for the next page
                try:
                    next_page_btn = driver.find_element(By.CSS_SELECTOR, 'a[href*="ppage="]')
                    if next_page_btn:
                        current_page += 1
                    else:
                        has_next_page = False
                except NoSuchElementException:
                    has_next_page = False

            except TimeoutException:
                print(f"Timed out waiting for {product_type} page to load.")
                break

    driver.quit()

    # Write results to file
    with open('products.json', 'w') as f:
        json.dump(all_products, f, indent=2)

if __name__ == '__main__':
    scrape_products()
