import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from flask import json
from flask_cors import CORS, cross_origin 
app = Flask(__name__)

 
CORS(app)

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/',  methods=['GET'])
def home():
 
 




 
    args = request.args
    day = int(float(args.get("day")))
    morning = int(float(args.get("morning")))
    miday = int(float(args.get("miday")))

 

    int_features = [day, morning, miday]
    print(int_features)
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0], 2)
    response = jsonify({'data': output})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
 
 
    return response


 

if __name__ == "__main__":
    app.run(debug=True)
