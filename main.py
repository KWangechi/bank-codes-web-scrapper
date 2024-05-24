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
        # bank_name = bank_name;

        # create a dictionary that will store bank name
        bank_dict = {
            'bank_name': bank_name,
            'bank_link': link.get('href')
        }

# open each url and get the html
        page = urlopen(bank_dict['bank_link']);
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")

        # get the bank code
        # bank_code = soup.find('div', {'class': 'col-md-12 col-sm-12 col-xs-12'})
        print(soup.getText());

