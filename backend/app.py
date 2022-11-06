from flask import Flask, jsonify
from jsonData import *

app = Flask(__name__)

@app.route('/')
def getAllProducts():  # put application's code here
    response = jsonify({"products": [x for x in data['products']]})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/search')
def search():  # put application's code here
    response = jsonify({"products": [x for x in data['products']]})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/lookup/<id>')
def lookup(id):  # put application's code here
    if int(id) < len(data['products']):
        response = jsonify(data['products'][id])
    else:
        response = jsonify({"error": "Invalid ID"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/recommendations')
def recommendations():  # put application's code here
    response = jsonify({"products": [x for x in data['products']]})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1234)
