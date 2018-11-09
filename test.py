import requests
import json
query = "Milos"
password = "AhJ4xie6lie0Opau"
req = requests.get('https://hackathon:AhJ4xie6lie0Opau@cqc.seznam.net/hackathon/graphql?query=%7B%0A%20%20news(query%3A%20"{}"%2C%20limit%3A%2020)%20%7B%0A%20%20%20%20snippet%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A'.format(query))
data = req.json()
urls = [x['snippet']['url'] for x in data['data']['news']]
print(urls)
