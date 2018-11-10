from flask import Blueprint, request, jsonify, make_response
from flask_restful import Api, Resource
import json
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


data = pd.read_csv('views/final_data.csv',  sep='|', header=0)

tfidf = TfidfVectorizer(ngram_range=(1,1))
tfidf_matrix = tfidf.fit_transform(data['lemmas'])

indices = pd.Series(data.index, index=data['url'])



class Query(Resource):
    @staticmethod
    def getArticles():
        raw_dict = request.get_json(force=True)
        history = raw_dict['history']
        print(history)
        results = data[data['id'].isin(history)]
        return results[['id', 'url', 'description', 'title']].reset_index().to_json(orient='records')


    @staticmethod
    def getQuerySuggestions():
        results = data[['query']].drop_duplicates()
        return results.reset_index().to_json(orient='records')


    @staticmethod
    def getResultsForQueryAndHistory():
        raw_dict = request.get_json(force=True)

        query = raw_dict['query']
        history = raw_dict['history']

        query_data = data.loc[data['query'] == query]
        query_tfidf_matrix = tfidf.fit_transform(query_data['lemmas'])
        additional_rows = pd.DataFrame(0, index=np.arange(data.shape[0]-query_data.shape[0]), columns=[i for i in range(tfidf_matrix.todense().shape[1])])

        query_tfidf_matrix = pd.concat([pd.DataFrame(query_tfidf_matrix.todense()), additional_rows]).fillna(0)
        cosine_sim = linear_kernel(tfidf_matrix, query_tfidf_matrix)

        history_indexes = data.index[data['id'].isin(history)]

        dfs = [pd.DataFrame(cosine_sim[index]) for index in history_indexes]
        sim_scores = pd.concat(dfs, axis=1)
        average_scores = sim_scores.mean(axis=1)
        average_scores.columns = ['index', 'score']
        average_scores = average_scores.sort_values(ascending=False)
        article_indices = average_scores.nlargest(10).keys()
        results = data.iloc[article_indices]
        return results[['id', 'url', 'description', 'title']].reset_index().to_json(orient='records')
