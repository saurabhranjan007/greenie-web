from flask import Flask, jsonify
from flask_cors import CORS
from os import environ

app = Flask(__name__)
app.debug=True

# root module 
from app import greenie 

# CORS configuration 
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/", methods=['GET'])
def home():
    return jsonify(message="starting server.."), 200 