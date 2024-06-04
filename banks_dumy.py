# from pypdf import PdfReader
# import json


# reader = PdfReader('Bank-and-Branches-July-2023v.pdf')
# pages = reader.pages

# for page in pages:
    
#     # print(page.extract_text())
#     text = page.extract_text()


#     lines = text.strip().split('\n')
#     # print(lines)

#     # Extract header and data
#     # header = lines[0].split(",")

#     # print(header)


#     branches = lines[1:]


#     header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]
#     branch_data = []

#     for branch in branches:
#         digit_index = next((i for i, c in enumerate(branch) if c.isdigit()), None)
#         if digit_index is not None:
#             bank_name = branch[:digit_index].strip()
#             bank_code = branch[digit_index:digit_index+3]
#             branch_code = branch[digit_index+3:digit_index+6]
#             branch_name = branch[digit_index+6:].strip()
#         else:
#             bank_name = branch
#             bank_code = ""
#             branch_code = ""
#             branch_name = ""

#         branch_dict = dict(zip(header, [bank_name, bank_code, branch_code, branch_name]))
#         branch_data.append(branch_dict)

#     # dump the dictionary into a json file

#     with open("banks_info.json", "w") as f:
#         json.dump(branch_data, f, indent=4)

#     print(branch_data)
from pypdf import PdfReader
import json

reader = PdfReader('Bank-and-Branches-July-2023v.pdf')
pages = reader.pages

header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]
branch_data = []

for page in pages:
    text = page.extract_text()
    lines = text.strip().split('\n')

    branches = lines[1:]
    print(branches)

    for branch in branches:
        digit_index = next((i for i, c in enumerate(branch) if c.isdigit()), None)
        if digit_index is not None:
            bank_name = branch[:digit_index].strip()
            bank_code = branch[digit_index:digit_index+3]
            branch_code = branch[digit_index+3:digit_index+6]
            branch_name = branch[digit_index+6:].strip()
        else:
            bank_name = branch
            bank_code = ""
            branch_code = ""
            branch_name = ""

        branch_dict = dict(zip(header, [bank_name, bank_code, branch_code, branch_name]))
        branch_data.append(branch_dict)

# Print the branch_data to verify
# print(json.dumps(branch_data, indent=4))

# Write the entire list to the JSON file
with open("banks_info.json", "w") as f:
    json.dump(branch_data, f, indent=4)

