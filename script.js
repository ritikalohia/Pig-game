/*GAME RULES:

-The game has 2 players, playing in rounds
-In each turn, a player rolls a dice as many times as he whishes.
 Each result get added to his ROUND score
-BUT, if the player rolls a 1, all his ROUND score gets lost.After that,
 it's the next player's turn 
-The player can choose to 'Hold', which means that his ROUND score gets added
to his GLOBAL score.After that, it's the next player's turn.
-The first player to reach 100 points on GLOBAL score wins the game.   
*/

var scores, roundScore, activePlayer, gamePlaying;

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    score0 = document.getElementById('score--0');
    score1 = document.getElementById('score--1');
    current0 = document.getElementById('current--0');
    current1 = document.getElementById('current--1');
    document.querySelector('.dice').style.display = 'none';
    score0.textContent = '0';
    score1.textContent = '0';
    current0.textContent = '0';
    current1.textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('winner');
    document.querySelector('.player--1').classList.remove('winner');
    document.querySelector('.player--0').classList.remove('active');
    document.querySelector('.player--1').classList.remove('active');  
    document.querySelector('.player--0').classList.add('active');
 }
 init();

function nextPlayer(){
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
    // if(activePlayer === 0){
    //     activePlayer = 1;
    // }else{
    //     activePlayer = 0;
    // }
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    // document.querySelector('.player player--0').classList.remove('player--active');
    // document.querySelector('.player player--1').classList.add('player--active');
    /* classList is used to add, remove and toggle classes. */
}

 
 document.querySelector('.btn--roll').addEventListener('click', function() {
     if(gamePlaying){
        var dice= Math.floor(Math.random()*6) + 1;
        var diceDOM = document.querySelector('.dice'); 
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice+ '.png';
        
        //update the round score if the rolled number was not a 1
        if(dice >1) {
            roundScore +=dice ;
            document.querySelector('#current--' + activePlayer).textContent = roundScore; 
        }else{
            //next player
            nextPlayer();
        }
     }
 });

 document.querySelector('.btn--hold').addEventListener('click',function(){
     if(gamePlaying){
            //add current score to global score
    scores[activePlayer] += roundScore ;

    //Update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    //Check if player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--' +activePlayer).classList.add('player--winner');
        document.querySelector('.player--' +activePlayer).classList.remove('player--active');
        gamePlaying = false;
    }else{
         //Next player by pressing hold
         nextPlayer();    
    }
     }
 });

 document.querySelector('.btn--new').addEventListener('click', init());


 //document.querySelector('#current--' + activePlayer).textContent = dice;
//document.querySelector('#current--' + activePlayer).innerHTML = '<em>' +dice+ '<em>';
//var x = document.querySelector('#score--' + activePlayer).textContent  ;

/*CHALLENGE 6
 1. A player looses his ENTIRE score when he rolls two 6 in a row.After that, it's the next 
    player's turn. (HINT: Always save the previous dice roll in a separate variable).
 2. Add an input field to the HTML where players can set the winning score, so that they can change the
    predsfined score 100, (HINT: you can read tthat value with the .value property in javascript. This is a 
        good oppurtunity to use google to figure this out)
 3. Add another dice to the game, so that there are two dices now. The player looses his current score when 
    one of them is a 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS code
        for the first one.)       
 */