import scrapy
import json
import csv


class NewsSpider(scrapy.Spider):
    name = 'news_spider'
    start_urls = ['https://www.ihned.cz']
    allowed_domains = ['ihned.cz', 'idnes.cz', 'blesk.cz']
    file = open('articles.csv', 'w', encoding="utf-8")
    writer = csv.writer(file, delimiter='|',
                    quotechar=' ', quoting=csv.QUOTE_MINIMAL)

    def parse(self, response):
        text = " ".join([selector.xpath("text()").extract_first() for selector in response.xpath("//p") if selector.xpath("text()").extract_first() is not None])
        self.writer.writerow([response.url, response.css('h1.article-title::text').extract_first(), text])
        links_recommended = response.css("div.recommended a::attr(href)")
        links_next_articles = response.css("div.left-column a::attr(href)")
        links = links_recommended
        links.extend(links_next_articles)
        for link in links:
            request = response.follow(link, callback=self.parse)
            yield request
