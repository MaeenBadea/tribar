from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from src.ModelResources import Train, Predict

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Train, '/train')
api.add_resource(Predict, '/predict')
