from pypdf import PdfReader
import json

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

            # print(bank_name)
            if bank_name not in bank_dict:
                bank_dict[bank_name] = {
                    "bank_name": bank_name,
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

        # bank_dict = dict(zip(header, [bank_name, bank_code, branch_code, branch_name]))
        # bank_data.append(bank_dict)
bank_data.append(bank_dict)

# print(bank_data)

# Print the bank_data to verify
# print(json.dumps(bank_data, indent=4))

# Write the entire list to the JSON file
with open("banks_info.json", "w") as f:
    json.dump(bank_data, f, indent=4)
