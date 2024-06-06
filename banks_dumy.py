from pypdf import PdfReader
import json

reader = PdfReader('Bank-and-Branches-July-2023v.pdf')
pages = reader.pages

header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]

bank_dict = {}
bank_data = []

for page in pages:
    text = page.extract_text()
    lines = text.strip().split('\n')
    
    # print(lines)
    
    if lines[0] == "Bank Name Bank Code Branch Code Branch Name":
        branches = lines[1:]

    branches = lines[0:]
    branches_info = []


    for branch in branches:
        digit_index = next((i for i, c in enumerate(branch) if c.isdigit()), None)
        if digit_index is not None:
            bank_name = branch[:digit_index].strip()
            bank_code = branch[digit_index:digit_index+3].strip()
            branch_code = branch[digit_index+3:digit_index+6]
            branch_name = branch[digit_index+6:].strip()
            
            # print(bank_name)
            if bank_name not in bank_dict and branch_code not in bank_dict:
                bank_dict = {
                    'bank_name': bank_name,
                    'bank_code': bank_code,
                    'branches': [
                        {
                            'branch_code': branch_code,
                            'branch_name': branch_name
                        }
                    ]
                }
            bank_data.append(bank_dict)
        else:
            bank_name = branch
            bank_code = ""
            branch_code = ""
            branch_name = ""
            
        # only include what is unique
        # bank_dict format
        # bank_dict = {
        #     'bank_name': 'Bank 1',
        #     'bank_code': '001',
        #     'branches': [
        #         {
        #             'branch_code': 'Branch 1',
        #             'branch_name': 'Branch 1 Name'
        #         }
        #     ]
        # }
        # bank_dict = dict(zip(header, [bank_name, bank_code, branch_code, branch_name]))
        # bank_data.append(bank_dict)
        
print(bank_data)

# Print the bank_data to verify
# print(json.dumps(bank_data, indent=4))

# Write the entire list to the JSON file
with open("banks_info.json", "w") as f:
    json.dump(bank_data, f, indent=4)

