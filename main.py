from bs4 import BeautifulSoup
from urllib.request import urlopen
import re

url = "https://www.snowdesert.co.ke/resources/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

links = soup.findAll('a');

for link in links:

    bank_name = link.getText().strip('\r\t\n');

    if 'Bank' in bank_name:
        # bank_name = bank_name;

        # create a dictionary that will store bank name
        bank_dict = {
            'bank_name': bank_name,
            'bank_link': link.get('href')
        }

# open each url and get the html
        page = urlopen(link.get('href'));
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        
        # print(soup.getText());
        # 1. Get the branch swift code and the bank code
        bank_html_text = soup.getText();
        match_results = re.search("Swift Code: ", bank_html_text, re.IGNORECASE);
        bank_code = match_results.group()
        bank

        print(bank_code);
