# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin
# import json
# import time

# visited = set()
# data = []

# BASE_DOMAIN = "https://www.hospitalityhackathon.et/"

# def crawl(url):
#     if url in visited:
#         return
    
#     print(f"Visiting: {url}")
#     visited.add(url)

#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.text, "html.parser")

#         # Extract data (example: all H1s)
#         headings = [h1.text.strip() for h1 in soup.find_all("h1")]

#         # Store structured data
#         data.append({
#             "url": url,
#             "headings": headings
#         })

#         # Find links and crawl them
#         for link in soup.find_all("a", href=True):
#             next_url = urljoin(url, link['href'])

#             if BASE_DOMAIN in next_url:
#                 crawl(next_url)

#         time.sleep(1)  # be polite

#     except Exception as e:
#         print("Error:", e)

# # Start crawling
# crawl("https://www.hospitalityhackathon.et/")

# # Save to JSON file
# with open("output.json", "w", encoding="utf-8") as f:
#     json.dump(data, f, indent=4, ensure_ascii=False)

# print("Saved to output.json")

# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import json
# import time

# visited = set()
# data = []

# BASE_DOMAIN = "hospitalityhackathon.et"

# driver = webdriver.Chrome()

# def crawl(url):
#     if url in visited:
#         return
    
#     print(f"Visiting: {url}")
#     visited.add(url)

#     try:
#         driver.get(url)
#         time.sleep(3)  # wait for JS to load

#         # Extract headings
#         h1_elements = driver.find_elements(By.TAG_NAME, "h1")
#         headings = [h.text.strip() for h in h1_elements if h.text.strip()]

#         data.append({
#             "url": url,
#             "headings": headings
#         })

#         # Find links
#         links = driver.find_elements(By.TAG_NAME, "a")
#         for link in links:
#             href = link.get_attribute("href")

#             if href and BASE_DOMAIN in href:
#                 crawl(href)

#     except Exception as e:
#         print("Error:", e)

# # Start
# crawl("https://www.hospitalityhackathon.et/")

# # Save JSON
# with open("output.json", "w", encoding="utf-8") as f:
#     json.dump(data, f, indent=4, ensure_ascii=False)

# driver.quit()

# print("Saved to output.json")




# import json
# import time
# from urllib.parse import urljoin, urlparse

# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.options import Options

# # --- Setup ---
# BASE_DOMAIN = "kurifturesorts.com"
# START_URL = "https://kurifturesorts.com/resorts/bishoftu"

# visited = set()
# data = []

# # Headless mode (runs without opening browser window)
# options = Options()
# options.add_argument("--headless")
# options.add_argument("--disable-gpu")

# driver = webdriver.Chrome(options=options)


# def is_valid_url(url):
#     parsed = urlparse(url)
#     return parsed.netloc.endswith(BASE_DOMAIN)


# def clean_url(url):
#     # remove fragments like #section
#     return url.split("#")[0]


# def crawl(url):
#     url = clean_url(url)

#     if url in visited or not is_valid_url(url):
#         return

#     print(f"Visiting: {url}")
#     visited.add(url)

#     try:
#         driver.get(url)
#         time.sleep(2)  # wait for JS to load

#         # --- Extract FULL page text (best for analysis) ---
#         try:
#             body_text = driver.find_element(By.TAG_NAME, "body").text
#         except:
#             body_text = ""

#         # --- Extract structured content ---
#         headings = []
#         for tag in driver.find_elements(By.XPATH, "//h1 | //h2 | //h3"):
#             text = tag.text.strip()
#             if text:
#                 headings.append(text)

#         paragraphs = []
#         for tag in driver.find_elements(By.TAG_NAME, "p"):
#             text = tag.text.strip()
#             if text:
#                 paragraphs.append(text)

#         # Remove duplicates
#         headings = list(set(headings))
#         paragraphs = list(set(paragraphs))

#         # Store data
#         data.append({
#             "url": url,
#             "full_text": body_text,
#             "headings": headings,
#             "paragraphs": paragraphs
#         })

#         # --- Find and crawl links ---
#         links = driver.find_elements(By.TAG_NAME, "a")

#         for link in links:
#             href = link.get_attribute("href")

#             if not href:
#                 continue

#             href = clean_url(href)

#             if is_valid_url(href):
#                 crawl(href)

#     except Exception as e:
#         print("Error:", e)


# # --- Run crawler ---
# crawl(START_URL)

# # --- Save JSON ---
# with open("output.json", "w", encoding="utf-8") as f:
#     json.dump(data, f, indent=4, ensure_ascii=False)

