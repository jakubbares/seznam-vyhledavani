from flask import Blueprint, request, jsonify, make_response
from flask_restful import Api, Resource
import json

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from ufal.morphodita import *
from string import punctuation
import re

data = pd.read_csv('views/full_articles_cleaned.csv',  sep='|')
data.columns = ['category','query','id','url', 'title', 'description', 'rssPublicationDate','headline', 'paragraphs']
data['paragraphs'] = data['paragraphs'].fillna('')
data =  data[data['paragraphs'] != '\xa0']
lemma_column = data.shape[0]*[[]]
data['lemmas'] = lemma_column
tfidf = TfidfVectorizer(ngram_range=(1,1))
tagger = Tagger.load('./../morphodita/czech-morfflex-pdt-161115.tagger')
forms = Forms()

for index, row in data.iterrows():
    paragraph = row['paragraphs']
    lemmas = TaggedLemmas()
    tokens = TokenRanges()
    tokenizer = tagger.newTokenizer()
    tokenizer.setText(paragraph)
    allLemmas = []
    while tokenizer.nextSentence(forms, tokens):
        newLemmas = []
        tagger.tag(forms, lemmas)
        newLemmas = [l.lemma for l in lemmas]
        allLemmas.extend(newLemmas)
    row['lemmas'] = ' '.join(l for l in allLemmas if l not in punctuation and not re.match("[0-9]+", l))

data = data[data['lemmas'] != '']

tfidf_matrix = tfidf.fit_transform(data['lemmas'])

indices = pd.Series(data.index, index=data['url'])



class Query(Resource):
    @staticmethod
    def getResultsForQueryAndHistory():
        raw_dict = request.get_json(force=True)
        try:
            query = raw_dict['query']
            history = raw_dict['history']

            query_data = data.loc[data['query'] == query]
            query_tfidf_matrix = tfidf.fit_transform(query_data['lemmas'])

            cosine_sim = linear_kernel(tfidf_matrix, query_tfidf_matrix)

            history_indexes = data.index[data['id'] in history]

            dfs = [pd.DataFrame(cosine_sim[index]) for index in history_indexes]
            sim_scores = pd.concat(dfs, axis=1)
            average_scores = sim_scores.mean(axis=1)
            average_scores.columns = ['index', 'score']
            average_scores = average_scores.sort_values(ascending=False)
            article_indices = average_scores.nlargest(10).keys()
            return data.iloc[article_indices]
        except:
            return "Invalid"
