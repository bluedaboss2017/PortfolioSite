let masterDeck = ["AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "1S", "JS", "QS", "KS", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "1H", "JH", "QH", "KH", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "1C", "JC", "QC", "KC", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "1D", "JD", "QD", "KD"];
let deckScore = {"AS":["Ace of Spades", 11], "2S":["Two of Spades", 2], "3S":["Three of Spades", 3], "4S":["Four of Spades", 4], "5S":["Five of Spades", 5], "6S":["Six of Spades", 6], "7S":["Seven of Spades", 7], "8S":["Eight of Spades", 8], "9S":["Nine of Spades", 9], "1S":["Ten of Spades", 10], "JS":["Jack of Spades", 10], "QS":["Queen of Spades", 10], "KS":["King of Spades", 10], 
                "AH":["Ace of Hearts", 11], "2H":["Two of Hearts", 2], "3H":["Three of Hearts", 3], "4H":["Four of Hearts", 4], "5H":["Five of Hearts", 5], "6H":["Six of Hearts", 6], "7H":["Seven of Hearts", 7], "8H":["Eight of Hearts", 8], "9H":["Nine of Hearts", 9], "1H":["Ten of Hearts", 10], "JH":["Jack of Hearts", 10], "QH":["Queen of Hearts", 10], "KH":["King of Hearts", 10],
                "AC":["Ace of Clubs", 11], "2C":["Two of Clubs", 2], "3C":["Three of Clubs", 3], "4C":["Four of Clubs", 4], "5C":["Five of Clubs", 5], "6C":["Six of Clubs", 6], "7C":["Seven of Clubs", 7], "8C":["Eight of Clubs", 8], "9C":["Nine of Clubs", 9], "1C":["Ten of Clubs", 10], "JC":["Jack of Clubs", 10], "QC":["Queen of Clubs", 10], "KC":["King of Clubs", 10], 
                "AD":["Ace of Diamonds", 11], "2D":["Two of Diamonds", 2], "3D":["Three of Diamonds", 3], "4D":["Four of Diamonds", 4], "5D":["Five of Diamonds", 5], "6D":["Six of Diamonds", 6], "7D":["Seven of Diamonds", 7], "8D":["Eight of Diamonds", 8], "9D":["Nine of Diamonds", 9], "1D":["Ten of Spades", 10], "JD":["Jack of Diamonds", 10], "QD":["Queen of Diamonds", 10], "KD":["King of Diamonds", 10]};
var deck = [];
var standButton = document.querySelector('.stand');
var hitButton = document.querySelector('.hit');
var dealerDiv = document.querySelector('.dealer');
var playerDiv = document.querySelector('.player');
var playerScore = 0, hiddenCard = 0, dealerScore = 0, playerAceCount = 0, dealerAceCount = 0;

init = () => {
    game = document.querySelector('.game');
    game.innerHTML += '<button style="font-size:120%" id="playButton">Start</button>';
    playButton = document.querySelector('#playButton');
    game.querySelector('.hit').addEventListener('click', function() {
        randomCard(playerDiv);
        calculateScore();
    })
    game.querySelector('.stand').addEventListener('click', function() {
        dealerTurn();
        document.querySelector('.hit').disabled = true;
        document.querySelector('.stand').disabled = true;
    })
    playButton.addEventListener('click', function() {
        deckDrop = document.querySelector('#decks');
        numDecks = deckDrop.value;
        if (!deckDrop.classList.contains('triggered')) {
            for (i = 0; i < numDecks; i++) {
                deck.push(...masterDeck);
            }
        }
        deckDrop.classList.add('triggered');
        document.querySelector('.hit').disabled = false;
        document.querySelector('.stand').disabled = false;
        document.querySelector('#decks').style.display = 'none';
        playButton.style.display = 'none';
        document.querySelector('.hit').style.display = 'block';
        document.querySelector('.stand').style.display = 'block';
        randomCard(dealerDiv);
        randomCard(playerDiv);
        randomCard(playerDiv);
        makeHiddenCard();
        calculateScore();
    })
}

randomCard = (target) => {
    if (deck.length == 0) {
        for (i = 0; i < numDecks; i++) {
            deck.push(...masterDeck);
        }
    }
    randomIndex = Math.floor(Math.random() * deck.length);
    cardToLoad = masterDeck.indexOf(`${deck[randomIndex]}`);
    target.innerHTML += `<img src="media/${masterDeck[cardToLoad]}.jpg" alt="${deckScore[masterDeck[cardToLoad]][0]}"></img>`;
    if (target.classList.contains("player")) {
        playerScore += deckScore[masterDeck[cardToLoad]][1];
        if (deckScore[masterDeck[cardToLoad]][0].includes("Ace")) {
            playerAceCount += 1;
        }
    } else {
        dealerScore += deckScore[masterDeck[cardToLoad]][1];
        if (deckScore[masterDeck[cardToLoad]][0].includes("Ace")) {
            dealerAceCount += 1;
        }
    }
    deck.splice(randomIndex, 1);
}

calculateScore = () => {
    if (playerAceCount > 0 && playerScore > 21) {
        playerScore -= 10;
        playerAceCount -= 1;
    }
    if (dealerAceCount > 0 && dealerScore > 21) {
        dealerScore -= 10;
        dealerAceCount -= 1;
    }
    scoreLabel = document.querySelector('.score');
    scoreLabel.innerText = `Your Score: ${playerScore}`;
    if (playerScore == 21) {
        setTimeout(() => {
            alert("Blackjack! You Win!");
            restart();
        }, 1000)
        document.querySelector('.hit').disabled = true;
        document.querySelector('.stand').disabled = true;
    } else if (playerScore > 21) {
        document.querySelector('.hit').disabled = true;
        document.querySelector('.stand').disabled = true;
        didWin();
    }
}

makeHiddenCard = () => {
    if (deck.length == 0) {
        for (i = 0; i < numDecks; i++) {
            deck.push(...masterDeck);
        }
    }
    randomIndex = Math.floor(Math.random() * deck.length);
    hiddenCard = masterDeck.indexOf(`${deck[randomIndex]}`);
    if (deckScore[masterDeck[hiddenCard]][0].includes('Ace')) {
        dealerAceCount += 1;
    }
    document.querySelector('.dealer').innerHTML += `<img src="media/BackCard.jpg" alt="Dealer's Hidden Card" class="hidden"></img>`
    dealerScore += deckScore[masterDeck[hiddenCard]][1];
    deck.splice(randomIndex, 1);
}

dealerTurn = () => {
    document.querySelector('.hidden').src = `media/${masterDeck[hiddenCard]}.jpg`
    dealerLabel = document.querySelector('.dealerScore');
    calculateScore();
    dealerLabel.innerText = `Dealer Score: ${dealerScore}`;
    if (dealerScore > 21) {
        setTimeout(() => {
            alert("You Win");
            restart();
        }, 1000)
    } else if (dealerScore > 16) {
        didWin();
    } else {
        setTimeout(() => {
            randomCard(dealerDiv);
            dealerTurn();
        }, 1000);
    }
}

restart = () => {
        dealerScore = 0;
        playerScore = 0;
        dealerAceCount = 0;
        playerAceCount = 0;
        game = document.querySelector('.game');
        imageToRemove = dealerDiv.querySelector('img');
        while (imageToRemove) {
            dealerDiv.removeChild(imageToRemove);
            imageToRemove = dealerDiv.querySelector('img');
        }
        imageToRemove = playerDiv.querySelector('img');
        while (imageToRemove) {
            playerDiv.removeChild(imageToRemove);
            imageToRemove = playerDiv.querySelector('img');
        }
        playButton = document.querySelector('#playButton');
        playButton.style.display = 'block';
        playButton.innerText = "Play Again";
        document.querySelector('.dealerScore').innerText = "";
        scoreLabel.innerText = "";
}

didWin = () => {
    setTimeout(() => {
        if (dealerScore == playerScore) {
            alert("Tie, nobody wins");
        } else if (dealerScore <= 21 && dealerScore > playerScore || playerScore > 21) {
            alert("Dealer Wins!");
        } else {
            alert("You Win!");
        }
        restart();
    }, 1000)
}

window.onload = init;
