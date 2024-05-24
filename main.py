from bs4 import BeautifulSoup
from urllib.request import urlopen

url = "https://www.snowdesert.co.ke/resources/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

links = soup.findAll('a');

for link in links:

    bank_name = link.getText().strip('\r\t\n');

    if 'Bank' in bank_name:
        print(bank_name);
        # print(link.get('href'));
    # print(bank_name);
    # print(link.get('href'));

# print(soup.findAll('a'))

# print(soup);
# print(soup.getText());

# html_text = soup.getText()

# # display text that has the word bank only
# banks = soup.find_all("Bank");

# print(banks);

