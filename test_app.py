from flask import Flask

app = Flask(__name__)

@app.before_first_request
def startup():
    print("Runs before the first request")

@app.route('/')
def home():
    return "Hello from minimal app"

if __name__ == "__main__":
    app.run(debug=True, port=5000)
