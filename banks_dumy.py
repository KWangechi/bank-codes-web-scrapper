from bs4 import BeautifulSoup
from urllib.request import urlopen
import re
import json
import pandas as pd


url = "https://www.snowdesert.co.ke/resources/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

links = soup.findAll("a")

banks_list = []
bank_data_source = []
branches = []

bank_dict = {}


print(
    "Extracting bank branch info has began...Kindly wait for the process to complete..."
)

for link in links:

    bank_name = link.getText().strip("\r\t\n")

    if "Bank" in bank_name:
        banks_list.append(link.get("href"))

        # create a dictionary that will store bank name
        bank_dict[bank_name] = link.get("href")

page = urlopen(bank_dict["Family Bank"])

html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

# print(soup)

# read the table details(may need to use pandas)
tables = soup.find_all("td")

print(tables)
bank_codes = soup.find_all(width="97")
bank_branch_codes = []
branch_names = soup.find_all(width="330")
bank_branch_names = []

for bank_code in bank_codes:
    # x = bank_code.get_text()
    # print(bank_code.text)
    bank_branch_codes.append(bank_code.text)


for branch_name in branch_names:
    # x = bank_code.get_text()
    # print(branch_name.text)
    bank_branch_names.append(branch_name.text)

# new_dict = {bank_branch_names: bank_branch_names for bank_branch_codes,
#             bank_branch_codes in zip(bank_branch_names, bank_branch_codes)}
# print(new_dict)

zipped_dict = dict(zip(bank_branch_names, bank_branch_codes))
print(zipped_dict)

# table_data = []
# rows = []
# cols = []

# # open each url and get the html
# for bank in bank_dict.values():
#     page = urlopen(bank)
#     html = page.read().decode("utf-8")
#     soup = BeautifulSoup(html, "html.parser")

#     # print(soup)

#         # read the table details(may need to use pandas)
#     tables = soup.find('table')
#     # print(tables)
#     rows = tables.find_all(['tr'])
#     table_data.append(rows)

# print(table_data)

# branch_dict = {}

# for row in rows:
#     cols = row.find_all('td')

# # key = None
# for col in cols:
#     strong_tag = col.find('strong')
#     if strong_tag:
#         key = strong_tag.text.strip()

#     value = col.text.strip()
#     # print(value);
#     branch_dict[key] = value
#     print(branch_dict)

#     if branch_dict:  # Make sure it's not an empty dictionary
#         branches.append(branch_dict)

#         # store this data in a key:value pair
#         # strong - keys
#         # normal text - values

#         # for row in rows:
#         #     cols = row.find_all('td')

#         #     branch_dict = {}
#         #     key = None

#         #     for col in cols:
#         #         strong_tag = col.find('strong')
#         #         if strong_tag:
#         #             key = strong_tag.text.strip()
#         #             strong_tag.decompose()
#         #                 # Remove the <strong> tag text from the column text
#         #         value = col.text.strip()
#         #         # print(value);
#         #         branch_dict[key] = value
#         #         print(branch_dict);

#         #     # if branch_dict:  # Make sure it's not an empty dictionary
#         #     #     branches.append(branch_dict)

#         # print(branches);

#         # # get the columns of the table
#         # table_columns = tables.find('strong')

#         # # find what is between the strong tags
#         # strong_pattern = "<strong>.*?</strong>"
#         # if(table_columns):
#         #     strong_tags = table_columns.getText();
#         #     # strong_tags = re.search(strong_pattern, table_columns.getText(), re.IGNORECASE)

#         #     print(strong_tags);

#         # bank_html_text = soup.getText();
#         # print(bank_html_text);


#         # # 1. Get the branch swift code and the bank code
#         # match_swift_code = re.search(r"Swift Code:\s*([A-Za-z0-9]+)", bank_html_text, re.IGNORECASE)
#         # match_bank_code = re.search(r"Bank Code:\s*([A-Za-z0-9]+)", bank_html_text, re.IGNORECASE)

#         # if (match_swift_code or match_bank_code):
#         #     bank_swift_code = match_swift_code.group(1);
#         #     bank_code = match_bank_code.group(1);

#         #     bank_data_source.append((bank_name, bank_swift_code, bank_code));

#         #     print(bank_data_source);


#         # else:
#         #     print("No Data Found");


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
