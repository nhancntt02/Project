import pandas as pd
import string
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from nltk.corpus import stopwords
import nltk
import joblib

# Tải danh sách stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

# Bước 1: Load dữ liệu
data = pd.read_csv("profanity_data.csv")  # Tên file dữ liệu của bạn
data = data.dropna()

# Bước 2: Làm sạch dữ liệu
def preprocess_text(text):
    text = text.lower()  # chuyển về chữ thường
    text = ''.join([char for char in text if char not in string.punctuation])  # loại dấu câu
    text = ' '.join([word for word in text.split() if word not in stop_words])  # loại stop words
    return text

data['text'] = data['text'].apply(preprocess_text)

X = data['text']
y = data['label']



# Bước 3: Chia dữ liệu thành tập huấn luyện và tập kiểm tra
best_accuracy = 0  # Khởi tạo độ chính xác tốt nhất
best_model = None
best_vectorizer = None

for i in range(10):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=i)

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



