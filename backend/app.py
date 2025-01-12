from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import psycopg2 # Biblioteka do połączenia z bazą PostgreSQL

app = Flask(__name__)
CORS(app) # Włączenie CORS, aby frontend mógł komunikować się z backendem

CARDS = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍍", "🍉"]
CARDS += CARDS

# Funkcja do nawiązywania połączenia z bazą danych PostgreSQL
def get_db_connection():
    conn = psycopg2.connect(
        host="db",  # Host, wskazuje na nazwę usługi w docker-compose.yml
        database="memory_game",  # Nazwa bazy danych
        user="memory_user",  # Użytkownik bazy danych
        password="memory_pass"  # Hasło użytkownika bazy danych
    )
    return conn

# Funkcja do inicjalizacji tabeli w bazie danych
def setup_database():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Tworzenie tabeli, jeśli jeszcze nie istnieje
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

# Endpoint API do rozpoczęcia gry
@app.route('/api/game/start', methods=['GET'])
def start_game():
    random.shuffle(CARDS)
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM game_state')
    for idx, card in enumerate(CARDS):
        cursor.execute('INSERT INTO game_state (id, card, revealed) VALUES (%s, %s, %s)', (idx, card, False))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"cards": CARDS})

# Endpoint API do sprawdzania dopasowania kart
@app.route('/api/game/check', methods=['POST'])
def check_match():
    data = request.json
    idx1, idx2 = data.get('index1'), data.get('index2')
    conn = get_db_connection()
    cursor = conn.cursor()
    # Pobranie symboli kart z bazy danych na podstawie indeksów
    cursor.execute('SELECT card FROM game_state WHERE id = %s', (idx1,))
    card1 = cursor.fetchone()[0]
    cursor.execute('SELECT card FROM game_state WHERE id = %s', (idx2,))
    card2 = cursor.fetchone()[0]

    # Sprawdzenie, czy karty są dopasowane
    if card1 == card2:
        # Jeśli tak, ustawiamy je jako odkryte
        cursor.execute('UPDATE game_state SET revealed = TRUE WHERE id IN (%s, %s)', (idx1, idx2))
        conn.commit()
        result = {"match": True}
    else:
        result = {"match": False}

    cursor.close()
    conn.close()
    return jsonify(result) # Zwrócenie wyniku do frontendu

if __name__ == '__main__':
    setup_database()  # Wywołanie funkcji przed uruchomieniem aplikacji
    app.run(host='0.0.0.0', port=5000)
