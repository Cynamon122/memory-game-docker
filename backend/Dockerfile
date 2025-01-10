FROM python:3.9-slim

# Instalacja zależności systemowych
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików projektu
COPY requirements.txt requirements.txt
COPY app.py app.py

# Instalacja zależności Python
RUN pip install --no-cache-dir -r requirements.txt

# Uruchomienie aplikacji
CMD ["python", "app.py"]
