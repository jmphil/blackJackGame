//Global Variables
var theDeck = [];
var playerHand =[];
var dealerHand = [];
var bank = 100;
var betAmount = 0;

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})
//Deck (incomplete)
function Deal (){
  
}

//Shuffle
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}