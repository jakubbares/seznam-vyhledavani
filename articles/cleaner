import csv


def clean_unique_urls():
    with open("urls_unique.csv", "r", encoding="utf-8") as uf:
        with open("urls_cleaned.csv", "w", encoding="utf-8") as df:
            for i, line in enumerate(uf):
                parts = line.split('|http')
                if '|' in parts[0]:
                    print(parts[0])
                parts[0] = parts[0].replace("|", "")
                parts[1] = '|http' + parts[1]
                df.write(''.join(parts))


def clean_articles():
    with open("articles.csv", "r", encoding="utf-8") as uf:
        with open("articles_cleaned.csv", "w", encoding="utf-8") as df:
            for i, line in enumerate(uf):
                parts = line.split('|')
                result = parts[0:5]
                df.write('|'.join(result))
                if len(parts) > 5:
                    print(parts[5:])


clean_articles()