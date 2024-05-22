const rulesBtn = document.querySelector('#rules-btn');
const gameRulesContainer = document.querySelector('.rules-container');
const rulesCloseBtn = document.querySelector('.close-btn');
const nextBtn = document.querySelector('#next-btn');
const userScore = document.querySelector('#user-score');
const compScore = document.querySelector('#comp-score');
const showWinnerContainer = document.querySelector('.show-winner-container');
const userPicks = document.querySelector('.user-pick');
const compPicks = document.querySelector('.comp-pick');
const roundDetailsTitle = document.querySelector('.round-details-title');
const roundDetailsExtra = document.querySelector('.round-details-extra');
const playAgainIndex = document.querySelector('.play-again-index');
const input = document.querySelector('.input');
const detailsContainer = document.querySelector('.details-container');

console.log(typeof(userScore.innerHTML));
computerMoves = ['rock', 'paper', 'scissors'];  // Moves computer can choose from

// Load the LocalStorage
window.addEventListener('load', () => {
    if(localStorage.length === 0){
        userScore.innerHTML = localStorage.setItem('userScore', 0);
        compScore.innerHTML = localStorage.setItem('compScore', 0);
    }
    
    userScore.innerHTML = localStorage.getItem('userScore');
    compScore.innerHTML = localStorage.getItem('compScore');
});

// Open the Game Rules
rulesBtn.addEventListener('click', () => {
    gameRulesContainer.style.display = 'flex';
});

// Close the Game Rules
rulesCloseBtn.addEventListener('click', function() {
    gameRulesContainer.style.display = 'none';
});

// Calculating Computers Move
const computersTurn = () => {
    return computerMoves[Math.floor(Math.random() * 3)];
};
console.log(computersTurn());

playAgainIndex.addEventListener('click', () => {
    showWinnerContainer.style.display = 'none';
    input.style.display = 'block';
    nextBtn.style.display = 'none';
})


// Checking the Result
function result(userTurn) {
    let whoWon = null;

    const compTurn = computersTurn();

    if(userTurn === compTurn) whoWon = 0;

    else if(userTurn === 'rock') {
        if(compTurn === 'paper') whoWon = -1;
        else if(compTurn === 'scissors') whoWon = 1;
    }

    else if(userTurn === 'paper') {
        if(compTurn === 'scissors') whoWon = -1;
        else if(compTurn === 'rock') whoWon = 1;
    }

    else if(userTurn === 'scissors') {
        if(compTurn === 'rock') whoWon = -1;
        else if(compTurn === 'paper') whoWon = 1;
    }

    // return whoWon;

    updateScore(whoWon);
    showWinner(userTurn, compTurn, whoWon);
};

// Updating the score after each play
function updateScore(result) {
    let userPoints = parseInt(userScore.innerHTML);
    let compPoints = parseInt(compScore.innerHTML);

    if(result === 1){
        userPoints += 1;
    } else if(result === -1) {
        compPoints += 1;
    }

    userScore.innerHTML = userPoints;
    compScore.innerHTML = compPoints;

    localStorage.setItem('userScore', userPoints);
    localStorage.setItem('compScore', compPoints);
}

function showWinner(userTurn, compTurn, whoWon) {
    input.style.display = 'none';
    showWinnerContainer.style.display = 'flex';

    userPicks.style.transform = 'translate(0%, 0%)';
    compPicks.style.transform = 'translate(0%, 0%)';
    detailsContainer.style.transform = 'translate(0%, 50%)';

    if(whoWon === 0){
        userPicks.src = `./assets/${userTurn}.svg`;
        userPicks.alt = `${userTurn}`;
        userPicks.style.width = '10rem';
        userPicks.style.transform = 'translate(50%, 50%)';

        compPicks.src = `./assets/${compTurn}.svg`;
        compPicks.alt = `${compTurn}`;
        compPicks.style.width = '10rem';
        compPicks.style.transform = 'translate(-50%, 50%)';


        roundDetailsTitle.innerHTML = "TIE UP";
        roundDetailsExtra.style.display = 'none';
    } else if(whoWon === 1) {
        userPicks.src = `./assets/${userTurn}-won.svg`;
        userPicks.alt = `${userTurn}`;
        userPicks.style.width = '20rem';

        compPicks.src = `./assets/${compTurn}.svg`;
        compPicks.alt = `${compTurn}`;
        compPicks.style.width = '10rem';
        compPicks.style.transform = 'translate(-50%, 0%)';
        // userPicks.style.marginLeft = '20px';

        detailsContainer.style.transform = 'translate(-50%, 0%)';

        roundDetailsTitle.innerHTML = "YOU WON";
        roundDetailsExtra.style.display = 'block';

        nextBtn.style.display = 'inline';
    } else if(whoWon === -1) {
        userPicks.src = `./assets/${userTurn}.svg`;
        userPicks.alt = `${userTurn}`;
        userPicks.style.width = '10rem';
        userPicks.style.transform = 'translate(50%, 0%)';
        // userPicks.style.marginLeft = '20px';

        compPicks.src = `./assets/${compTurn}-won.svg`;
        compPicks.alt = `${compTurn}`;
        compPicks.style.width = '20rem';

        detailsContainer.style.transform = 'translate(50%, 0%)';

        roundDetailsTitle.innerHTML = "YOU LOST";
    }
}
