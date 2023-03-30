import json

from flask import jsonify, request
from flask_restful import reqparse
from flask_restx import Resource
from src.Model import XorModel, SwitchModel


class Train(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('model_type', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('hidden_size', type=int, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('activation', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('loss_func', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('opt', type=str, required=True,
                        help='This field cannot be left blank')
    parser.add_argument('epochs', type=int, required=True,
                        help='This field cannot be left blank')

    # train model
    def post(self):
        body = Train.parser.parse_args()
        # print(body)
        model_type = body['model_type']
        hidden_size = body['hidden_size']
        activation = body['activation']
        loss_func = body['loss_func']
        opt = body['opt']
        epochs = body['epochs']

        if model_type == "xor":
            model = XorModel()
        else:
            model = SwitchModel()

        loss, acc = model.train_model(epochs, hidden_size=hidden_size, activation=activation, loss_func=loss_func,
                                      opt=opt)

        return jsonify({
            "status": 200,
            "message": "your model finished training",
            "data": {"acc": acc, "loss": loss}
        })


class Predict(Resource):
    parser = reqparse.RequestParser()

    parser.add_argument('model_type', type=str, required=True,
                        help='This field cannot be left blank')

    def post(self):
        body = Predict.parser.parse_args()
        model_type = body['model_type']
        X_preds = request.json['x_preds']
        print(X_preds)
        if model_type == "xor":
            model = XorModel()
        else:
            model = SwitchModel()

        preds = model.predict(X_preds)
        return jsonify({
            "status": 200,
            "data": preds.tolist()
        })
