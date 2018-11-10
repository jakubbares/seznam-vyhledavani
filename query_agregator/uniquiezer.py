import json
import csv

ids = {}
data = []

with open("output.csv", "r") as f:
    reader = csv.reader(f, delimiter=",")
    for i, line in enumerate(reader):
        try:
            if ids[str(line[2])] == 1:
                continue
        except KeyError:
            print('nothing')
        
        ids[str(line[2])] = 1
        data.append(line)

with open("unique.csv", "w") as uf:
    writer = csv.writer(uf, delimiter = '|')
    for row in data:
        writer.writerow(row)



        
        
