from urllib.request import urlopen
import re

# url = "https://www.snowdesert.co.ke/resources/"

# page_object = urlopen(url);

# html_bytes = page_object.read();

# html = html_bytes.decode('utf-8');

# # print(html);

# # find the title index

# title = html.find("<title>");

# # print(title);

# # get the title text itself
# start_index = html.find("<title>") + len("<title>");

# last_index = html.find("</title>");

# title_text = html[start_index:last_index];

# # print(title_text);

# # Lesson 2: Regular Expressions
# # extractedText = re.findall('abc', 'abccds');
# # extractedText = re.findall("a.c", 'adcyub');
# extractedText = re.findall("a*f", "afrvanmfrrfv");

# print(extractedText);

# Day 4
# Extract the title using regex: Exercide 1: Write a program that grabs the full HTML from the following URL:
# Then use .find() to display the text following Name: and Favorite Color: (not including any leading spaces or trailing HTML tags that might appear on the same line).
url_a = "http://olympus.realpython.org/profiles/dionysus"

# a) Extract the page's html
page = urlopen(url_a);

html_a = page.read().decode("utf-8");

print(html_a);

# html_a_bytes = html_a.decode('utf-8');

# print(html_a_bytes);

# b) find Name and Favourite Color
for string in ["Name: ", "Favorite Color: "]:
    string_start_index = html_a.find(string);
    text_start_index = string_start_index + len(string);

    next_index = html_a[text_start_index:].find("<");
    text_end_index = text_start_index + next_index;

    raw_text = html_a[text_start_index: text_end_index];
    clean_text = raw_text.strip("\n\t\r");

    print(clean_text);


pattern = "<title.*?>.*?</title.*?>";

html_title = re.search(pattern, html_a, re.IGNORECASE);

extractedTitle = html_title.group();
extractedTitle = re.sub("<.*?>", "", extractedTitle);


print(extractedTitle);
# title_a = re.findall("<title>(.*)</title>", html_a_bytes);

# print(title_a[0]);

# Day 5