# driver.quit()

# print(f"\nDone! Scraped {len(data)} pages.")
# print("Saved to output.json")

import json
import time
from urllib.parse import urljoin, urlparse
from collections import deque

import requests
from bs4 import BeautifulSoup

# --- Selenium ---
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

# ---------------- CONFIG ----------------
BASE_DOMAIN = "kurifturesorts.com"
START_URL = "https://kurifturesorts.com/resorts/bishoftu"

MAX_PAGES = 10
MAX_DEPTH = 1
REQUEST_DELAY = 1

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# ---------------- STATE ----------------
visited = set()
queue = deque([(START_URL, 0)])
data = []

session = requests.Session()
session.headers.update(HEADERS)

# ---------------- SELENIUM SETUP (HARDENED) ----------------
def create_driver():
    options = Options()

    # ⚠️ CRITICAL FLAGS (fix timeout issues)
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    # Disable heavy stuff
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-images")
    options.add_argument("--blink-settings=imagesEnabled=false")

    # Speed + stability
    options.page_load_strategy = "eager"

    driver = webdriver.Chrome(options=options)

    # Shorter timeout (fail fast instead of hanging)
    driver.set_page_load_timeout(20)

    return driver


driver = create_driver()

# ---------------- HELPERS ----------------
def is_valid_url(url):
    parsed = urlparse(url)
    return parsed.netloc.endswith(BASE_DOMAIN)


def clean_url(url):
    return url.split("#")[0]


def is_content_empty(text):
    return not text or len(text.strip()) < 200


# ---------------- FETCH ----------------
def fetch_requests(url):
    try:
        res = session.get(url, timeout=10)
        res.raise_for_status()
        return res.text
    except Exception as e:
        print(f"[REQUEST ERROR] {url} -> {e}")
        return None


def fetch_selenium(url):
    try:
        print(f"[SELENIUM] {url}")

        driver.get(url)

        # ⚡ Give small time for dynamic content
        time.sleep(3)

        # Scroll once (loads lazy content)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)

        # Extract visible text ONLY (most reliable)
        body = driver.find_element(By.TAG_NAME, "body")
        text = body.text

        return text

    except TimeoutException:
        print(f"[TIMEOUT] Retrying once: {url}")
        try:
            driver.quit()
        except:
            pass

        # recreate driver and retry once
        new_driver = create_driver()

        try:
            new_driver.get(url)
            time.sleep(3)
            text = new_driver.find_element(By.TAG_NAME, "body").text
            return text
        except Exception as e:
            print(f"[FAILED AFTER RETRY] {url} -> {e}")
            return None

    except Exception as e:
        print(f"[SELENIUM ERROR] {url} -> {e}")
        return None


def fetch_page(url):
    html = fetch_requests(url)

    if html:
        soup = BeautifulSoup(html, "html.parser")
        text = soup.get_text(strip=True)

        # If content looks empty → JS page
        if not is_content_empty(text):
            return {"type": "html", "content": html}

    # fallback to selenium
    print(f"[FALLBACK] {url}")
    text = fetch_selenium(url)

    if text:
        return {"type": "text", "content": text}

    return None


# ---------------- PARSE ----------------
def parse_html(html, url):
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.extract()

    full_text = " ".join(soup.stripped_strings)

    links = []
    for a in soup.find_all("a", href=True):
        href = clean_url(urljoin(url, a["href"]))
        if is_valid_url(href):
            links.append(href)

    return full_text, list(set(links))


# ---------------- CRAWLER ----------------
while queue and len(visited) < MAX_PAGES:
    url, depth = queue.popleft()
    url = clean_url(url)

    if url in visited or not is_valid_url(url):
        continue

    if depth > MAX_DEPTH:
        continue

    print(f"[SCRAPING] {url}")

    result = fetch_page(url)
    if not result:
        continue

    visited.add(url)

    # --- HTML CASE ---
    if result["type"] == "html":
        full_text, links = parse_html(result["content"], url)

    # --- SELENIUM CASE ---
    else:
        full_text = result["content"]
        links = []  # skip link extraction in selenium

    data.append({
        "url": url,
        "full_text": full_text[:20000]  # limit size
    })

    for link in links:
        if link not in visited:
            queue.append((link, depth + 1))

    time.sleep(REQUEST_DELAY)


# ---------------- SAVE ----------------
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

driver.quit()

print(f"\n✅ Done! Scraped {len(data)} pages.")