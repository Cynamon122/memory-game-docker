from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Dodanie obsługi CORS

# Karty do gry
CARDS = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍍", "🍉"]
CARDS += CARDS  # Każda karta ma swoją parę

@app.route('/api/game/start', methods=['GET'])
def start_game():
    random.shuffle(CARDS)
    return jsonify({"cards": CARDS})

@app.route('/api/game/check', methods=['POST'])
def check_match():
    data = request.json
    idx1, idx2 = data.get('index1'), data.get('index2')
    if CARDS[idx1] == CARDS[idx2]:
        return jsonify({"match": True})
    return jsonify({"match": False})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
