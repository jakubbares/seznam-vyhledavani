import csv


def clean_unique_urls():
    with open("full_urls_unique.csv", "r", encoding="utf-8") as uf:
        with open("full_urls_cleaned.csv", "w", encoding="utf-8") as df:
            for i, line in enumerate(uf):
                parts = line.split('|http')
                if '|' in parts[0]:
                    print(parts[0])
                parts[0] = parts[0].replace("|", "")
                parts[1] = '|http' + parts[1]
                df.write(''.join(parts))


def clean_articles():
    with open("full_articles.csv", "r", encoding="utf-8") as uf:
        with open("full_articles_cleaned.csv", "w", encoding="utf-8") as df:
            for i, line in enumerate(uf):
                parts = line.split('|')
                result = parts[0:7]
                df.write('|'.join(result))
                if len(parts) > 7:
                    print(parts[7:])


def clean_text():
    with open("full_articles.csv", "r", encoding="utf-8") as uf:
        with open("full_articles_cleaned.csv", "w", encoding="utf-8") as df:
            for i, line in enumerate(uf):
                parts = line.split('|')
                if len(parts) > 8:
                    outStr = '|'.join(parts[0:7]) + '|' + ' '.join(parts[8:len(parts)])
                    
                    df.write(outStr)
                    print('stripped+saved')
                else:
                    df.write(line)


#clean_articles()
clean_text()
