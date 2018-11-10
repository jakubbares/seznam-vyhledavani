import requests
import json
import time

apiUrl = 'https://hackathon:AhJ4xie6lie0Opau@cqc.seznam.net/hackathon/graphql?query='

file = open('output.csv', 'a')

while True:
    try: 
        r = requests.get(apiUrl + '{live_queries}')
        qData = r.json()
        queries = []

        for q in qData['data']['live_queries']:
            queries.append(q)

        urls = []

        for query in queries:
            r = requests.get(apiUrl + '{cqp(query:"'+query+'"){correction {correctedQuery}}}')
            data = r.json()
        
            correctedQuery = data['data']['cqp']['correction']['correctedQuery']

            if correctedQuery is not None: 
                query = correctedQuery

            r = requests.get(apiUrl + '{news(query: "'+query+'", limit: 20){docId snippet {url}}}')
            data = r.json()

            if len(data['data']['news']) > 0:
                for x in data['data']['news']:
                    outStr = query + ',' + x['snippet']['url'] + ',' + x['docId'] + '\n'
                    #print(query + ',' + x['snippet']['url'] + ',' + x['docId'])
                    file.write(outStr)

        time.sleep(.2)
        print('#')
    except KeyError:
            print('it is ok now')

file.close()
        
