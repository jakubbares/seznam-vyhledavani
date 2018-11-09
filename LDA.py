import pandas as pd
from ufal.morphodita import *
# import gensim


data = pd.read_csv('articles.csv',  sep='|')
data.columns = ['url', 'headline', 'paragraphs']
paragraphs = data[['paragraphs']]




def lemmatize():
    tagger = Tagger.load('morphodita/czech-morfflex-pdt-161115.tagger')
    forms = Forms()

    for index, paragraph in paragraphs.iterrows():
        paragraph = ''.join(paragraph)
        print(paragraph)
        lemmas = TaggedLemmas()
        tokens = TokenRanges()
        tokenizer = tagger.newTokenizer()
        tokenizer.setText(paragraph)
        while tokenizer.nextSentence(forms, tokens):
            print([l.lemma for l in lemmas])
            tagger.tag(forms, lemmas)


lemmatize()


# def other():
#     def lemmatize_stemming(text):
#         stemmer = SnowballStemmer('czech')
#         return stemmer.stem(WordNetLemmatizer().lemmatize(text, pos='v'))
#     def preprocess(text):
#         result = []
#         for token in gensim.utils.simple_preprocess(text):
#             if len(token) > 3:
#                 result.append(lemmatize_stemming(token))
#         return result
#
#     processed_docs = documents['headline_text'].map(preprocess)
#     processed_docs[:10]
#
#     dictionary = gensim.corpora.Dictionary(processed_docs)
#
#     dictionary.filter_extremes(no_below=15, no_above=0.5, keep_n=100000)
#
#     bow_corpus = [dictionary.doc2bow(doc) for doc in processed_docs]
#     bow_corpus[4310]
#
#     from gensim import corpora, models
#     tfidf = models.TfidfModel(bow_corpus)
#     corpus_tfidf = tfidf[bow_corpus]
#
#     lda_model = gensim.models.LdaMulticore(bow_corpus, num_topics=10, id2word=dictionary, passes=2, workers=2)
#
#     lda_model_tfidf = gensim.models.LdaMulticore(corpus_tfidf, num_topics=10, id2word=dictionary, passes=2, workers=4)
#     for idx, topic in lda_model_tfidf.print_topics(-1):
#         print('Topic: {} Word: {}'.format(idx, topic))