from urllib.request import urlopen

url = "https://www.snowdesert.co.ke/resources/"

page_object = urlopen(url);

html_bytes = page_object.read();

html = html_bytes.decode('utf-8');

print(html);


