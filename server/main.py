#!/usr/bin/env python
from app import create_app

from views.queries import Query

app = create_app('config')
from flask_cors import CORS
CORS(app)


# Events
@app.route('/query', methods=['POST'])
def getEventsForTeam():
    return Query.getResultsForQueryAndHistory()


if __name__ == '__main__':
    app.run(host=app.config['HOST'],
            port=app.config['PORT'],
            debug=app.config['DEBUG'])
