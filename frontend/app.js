const gameBoard = document.getElementById('game-board');
const newGameButton = document.getElementById('new-game-button'); 

let cards = [];
let revealedCards = [];
let matchedCards = [];
let message = document.getElementById('message');

// Obsługa przycisku Nowa Gra
newGameButton.addEventListener('click', startNewGame);

// Funkcja rozpoczynająca nową grę
function startNewGame() {
    fetch('http://localhost:5000/api/game/start')
        .then(response => response.json())
        .then(data => {
            cards = data.cards;
            revealedCards = [];
            matchedCards = [];
            message.innerText = '';
            renderBoard();
        });
}

// Start gry przy pierwszym uruchomieniu
startNewGame();

// Funkcja renderująca planszę gry
function renderBoard() {
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        // Odkryj kartę, jeśli jest wśród dopasowanych lub chwilowo odkrytych
        if (revealedCards.includes(index) || matchedCards.includes(index)) {
            cardElement.innerText = card;
            cardElement.classList.add('revealed');
        } else {
            cardElement.innerText = '';
        }

        // Wyłącz kliknięcie dla dopasowanych kart
        if (!matchedCards.includes(index)) {
            cardElement.addEventListener('click', () => revealCard(index));
        }

        gameBoard.appendChild(cardElement);
    });
}

// Funkcja obsługująca odkrywanie karty
function revealCard(index) {
    // Ignoruj kliknięcia, jeśli są już odkryte dwie karty lub karta została już odkryta
    if (revealedCards.length === 2 || revealedCards.includes(index)) return;

    revealedCards.push(index);
    renderBoard();

    // Jeśli dwie karty zostały odkryte, sprawdź, czy są dopasowane
    if (revealedCards.length === 2) {
        const [first, second] = revealedCards;
        fetch('http://localhost:5000/api/game/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index1: first, index2: second })
        })
        .then(response => response.json())
        .then(data => {
            if (data.match) {
                message.innerText = 'Match found!';
                matchedCards.push(first, second); // Dodajemy dopasowane karty do listy
            } else {
                message.innerText = 'Try again!';
            }
            revealedCards = []; // Zresetuj odkryte karty
            setTimeout(() => {
                message.innerText = '';
                renderBoard();
            }, 1000);
        });
    }
}
