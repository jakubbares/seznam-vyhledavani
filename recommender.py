# q_movies['score'] = q_movies.apply(weighted_rating, axis=1)
# q_movies = q_movies.sort_values('score', ascending=False)
#
# #Print the top 15 movies
# q_movies[['title', 'vote_count', 'vote_average', 'score']].head(15)
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

tfidf = TfidfVectorizer(stop_words='czech')

data = pd.read_csv('articles.csv',  sep='|')
data.columns = ['url', 'headline', 'paragraphs']
data['paragraphs'] = data['paragraphs'].fillna('')

tfidf_matrix = tfidf.fit_transform(data['paragraphs'])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

#Construct a reverse map of indices and movie titles
indices = pd.Series(data.index, index=data['url']).drop_duplicates()


def get_recommendations(title, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    idx = indices[title]

    indexes = [1, 3, 5, 7, 8]
    # Get the pairwise similarity scores of all movies with that movie
    sim_scores = pd.DataFrame(cosine_sim[indexes[0]])
    for index in indexes[1:]:
        sim_scores.append(cosine_sim[index])

    average_scores = sim_scores.mean(axis=0)

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return data['title'].iloc[movie_indices]





