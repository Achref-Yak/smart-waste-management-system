import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle
from flask import json

dataset = pd.read_csv('tunis.csv')

 
X = dataset.iloc[:, :3]
 
 
y = dataset.iloc[:, -1]

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()

regressor.fit(X, y)

pickle.dump(regressor, open('model.pkl','wb'))

model = pickle.load(open('model.pkl','rb'))
print(model.predict([[4, 40, 50]]))
