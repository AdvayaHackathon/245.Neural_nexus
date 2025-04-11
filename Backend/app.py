from flask import Flask, request, jsonify
from flask_cors import CORS
from inference import initialize, process_query

app = Flask(__name__)
CORS(app)

qa_chain = initialize()

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "ArogyaMind Mental Health Chatbot API. Use POST /predict to interact."})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        query = data.get('query')
        
        if not query:
            return jsonify({"error": "No query provided"}), 400
            
        result = process_query(query, qa_chain)
        
        return jsonify({
            "response": result["response"],
            "warning": result["warning"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)