from flask import Flask, request, jsonify
import joblib
import string
import nltk
import os
import pandas as pd
from nltk.corpus import stopwords
import requests
from flask_cors import CORS

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report



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


@app.route('/training', methods=['GET'])
def train_ai(): 
    data = pd.read_csv("profanity_data.csv")  # Tên file dữ liệu của bạn
    data = data.dropna()

    data['text'] = data['text'].apply(preprocess_text)
    X = data['text']
    y = data['label']

    # Bước 3: Chia dữ liệu thành tập huấn luyện và tập kiểm tra
    best_accuracy = 0  # Khởi tạo độ chính xác tốt nhất
    best_model = None
    best_vectorizer = None

    for i in range(10):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2) #, random_state=i

        # Chuyển đổi văn bản thành vector
        vectorizer = CountVectorizer()
        X_train_vec = vectorizer.fit_transform(X_train)
        X_test_vec = vectorizer.transform(X_test)

        # Huấn luyện mô hình
        model = MultinomialNB()
        model.fit(X_train_vec, y_train)

        # Dự đoán và đánh giá mô hình
        y_pred = model.predict(X_test_vec)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Run {i + 1}: Accuracy = {accuracy}")

        # Kiểm tra và lưu mô hình tốt nhất
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = model
            best_vectorizer = vectorizer
            print(f"New best model found with accuracy: {i}")

    # Lưu mô hình và vectorizer tốt nhất
    if best_model is not None:
        joblib.dump(best_model, 'profanity_model.pkl')
        joblib.dump(best_vectorizer, 'vectorizer.pkl')
        print("Best model and vectorizer saved.")
    else:
        print("No model was trained.")
    return jsonify({"message": "Training completed successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
