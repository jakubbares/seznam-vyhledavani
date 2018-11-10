import requests
import json
import csv

apiUrl = 'https://hackathon:AhJ4xie6lie0Opau@cqc.seznam.net/hackathon/graphql?query='

with open('agregated.csv', 'a') as af:
    writer = csv.writer(af, delimiter='|')

    urls = []

    with open('keywords.csv', 'r') as keywords:
        reader = csv.reader(keywords, delimiter='|')
        try: 
            for i, line in enumerate(reader):
                category = line[0]
                query = line[1]

                r = requests.get(apiUrl + '{news(query: "'+query+'", limit: 100){docId snippet {url description title} attributes {rssPublicationDate}}}')
                data = r.json()

                if len(data['data']['news']) > 0:
                    for x in data['data']['news']:
                        writer.writerow([category, query, x['docId'], x['snippet']['url'], x['snippet']['title'], x['snippet']['description'], x['attributes']['rssPublicationDate']])
                        
            print('#')
        except KeyError:
                print('it is ok now')
