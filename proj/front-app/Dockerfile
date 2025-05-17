FROM node:lts

# Tworzymy katalog roboczy
WORKDIR /home/node/app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności, w tym react-router-dom
RUN npm install

# Kopiujemy resztę plików źródłowych (np. src/, public/, vite.config.js itd.)
COPY . .

# Otwieramy port (niekonieczne, ale czytelne)
EXPOSE 5173

# Uruchamiamy dev server
CMD ["npm", "run", "dev", "--", "--host"]
