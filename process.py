import csv
import json
import requests
from PIL import Image
from io import BytesIO
from tqdm import tqdm

base = "https://media.mist-toad.ts.net:8890/api/"

def write_pillows():
    r = requests.get(base + 'collections/Pillows/records?perPage=1000')
    data = []

    for item in tqdm(r.json()['items']):
        collectionID = item['collectionId']
        itemID = item['id']
        name = item["Image"][1]
        url = base + "files/" + collectionID + "/" + itemID + "/" + name
        i = Image.open(BytesIO(requests.get(url).content))
        i.save("./static/img/" + name)

        data.append([item["Name"], name, item["Quantity"]])

    with open('./_data/products.csv', 'w') as csvfile:
        wr = csv.writer(csvfile)
        wr.writerow(['Name', 'Image', 'Quantity'])
        for item in data:
            wr.writerow(item)

def write_cafes():
    r = requests.get(base + 'collections/Cat_Cafes/records?perPage=1000&filter=(closed=false)')
    data = []

    for item in tqdm(r.json()["items"]):
        data.append({
                "name": item['Name'],
                "street1": item['Street_1'],
                "street2": item['Street_2'],
                "zipcode": item['Zipcode'],
                "city": item['City'],
                "state": item['State'],
                "country": item['Country'],
                "email": item['Email'],
                "phone_number": item['Phone_Number'],
                "monday_hours": item['Monday'],
                "tuesday_hours": item['Tuesday'],
                "wednesday_hours": item['Wednesday'],
                "thursday_hours": item["Thursday"],
                "friday_hours": item["Friday"],
                "saturday_hours": item["Saturday"],
                "sunday_hours": item["Sunday"],
                "link": item["Website"],
                "hour_price": item["Pricing"],
        })

    with open('_data/data.json', 'w') as file:
        file.write(json.dumps(data))
if __name__ == "__main__":
    write_pillows()
    write_cafes()
