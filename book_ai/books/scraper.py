from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import requests
import time
from webdriver_manager.chrome import ChromeDriverManager



CHROMEDRIVER_PATH = "chromedriver"
API_URL = "http://127.0.0.1:8000/api/books/"


def run_scraper():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    try:
        driver.get("https://books.toscrape.com/")
        time.sleep(2)

        books = driver.find_elements(By.CLASS_NAME, "product_pod")
        links = [book.find_element(By.TAG_NAME, "a").get_attribute("href") for book in books[:5]]

        for link in links:
            try:
                driver.get(link)
                time.sleep(1)

                title = driver.find_element(By.TAG_NAME, "h1").text

                try:
                    description = driver.find_element(By.ID, "product_description").find_element(By.XPATH, "following-sibling::p").text
                except:
                    description = "No description available"

                try:
                    rating_class = driver.find_element(By.CLASS_NAME, "star-rating").get_attribute("class")
                    rating_map = {
                        "One": 1,
                        "Two": 2,
                        "Three": 3,
                        "Four": 4,
                        "Five": 5,
                    }
                    rating = 0
                    for key in rating_map:
                        if key in rating_class:
                            rating = rating_map[key]
                            break
                except:
                    rating = 0

                data = {
                    "title": title,
                    "author": "Unknown",
                    "description": description,
                    "rating": rating,
                    "book_url": link,
                }

                response = requests.post(API_URL, json=data)
                print(f"Sent: {title} | Status: {response.status_code}")

            except Exception as e:
                print(f"Error: {e}")

        driver.quit()

    except Exception as e:
        print(f"Fatal Error: {e}")
        driver.quit()


if __name__ == "__main__":
    run_scraper()