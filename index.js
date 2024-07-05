const cardValues = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 0, 'J': 0, 'Q': 0, 'K': 0, 'A': 1
};

const cardImages = {
  '2': 'card_img/Club2.png', '3': 'card_img/Club3.png', '4': 'card_img/Club4.png', '5': 'card_img/Club5.png',
  '6': 'card_img/Club6.png', '7': 'card_img/Club7.png', '8': 'card_img/Club8.png', '9': 'card_img/Club9.png',
  '10': 'card_img/Club10.png', 'J': 'card_img/Club11.png', 'Q': 'card_img/Club12.png', 'K': 'card_img/Club13.png',
  'A': 'card_img/Club1.png'
};

let selectedBet = null;

const playerTotalElement = document.getElementById('playertotalcard');
const bankerTotalElement = document.getElementById('bankertotalcard');
const resultElement = document.getElementById('cardResult');

const playerCard1Element = document.getElementById('card1p');
const playerCard2Element = document.getElementById('card2p');
const playerCard3Element = document.getElementById('card3p');
const bankerCard1Element = document.getElementById('card1b');
const bankerCard2Element = document.getElementById('card2b');
const bankerCard3Element = document.getElementById('card3b');

function getRandomCard() {
  const cards = Object.keys(cardValues);
  return cards[Math.floor(Math.random() * cards.length)];
}

function calculateTotal(cards) {
  return cards.reduce((total, card) => total + cardValues[card], 0) % 10;
}

function displayCardImage(imgElement, card) {
  imgElement.src = card ? cardImages[card] : '';
  imgElement.style.visibility = card ? 'visible' : 'hidden';
}

function dealCards() {
  const playerCards = [getRandomCard(), getRandomCard()];
  const bankerCards = [getRandomCard(), getRandomCard()];

  displayCardImage(playerCard1Element, playerCards[0]);
  displayCardImage(playerCard2Element, playerCards[1]);
  displayCardImage(playerCard3Element, '');

  displayCardImage(bankerCard1Element, bankerCards[0]);
  displayCardImage(bankerCard2Element, bankerCards[1]);
  displayCardImage(bankerCard3Element, '');

  updateTotalsAndThirdCard(playerCards, bankerCards);
}

function updateTotalsAndThirdCard(playerCards, bankerCards) {
  let playerTotal = calculateTotal(playerCards);
  let bankerTotal = calculateTotal(bankerCards);

  playerTotalElement.textContent = `Player Total: ${playerTotal}`;
  bankerTotalElement.textContent = `Banker Total: ${bankerTotal}`;

  if (playerTotal <= 5) {
    const thirdCard = getRandomCard();
    playerCards.push(thirdCard);
    displayCardImage(playerCard3Element, thirdCard);
    playerTotal = calculateTotal(playerCards);
    playerTotalElement.textContent = `Player Total: ${playerTotal}`;
  }

  if (bankerTotal <= 5) {
    const thirdCard = getRandomCard();
    bankerCards.push(thirdCard);
    displayCardImage(bankerCard3Element, thirdCard);
    bankerTotal = calculateTotal(bankerCards);
    bankerTotalElement.textContent = `Banker Total: ${bankerTotal}`;
  }

  displayResult(playerTotal, bankerTotal);
}

function displayResult(playerTotal, bankerTotal) {
  let resultText = '';
  if (playerTotal > bankerTotal) {
    resultText = 'PLAYER wins!';
  } else if (playerTotal < bankerTotal) {
    resultText = 'BANKER wins!';
  } else {
    resultText = 'It\'s a TIE!';
  }

  let outcome = 'LOSS';
  if ((resultText.includes('PLAYER') && selectedBet === 'player') ||
      (resultText.includes('BANKER') && selectedBet === 'banker') ||
      (resultText.includes('TIE') && selectedBet === 'tie')) {
    outcome = 'WIN';
  }

  resultElement.textContent = `RESULT: ${resultText} - You ${outcome}!`;
}

function selectBet(bet) {
  selectedBet = bet;
  console.log(`Bet selected: ${bet}`);
}

function play() {
  if (!selectedBet) {
    alert('Please select a bet first!');
    return;
  }
  dealCards();
}
