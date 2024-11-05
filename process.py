import csv
import requests
from PIL import Image
from io import BytesIO

base = "https://media.mist-toad.ts.net:8890/"
r = requests.get(base + 'api/collections/Pillows/records?perPage=1000')

for item in r.json()['items']:
    collectionID = item['collectionId']
    itemID = item['id']
    name = item["Image"][1]
    url = base + "api/files/" + collectionID + "/" + itemID + "/" + name
    i = Image.open(BytesIO(requests.get(url).content))
    i.save("./static/img/" + name)

    with open('./_data/products.csv', 'a') as csvfile:
        wr = csv.writer(csvfile)
        wr.writerow([item["Name"], name, item["Quantity"]])
    
