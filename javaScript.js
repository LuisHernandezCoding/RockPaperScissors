
let msjToPlayer
let playerSelection
let computerChoice
let gameResult
let winner = ''
let looser = ''
let playerScore = '0'
let computerScore = '0'
let finalResult
    
function getComputerChoice(){
    let choice
    let pickedNumber = (Math.floor(Math.random()*100) + 1)
    return (pickedNumber >= 67) ? choice = 'Rock' : 
    (pickedNumber <= 33) ? choice = 'Paper' : 'Scissors'
}

function Play(playerSelection, computerSelection){
    return (playerSelection === 'Rock' && 'Scissors' === computerSelection ||
    playerSelection === 'Paper' && 'Rock' === computerSelection ||
    playerSelection === 'Scissors' && 'Paper' === computerSelection) ? 'Win' :
    (playerSelection === 'Rock' && 'Paper' === computerSelection ||
    playerSelection === 'Paper' && 'Scissors' === computerSelection ||
    playerSelection === 'Scissors' && 'Rock' === computerSelection) ? 'Loose' :
    'Draw';
}

function setWinnerAndLooser(endState, playerSelection, computerSelection){
    if (endState === 'Win'){
        winner = playerSelection
        looser = computerSelection
    }
    else if (endState === 'Loose'){
        winner = computerSelection
        looser = playerSelection
    }
    else {
        winner = playerSelection
        looser = playerSelection
    }

}
function game(gamesQuantity){
    for (let i = 0; i < gamesQuantity; i++){
        msjToPlayer = (i === 0) ? 'Make your selection player' : 
        'Round ' + (i + 1) + ' Make your selection player, last round you ' + gameResult + ' with a ' + playerSelection
        let playerPrompt = prompt(msjToPlayer)
        playerSelection = playerPrompt.toString().charAt(0).toUpperCase() + playerPrompt.slice(1).toLowerCase();
   
        while (playerSelection != 'Rock' && playerSelection != 'Paper' && playerSelection && 'Scissors'){
            playerPrompt = prompt('WRONG INPUT... ' + msjToPlayer)
            playerSelection = playerPrompt.toString().charAt(0).toUpperCase() + playerPrompt.slice(1).toLowerCase();
        }

        computerChoice = getComputerChoice()
        gameResult = Play(playerSelection, computerChoice)
        setWinnerAndLooser(gameResult, playerSelection, computerChoice)

        if (gameResult === 'Win') playerScore++
        else if (gameResult === 'Loose') computerScore++

        let endString = 'Round ' + (i + 1) + ': ' +  'You ' + gameResult + '!';
        if (gameResult === 'Draw') endString += ', a ' + winner + ' never beat a ' + winner
        else endString += ', ' + winner + ' beats ' + looser

        console.log(endString)  
    }
    console.log('Final Score:')
    console.log('Player: ' + playerScore + ' - Computer: ' + computerScore)
    finalResult = (playerScore > computerScore) ? 'Win' :
                  (playerScore < computerScore) ? 'Loose' : 'Draw'
    console.log(finalResult)
}

// Defining existing content
const chalkboard = document.querySelector('#chalkboard')
const title = chalkboard.firstElementChild
const initialButtons = chalkboard.lastElementChild
const btnStart = initialButtons.firstElementChild
const btnCancel = initialButtons.lastElementChild

// Adding listeners to existing buttons
btnStart.addEventListener('click', StartGame)
btnCancel.addEventListener('click', CancelGame)

// Creating player choice buttons section
const playerChoiceButtons = document.createElement('div')
playerChoiceButtons.classList.add('buttons')
const rockButton = document.createElement('button')
rockButton.classList.add('rock', 'playerChoice')
const paperButton = document.createElement('button')
paperButton.classList.add('paper', 'playerChoice')
const scissorsButton = document.createElement('button')
scissorsButton.classList.add('scissors', 'playerChoice')
playerChoiceButtons.appendChild(rockButton)
playerChoiceButtons.appendChild(paperButton)
playerChoiceButtons.appendChild(scissorsButton)
const horizontalLine = document.createElement('div')
horizontalLine.classList.add('horizontalLine', 'border')

// Creating Scoreboard 
const scoreboard = document.createElement('div')
scoreboard.classList.add('scoreboard')
//      Creating player score elements
const playerScoreSquare = document.createElement('div')
const playerScoreTitle = document.createElement('div')
const playerScoreValue = document.createElement('div')
//      Giving player score classes
playerScoreSquare.classList.add('playerScore')
playerScoreTitle.classList.add('title')
playerScoreValue.classList.add('value')
//      Giving player score values
playerScoreTitle.textContent = 'Player Score:'
playerScoreValue.textContent = playerScore
//      Sticking all together
playerScoreSquare.appendChild(playerScoreTitle)
playerScoreSquare.appendChild(playerScoreValue)
scoreboard.appendChild(playerScoreSquare)

//      Creating computer score elements
const cpuScoreSquare = document.createElement('div')
const cpuScoreSquareTitle = document.createElement('div')
const cpuScoreSquareValue = document.createElement('div')
//      Giving computer score classes
cpuScoreSquare.classList.add('cpuScore')
cpuScoreSquareTitle.classList.add('title')
cpuScoreSquareValue.classList.add('value')
//      Giving computer score values
cpuScoreSquareTitle.textContent = 'Computer Score:'
cpuScoreSquareValue.textContent = computerScore
//      Sticking all together
cpuScoreSquare.appendChild(cpuScoreSquareTitle)
cpuScoreSquare.appendChild(cpuScoreSquareValue)
scoreboard.appendChild(cpuScoreSquare)

// Starting Game Function
function StartGame(e){
    title.textContent = 'Ok, Lets go! Make a choice now!'
    chalkboard.removeChild(initialButtons)
    chalkboard.appendChild(playerChoiceButtons)
    chalkboard.appendChild(horizontalLine)
    chalkboard.appendChild(scoreboard)
}

// Function for restarting initial buttons
function RestartInitialButtons(e) {
    initialButtons.appendChild(btnCancel)
    btnStart.classList.remove('neutral')
    btnStart.classList.add('authorize')
    btnStart.textContent = "Let's Go!"
    title.textContent = 'Are you ready to play?'
    btnStart.removeEventListener('click', RestartInitialButtons)
    btnStart.addEventListener('click', StartGame)
}
// Cancel Game Function (before it starts)
function CancelGame(e) {
    title.textContent = 'Well, Take your time'
    initialButtons.removeChild(btnCancel)
    btnStart.classList.remove('authorize')
    btnStart.classList.add('neutral')
    btnStart.textContent = "I'm ready now!"
    btnStart.removeEventListener('click', StartGame)
    btnStart.addEventListener('click', RestartInitialButtons)
}
