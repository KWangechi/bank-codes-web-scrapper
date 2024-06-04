from pypdf import PdfReader
reader = PdfReader('Bank-and-Branches-July-2023v.pdf')
page = reader.pages[8]
# print(page.extract_text())
text = page.extract_text()


lines = text.strip().split('\n')
print(lines)

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

# print(branch_data)
