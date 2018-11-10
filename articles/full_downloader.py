import scrapy
import json
import csv
import pandas as pd


class DownSpider(scrapy.Spider):
    data = pd.read_csv('agregated.csv',  sep='|')
    data.columns = ['category', 'query', 'id', 'url', 'title', 'description', 'rssPublicationDate']
    name = 'full_downloader_spider'
    start_urls = data['url']
    file = open('full_articles.csv', 'w', encoding="utf-8")
    writer = csv.writer(file, delimiter='|',
                        quotechar=' ', quoting=csv.QUOTE_MINIMAL)

    def parse(self, response):
        text = " ".join([selector.xpath("text()").extract_first() for selector in response.xpath("//p")
                         if selector.xpath("text()").extract_first() is not None]).replace('\n', ' ').replace('\r', '')
        row = self.data.loc[self.data['url'] == response.url]
        print(row['id'].item())
        self.writer.writerow([row['category'].item(), row['query'].item(), row['id'].item(), response.url, row['title'].item(), row['description'].item(), row['rssPublicationDate'].item(), response.css('h1::text').extract_first().replace('\n', ' ').replace('\r', ''), text])
