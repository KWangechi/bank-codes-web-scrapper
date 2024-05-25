from bs4 import BeautifulSoup
from urllib.request import urlopen
import re
import json
import pandas as pd


url = "https://www.snowdesert.co.ke/resources/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

links = soup.findAll('a');

banks_list = [];
bank_data_source = [];


print("Extracting bank branch info has began...Kindly wait for the process to complete...")

for link in links:

    bank_name = link.getText().strip('\r\t\n');

    if 'Bank' in bank_name:
        # bank_name = bank_name;

        # create a dictionary that will store bank name

# open each url and get the html
        page = urlopen(link.get('href'));
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
        
        
        # read the table details(may need to use pandas)
        tables = soup.find('table');
        print(tables);
            
            
        bank_html_text = soup.getText();
        

        # # 1. Get the branch swift code and the bank code
        # match_swift_code = re.search(r"Swift Code:\s*([A-Za-z0-9]+)", bank_html_text, re.IGNORECASE)
        # match_bank_code = re.search(r"Bank Code:\s*([A-Za-z0-9]+)", bank_html_text, re.IGNORECASE)
        
        # if (match_swift_code or match_bank_code):
        #     bank_swift_code = match_swift_code.group(1);
        #     bank_code = match_bank_code.group(1);
            
        #     bank_data_source.append((bank_name, bank_swift_code, bank_code));
            
        #     print(bank_data_source);
            
            
        # else:
        #     print("No Data Found");


# print(len(bank_data_source));

# for new_bank_name, new_bank_swift_code, new_bank_code in bank_data_source:
#     # create a dictionary that will store this data and display it
#             bank_dict = {
#                 'bank_name': new_bank_name,
#                 'bank_swift_code': new_bank_swift_code,
#                 'bank_code': new_bank_code
#             }
            
#             banks_list.append(bank_dict)
#             print(banks_list)
#             # write this ditionary into a json
#             # banks_json
#             with open("banks.json", "w") as json_file:
#                 json.dump(banks_list, json_file)   
 

