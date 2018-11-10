
import scrapy
import json
import csv
import pandas as pd


class DownSpider(scrapy.Spider):
    data = pd.read_csv('cleaned.csv',  sep='|')
    data.columns = ['query', 'url', 'id']
    name = 'downloader_spider'
    start_urls = data['url']
    file = open('new_articles.csv', 'w', encoding="utf-8")
    writer = csv.writer(file, delimiter='|',
                        quotechar=' ', quoting=csv.QUOTE_MINIMAL)

    def parse(self, response):
        text = " ".join([selector.xpath("text()").extract_first() for selector in response.xpath("//p")
                         if selector.xpath("text()").extract_first() is not None]).replace('\n', ' ').replace('\r', '')
        row = self.data.loc[self.data['url'] == response.url]
        print(row['id'].item())
        self.writer.writerow([row['id'].item(), row['query'].item(), response.url, response.css('h1::text').extract_first().replace('\n', ' ').replace('\r', ''), text])

