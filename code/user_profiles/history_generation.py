import random
import csv

with open("clusters.csv", "a") as cf:
    writer = csv.writer(cf, delimiter='|')
    for x in range(1,100, 1):
        writer.writerow([random.randint(0,9),random.randint(0,9),random.randint(0,9)])
