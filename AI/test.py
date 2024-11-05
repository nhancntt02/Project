import joblib
import string
import os
import pandas as pd
# Hàm tiền xử lý văn bản
def preprocess_text(text):
    text = text.lower()  # chuyển về chữ thường
    text = ''.join([char for char in text if char not in string.punctuation])  # loại dấu câu
    return text

# Tải mô hình và vectorizer
model = joblib.load('profanity_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

# Dự đoán cho một văn bản mới


def predict_profanity(text):
    
    new_text_preprocessed = preprocess_text(text)
    new_text_vec = vectorizer.transform([new_text_preprocessed])
    prediction = model.predict(new_text_vec)

    result = prediction[0]  # 0 or 1

    # Append the text and its prediction to the profanity_data.csv file
    new_data = pd.DataFrame({'text': [text], 'label': [result]})

    # Check if the file exists before writing to it
    file_exists = os.path.exists('profanity_data.csv')
    
    # Append to CSV file
    new_data.to_csv('profanity_data.csv', mode='a', header=not file_exists, index=False)

    return result

# In kết quả dự đoán
new_text = input("Nhap tu ngu muon kiem tra: ")
print("Dự đoán:", predict_profanity(new_text))
