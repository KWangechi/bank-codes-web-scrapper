from pypdf import PdfReader
import json

# import requests
# from requests.structures import CaseInsensitiveDict


# url = 'https://api.geoapify.com/v1/geocode/search?name=Karen Waterfront Platinum&apiKey=c4d0e19b379d4f41832576f4f0cc1790&filter=countrycode:ke&type=amenity'

# headers = CaseInsensitiveDict()
# headers["Accept"] = "application/json"

# resp = requests.get(url, headers=headers)

# # print(branch_name)
# # response_dict = resp.json
# print(resp.json())


reader = PdfReader("Bank-and-Branches-July-2023v.pdf")
pages = reader.pages

# header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]

bank_dict = {}
bank_data = []

print("Extracting bank info has started... In Progress")


for page in pages:
    text = page.extract_text()
    lines = text.strip().split("\n")

    # print(lines)

    if lines[0] == "Bank Name Bank Code Branch Code Branch Name":
        branches = lines[1:]

    branches = lines[0:]
    branches_info = []

    for branch in branches:
        digit_index = next((i for i, c in enumerate(branch) if c.isdigit()), None)
        if digit_index is not None:
            bank_name = branch[:digit_index].strip()
            bank_code = branch[digit_index : digit_index + 3].strip()
            branch_code = branch[digit_index + 3 : digit_index + 6]
            branch_name = branch[digit_index + 6 :].strip()

            # geocode the branch name and get latitude and longitude
            # url = 'https://api.geoapify.com/v1/geocode/search?text={branch_name}&apiKey=c4d0e19b379d4f41832576f4f0cc1790'
            # url = f'https://api.geoapify.com/v1/geocode/search?name={bank_name,branch_name}&apiKey=c4d0e19b379d4f41832576f4f0cc1790&filter=countrycode:ke&type=amenity'

            # headers = CaseInsensitiveDict()
            # headers["Accept"] = "application/json"

            # resp = requests.get(url, headers=headers)

            # print(branch_name)
            # print(resp.json())

            # print(bank_name)
            if bank_name not in bank_dict:
                bank_dict[bank_name] = {
                    "bank_code": bank_code,
                    "branches": [],
                }

            branch_info = {"branch_code": branch_code, "branch_name": branch_name}
            bank_dict[bank_name]["branches"].append(branch_info)

        else:
            bank_name = branch
            bank_code = ""
            branch_code = ""
            branch_name = ""

bank_list = [
    {
        "bank_name": bank_name,
        "bank_code": bank_info["bank_code"],
        "branches": bank_info["branches"],
    }
    for bank_name, bank_info in bank_dict.items()
]
# bank_data.append(bank_dict)


with open("banks_info.json", "w") as f:
    json.dump(bank_list, f, indent=4)
    
print(json.dumps(bank_list, indent=4))
