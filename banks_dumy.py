from pypdf import PdfReader
reader = PdfReader('Bank-and-Branches-July-2023v.pdf')
page = reader.pages[0]
# print(page.extract_text())
text = page.extract_text()


lines = text.strip().split('\n')
# print(lines)

# Extract header and data
# header = lines[0].split(",")

# print(header)


branches = lines[1:]


header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]
branch_data = []

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

print(branch_data)



# print(characters_before_digit)
# print(first_two_digits)
# print(remaining_digits)
# print(characters_after_digits)


# header = ["Bank Name", "Bank Code", "Branch Code", "Branch Name"]
# branch_data = []

# for branch in branches:
#     bank_name = "Kenya Commercial Bank Limited"
#     digit_index = next((i for i, c in enumerate(branch) if c.isdigit()), None)
#     if digit_index is not None:
#         bank_code = branch[digit_index:digit_index+2]
#         branch_code = branch[digit_index+2:digit_index+5]
#         branch_name = branch[digit_index+5:].strip()
#     else:
#         bank_code = ""
#         branch_code = ""
#         branch_name = branch

#     branch_dict = dict(zip(header, [bank_name, bank_code, branch_code, branch_name]))
#     branch_data.append(branch_dict)

# print(branch_data)



# Populate dictionary
# data_dict = []
# for line in data_lines:
#     parts = line.split()
#     entry = {}
#     for i in range(len(header)):
#         entry[header[i]] = parts[i]
#     data_dict.append(entry)

# print(data_dict)