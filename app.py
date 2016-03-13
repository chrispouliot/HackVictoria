# import the Flask class from the flask module
from flask import Flask, jsonify, render_template, request

import json
import oauth2 as oauth
import os
import urllib
# create the application object
app = Flask(__name__)

CONSUMER_KEY = os.environ.get("CONSUMER_KEY")
CONSUMER_SECRET = os.environ.get("CONSUMER_SECRET")
ACCESS_KEY = os.environ.get("ACCESS_KEY")
ACCESS_SECRET = os.environ.get("ACCESS_SECRET")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/search')
def search():
    consumer = oauth.Consumer(key=CONSUMER_KEY, secret=CONSUMER_SECRET)
    access_token = oauth.Token(key=ACCESS_KEY, secret=ACCESS_SECRET)
    client = oauth.Client(consumer, access_token)

    search_term = request.args.get("search")
    twitter = None
    google = None

    if search_term:
        print search_term
        print urllib.quote_plus(search_term)
        url = "https://api.twitter.com/1.1/search/tweets.json?q=" + urllib.quote_plus(search_term)
        response, data = client.request(url)
        json_data = json.loads(data)

        tweets = []
        for tweet in json_data['statuses']:
            created = tweet.get('created_at')
            splt = created.split(' ')
            created = '%s %s %s' % (splt[1], splt[2], splt[-1])
            fmt_tweet = {
                'text': tweet.get('text'),
                'created': created,
                'screen_name': tweet['user'].get('name')
            }
            tweets.append(fmt_tweet)
        print vars(response)
        print tweets

        twitter = tweets

    return jsonify(tweets=twitter, google=google)


if __name__ == '__main__':
    app.run(debug=True)
