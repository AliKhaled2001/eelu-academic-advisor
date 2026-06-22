import os
import glob
import re
import json

data_dir = r"c:\Users\E C\OneDrive\Desktop\eelu\data"
files = glob.glob(os.path.join(data_dir, "*.xls"))

student_data = {}

# Regex to match the table row with student name and ID
# The HTML structure: 
# <td ...>1</td> <td ...>اسم الطالب</td> <td ...>كود الطالب</td>
row_pattern = re.compile(r'<td[^>]*>\s*\d+\s*</td>\s*<td[^>]*>([^<]+)</td>\s*<td[^>]*>\s*(\d{6,8})\s*</td>', re.IGNORECASE)

for file in files:
    advisor_name = os.path.basename(file).replace('.xls', '')
    with open(file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
        matches = row_pattern.findall(content)
        for match in matches:
            student_name = match[0].strip()
            student_id = match[1].strip()
            student_data[student_id] = {
                "name": student_name,
                "advisor": advisor_name
            }

output_path = r"c:\Users\E C\OneDrive\Desktop\eelu\data.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write("const studentData = " + json.dumps(student_data, ensure_ascii=False, indent=2) + ";\n")

print(f"Generated data for {len(student_data)} students.")
