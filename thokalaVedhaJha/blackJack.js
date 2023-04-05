"use strict"

//page load event
window.addEventListener("load", function(){
	//card symbols
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
//DOM variables
let textArea = document.getElementById('text-area');
let newGameBtn = document.getElementById('newGameBtn');
let hitBtn = document.getElementById('hitBtn');
let stayBtn = document.getElementById('stayBtn');

//Game Variables
let playerCards = [],
    dealerCards = [],
    deck = [],
    dealerScore = 0,
	dealerFirstCard='',
    playerScore = 0,
    gameOver = false,
    gameStarted = false,
    matchDrawn = false,
    playerWon = false,
	aceSpecialCase = false;
	hitBtn.style.display = 'none';
	stayBtn.style.display = 'none';

//event listener for the new game button
document.getElementById("newGameBtn").addEventListener('click', function(){
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    matchDrawn = false;
    deck = [];
	dealerFirstCard='';
    dealerCards = [];
    playerCards = [];
	//create the card deck using arrays
    deck = CreateDeck();
	//shuffle the cards using random function
    deck = shuffleDeck(deck);
	//distribute cards
    distributeCards();
    
    newGameBtn.style.display = 'none';
    hitBtn.style.display = 'inline';
    stayBtn.style.display = 'inline';
    
    showStatus();
},false);


//event listener for the hit button
document.getElementById("hitBtn").addEventListener('click', function(){
	//player gets the next card from the deck
    playerCards.push(GetNextCard());
	//Whenever player takes a new card check for the game completion
    checkForEndOfGame();
	//whenever player takes new card update status message
    showStatus();
},false);

//event listener for the stay button
document.getElementById("stayBtn").addEventListener('click', function(){
	//once player hits stay button game is over
    gameOver = true;
	//determine the winner
    checkForEndOfGame();
	//update the outcome
    showStatus();
},false);

//This function will creates a deck. 
function CreateDeck(){
  let deck = [];
  //Iterate over suites
  for (let suiteIdx = 0; suiteIdx < suits.length; suiteIdx++) {
	//Iterate over cards
    for (let valuesIdx = 0; valuesIdx < values.length; valuesIdx++) {
        //new card
		let card = { 
            suit: suits[suiteIdx],
            value: values[valuesIdx]
        };
		//Add card to deck
        deck.push(card);
    }
  }
  return deck;
}

//shuffle the cards using random function
function shuffleDeck(deck){ 
	//Iterate over the deck
    for(let shuffleIdx=0; shuffleIdx < deck.length; shuffleIdx++)
	{
		//generate random index
        let randomIndex = Math.trunc(Math.random() * deck.length);
		//store the card in the random index of the deck
        let temp = deck[randomIndex];
		//store current iteration card (shuffle index) in random index
        deck[randomIndex] = deck[shuffleIdx];
		//store the random index card (which we stored in temp) in current index (shuffle index)
        deck[shuffleIdx] = temp;   
    }
    return deck;
}

//give 2 cards each to player and dealer initially in the game
function distributeCards(){
    playerCards.push(GetNextCard());
    dealerCards.push(GetNextCard());
    playerCards.push(GetNextCard());
    dealerCards.push(GetNextCard());
	//storing dealer's 1st card
	dealerFirstCard = DisplayCardString(dealerCards[0]);
}

//Shows status of the game to user
function showStatus(){
	//if the game has not started, display welcome message to user
    if(!gameStarted){
        textArea.innerText = 'Welcome to Blackjack!';
    }
	//display scores
    showScores();
    
	//if game is over show the outdome to the user
    if(gameOver){
       if(playerWon){
           textArea.innerText += "YOU WIN!";
       }else if(matchDrawn){
            textArea.innerText += "MATCH DRAWN!";
        }else{
           textArea.innerText += "Dealer WINS!";
       }
        newGameBtn.style.display = 'inline';
		//hide hit, stay buttons before the game starts
        hitBtn.style.display = 'none';
        stayBtn.style.display = 'none';
    }
}

//Checks for the game completion
function checkForEndOfGame(){
    //get updated scores
	updateScores();
	
	//When Game ends, delaer should take the cards unitl his score greater than 17
    if(gameOver){
		while(dealerScore < 17){
			//take next available card from deck
			dealerCards.push(GetNextCard());
			//alert the user that dealer taking next card
			alert("Dealer Took Card " + dealerCards.length + ": " + DisplayCardString(dealerCards[dealerCards.length-1]));
			//update the scores message with new dealer card
			showScores();
		}
    }
    //If Player score greater than 21, player looses and game ends
    if(playerScore > 21){
        playerWon = false;
        gameOver = true;
    }
	//If dealer score greater than 21, player wins and game ends
	else if(dealerScore > 21){
        playerWon = true;
        gameOver = true;
    }else if(gameOver){
		//Determine the outcome when game ends
        if(playerScore > dealerScore){
            playerWon = true;
        }else if(playerScore < dealerScore){
            playerWon = false; 
        }else{
            matchDrawn = true;
        }
    }
}

//function to show the scores
function showScores(){
	//Create Dealer Cards Display Message
	let dealerCardString = '';
    for(let i=0; i<dealerCards.length; i++)
	{
        dealerCardString += 'Card ' + (i+1) + ': ' + DisplayCardString(dealerCards[i]) + '\n'; 
    }
    //Create Player Cards Display Message
    let playerCardString = '';
    for(let i=0; i<playerCards.length; i++){
		playerCardString += 'Card ' + (i+1) + ': ' + DisplayCardString(playerCards[i]) + '\n'; 
    }
	//Update SCores
	updateScores();
	
	//When game started 
	//1. Display Dealer First card, second card is secret
	//2. Display Player Cards
	if(gameStarted){
		textArea.innerText = 
			'Dealer has:\nCard 1: ' + dealerFirstCard + '\nCard 2: ***SECRET*** \n Dealer will take more cards if his total is less than 17' +
			'\n\n Player has: \n'+
			playerCardString +
			'(score' + playerScore + ')\n\n';
	}
	
	//display the final cards score when the game ends
	if(gameOver){
		textArea.innerText = 
        'Dealer has: \n' + 
        dealerCardString + 
        '(score' + dealerScore + ')\n\n' +
        '\n\n Player has: \n'+
        playerCardString +
        '(score' + playerScore + ')\n\n';
	}

}

//Counts the current cards for player and dealer
function updateScores(){
	//count dealer cards
    dealerScore = countScores(dealerCards);
	//count player cards
    playerScore = countScores(playerCards);
}

//Display any card
function DisplayCardString(card){
	if(card.value.toLowerCase() == 'ace'){
		return getCardString(card) + '(1 or 11)';
	}else{
		return getCardString(card) + '(' +getCardNumericValue(card) + ')';
	}
}

//Return a String with card Value With Suit 
function getCardString(card){
    return card.value + ' of ' + card.suit;
}

//get next card from the deck 
function GetNextCard(){
	//removes element in the 0th position and returns the removes value
	return deck.shift();
}

//Returns given card value for scoring purpose
function getCardNumericValue(card){
	//Assigning values to cards
    switch(card.value.toLowerCase()){
        case 'ace':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return 10;  
    }
}

//Counts given deck scores
function countScores(deck){
    let score = 0;
    let hasAce = false;
    let aceCount = 0;
    for(let i=0; i<deck.length; i++)
	{
        let card = deck[i];
		//ace can be considered as 1 or 11 so get the ace count in the cards
        if(card.value.toLowerCase() == 'ace'){
            hasAce = true;
            aceCount++;
        }
        score += getCardNumericValue(card);
    }
	//by default ace is 1 from getcardnumeric value function
    if(hasAce && score+10 <= 21)
	{
		//if the total score considering ace as 11 is not exceeding 21 return 11 for ace
        return score + 10;
    }
	//return player/dealer score
    return score;
}

},//end load function,
false);//end load
