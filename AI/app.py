from flask import Flask, request, jsonify
import joblib
import string
import nltk
import os
import pandas as pd
from nltk.corpus import stopwords
import requests
from flask_cors import CORS

# Load the model and vectorizer
model = joblib.load('profanity_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Load stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Text preprocessing function
def preprocess_text(text):
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text



app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    text = data.get('text')
    id = data.get('rate_id')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Process and predict
    processed_text = preprocess_text(text)
    text_vec = vectorizer.transform([processed_text])
    prediction = model.predict(text_vec)

    # Return result

    result = prediction[0]  # 0 or 1

    laravel_url = 'http://localhost:8000/api/filter_comment'  # Địa chỉ API của Laravel
    payload = {
        'rate_id': id,
        'status': result
    }
    #print(payload)
    requests.post(laravel_url, json=payload)

    
    # Append the text and its prediction to the profanity_data.csv file
    new_data = pd.DataFrame({'text': [text], 'label': [result]})

    # Check if the file exists before writing to it
    file_exists = os.path.exists('profanity_data.csv')
    
    # Append to CSV file
    new_data.to_csv('profanity_data.csv', mode='a', header=not file_exists, index=False)

    return payload

if __name__ == '__main__':
    app.run(debug=True, port=5000)
