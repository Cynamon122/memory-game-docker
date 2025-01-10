from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import psycopg2

app = Flask(__name__)
CORS(app)

# Karty do gry
CARDS = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍍", "🍉"]
CARDS += CARDS  # Każda karta ma swoją parę

# Funkcja nawiązywania połączenia z bazą danych
def get_db_connection():
    conn = psycopg2.connect(
        host="db",  # Nazwa usługi w docker-compose
        database="memory_game",
        user="memory_user",
        password="memory_pass"
    )
    return conn

# Tworzenie tabeli w bazie danych przy starcie aplikacji
@app.before_first_request
def setup_database():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS game_state (
            id SERIAL PRIMARY KEY,
            card TEXT NOT NULL,
            revealed BOOLEAN NOT NULL
        )
    ''')
    conn.commit()
    cursor.close()
    conn.close()

# Funkcja startowa gry
@app.route('/api/game/start', methods=['GET'])
def start_game():
    random.shuffle(CARDS)
    conn = get_db_connection()
    cursor = conn.cursor()

    # Wyczyść stare dane i dodaj nowe karty
    cursor.execute('DELETE FROM game_state')
    for idx, card in enumerate(CARDS):
        cursor.execute(
            'INSERT INTO game_state (id, card, revealed) VALUES (%s, %s, %s)',
            (idx, card, False)
        )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"cards": CARDS})

# Funkcja sprawdzająca dopasowanie par kart
@app.route('/api/game/check', methods=['POST'])
def check_match():
    data = request.json
    idx1, idx2 = data.get('index1'), data.get('index2')

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT card FROM game_state WHERE id = %s', (idx1,))
    card1 = cursor.fetchone()[0]
    cursor.execute('SELECT card FROM game_state WHERE id = %s', (idx2,))
    card2 = cursor.fetchone()[0]

    if card1 == card2:
        cursor.execute(
            'UPDATE game_state SET revealed = TRUE WHERE id IN (%s, %s)',
            (idx1, idx2)
        )
        conn.commit()
        result = {"match": True}
    else:
        result = {"match": False}

    cursor.close()
    conn.close()
    return jsonify(result)

# Uruchomienie aplikacji
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)