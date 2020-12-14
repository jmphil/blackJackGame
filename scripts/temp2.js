window.addEventListener('DOMContentLoaded', function() {
    // Execute after page load
  })

// create card

const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suit = ['H', 'D', 'S', 'C'];
let deck;

function createCard(value, suit) {
    let weight;

    if (/[0-9]/.test(value)) {
        weight = Number(value);
    } else if (value === 'A') {
        weight = 11;
    } else {
        weight = 10;
    }

    return {value, suit, weight};


}

// create deck

function createDeck() {
    deck = [];
    for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < suite.length; j++) {
            var card = {};
            card.rank = j
            card.suit = suits[i]
            card.img = `images/${j}_of_${suits[i]}.png`
            deck.push(card)
        }
    }
}
    



// shuffling the deck

function shuffleDeck() {
    for (i = 0; i < 1000; i++) {
        const card1 = Math.floor(Math.random() * 52);
        const card2 = Math.floor(Math.random() * 52);

        const tempCard = deck[card1];
        deck[card1] = deck[card2];
        deck[card2] = tempCard;
    }
}


// drawing card function
// records the weight of drawn card in addScore
// checks if card is an ace

let addScore;
let isAce;

function drawCard() {
    const newCard = deck.pop();
    const cardName = newCard.value + newCard.suite + `${imageDir}/${name}_of_${suit}.png`;
    addScore = newCard.weight;

    if (newCard.weight === 11){
        isAce = true;
    } else {
        isAce = false;
    }
    
    $('.remaining').text(deck.length);

    const newCardDiv = $('<div>');
    newCardDiv.addClass('card')
            .css('background-image', 'url(images/' + cardName + ')')

    return newCardDiv;
}


// dealing cards to player and dealer
// updating scores
// handles the special case of aces

let playerScore;
let dealerScore;

let playerAces;
let dealerAces;

function dealToPlayer() {
    $('.player2 .table').append(drawCard());

    if (isAce) playerAces++;

    playerScore += addScore;

    if (playerScore > 21 && playerAces) {
        playerScore -= 10;
        playerAces--;
    } 
        
    $('.player2 .points').text(playerScore);

    if (playerScore > 21) {
        playerStand();
    }
}

function dealToDealer() {
    $('.player1 .table').append(drawCard());

    if (isAce) dealerAces++;

    dealerScore += addScore;

    if (dealerScore > 21 && dealerAces) {
        dealerScore -= 10;
        dealerAces--;
    } 
        
    $('.player1 .points').text(dealerScore);
}


// dealing cards function to start the game
let dealButton = document.querySelector('#deal')
dealButton.addEventListener('click', (e) => {
        shuffleDeck();
        dealToPlayer();
        dealToDealer();
        dealToPlayer();
        dealToDealer();

})



// restart

$('#restart').on('click', startGame);

function startGame() {

        createDeck();
        shuffleDeck();
        dealCards();

        $('.player1 .table div:nth-of-type(1)').addClass('blocked');
        $('.player1 .points').text('?');
}



// Hit-button 

$('#hit-button').on('click', dealToPlayer);


// Stand-button 

$('#stand-button').on('click', playerStand); 

function playerStand() {
    $('#stand').prop('disabled', true);
    $('#hit').prop('disabled', true);

    $('.player1 .points').text(dealerScore);
    $('.player1 .table div:nth-of-type(1)').removeClass('blocked');
    playDealer();
}


// dealer drawing cards until it gets to 17 (*dealer hits at soft 17)

function playDealer() {
    while (dealerScore <= 17) {
        if (dealerScore === 17 && !dealerAces) {
            break;
        }
        dealToDealer();
    }

    checkWinner();
}


// checking and announcing the winner

function checkWinner() {
    $('.winner').prop('hidden', false);

    if (playerScore > 21) {
        if (dealerScore > 21) {
            $('.winner').text('You both busted');
        } else {
            $('.winner').text('Dealer won');
            $('.player1').addClass('shadow');
        }
    } else if (dealerScore > 21) {
        $('.winner').text('You won!');
        $('.player2').addClass('shadow');
    } else if (playerScore > dealerScore) {
        $('.winner').text('You won!');
        $('.player2').addClass('shadow');
    } else if (dealerScore > playerScore) {
        $('.winner').text('Dealer won');
        $('.player1').addClass('shadow');
    } else {
        $('.winner').text('It\'s a draw');
    }

}