from lxml import html
import json
import csv
import requests

data = []

with open("unique.csv", "r", encoding="utf-8") as uf:
    reader = csv.reader(uf, delimiter = '|')
    with open("articles.csv", "w", encoding="utf-8") as af:
        writer = csv.writer(af, delimiter='|')

        for i, line in enumerate(reader):
            r = requests.get(line[1])
            tree = html.fromstring(r.content)
            try:
                text = " ".join([selector.xpath("text()")[0] for selector in tree.xpath("//p") if selector.xpath("text()")[0] is not None])
            except IndexError:
                print('saved ur ass man')
                continue
            
            print(r.encoding)
            print(text)
            print('###########################')
            writer.writerow([line[0], line[1], line[2], text])




#class NewsSpider(scrapy.Spider):
#    name = "new_Spider"
#    file = open('articles.csv', 'w', encoding="utf-8")
#    writer = csv.writer(file, delimiter='|',
#                    quotechar=' ', quoting=csv.QUOTE_MINIMAL)
#
#    def parse(self, response):
#        text = " ".join([selector.xpath("text()").extract_first() for selector in response.xpath("//p") if selector.xpath("text()").extract_first() is not None])
#        self.writer.writerow([response.url, response.css('h1.article-title::text').extract_first(), text])
