//Global Variables


window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})
//Deck (incomplete)
class deck {
    constructor(){
      this.deck = []
      this.dealtCard = []
    }

    generateDeck(){

      let card = (suit, value)  => {
        this.name = value + 'of' + suit
        this.suit = suit
        this.value = value

        return {name:this.name, suit:this.suit, value:this.value}
      }

      let values = 
    }
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