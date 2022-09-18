
let playerSelection
let computerChoice
let matchResult
let gameResult = ''
let winner = ''
let looser = ''
let playerScore = '0'
let computerScore = '0'

// Defining existing content
const chalkboard = document.querySelector('#chalkboard')
const topBar = chalkboard.firstElementChild
const playerChoiceSquare = topBar.firstElementChild
const title = playerChoiceSquare.nextElementSibling.firstElementChild
const subtitle = title.nextElementSibling
const computerChoiceSquare = topBar.lastElementChild
const initialButtons = chalkboard.lastElementChild
const btnStart = initialButtons.firstElementChild
const btnCancel = initialButtons.lastElementChild

// removing side Squares at the beginning
topBar.removeChild(playerChoiceSquare)
topBar.removeChild(computerChoiceSquare)

// Adding listeners to existing buttons
btnStart.addEventListener('click', StartGameUI)
btnCancel.addEventListener('click', CancelGameUI)

// Creating player choice buttons section
const playerChoiceButtons = document.createElement('div')
playerChoiceButtons.classList.add('buttons')
const horizontalLine = document.createElement('div')
horizontalLine.classList.add('horizontalLine', 'border')
//      Creating rock Button
const rockButton = document.createElement('button')
rockButton.classList.add('rock', 'playerChoice')
rockButton.addEventListener('click', () => startGame('Rock'))
//      Creating paper Button
const paperButton = document.createElement('button')
paperButton.classList.add('paper', 'playerChoice')
paperButton.addEventListener('click', () => startGame('Paper'))
//      Creating Scissor Button
const scissorsButton = document.createElement('button')
scissorsButton.classList.add('scissors', 'playerChoice')
scissorsButton.addEventListener('click', () =>  startGame('Scissors'))
//      Sticking All Together
playerChoiceButtons.appendChild(rockButton)
playerChoiceButtons.appendChild(paperButton)
playerChoiceButtons.appendChild(scissorsButton)

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
//      Sticking all together
playerScoreSquare.appendChild(playerScoreTitle)
playerScoreSquare.appendChild(playerScoreValue)
scoreboard.appendChild(playerScoreSquare)

//      Creating divisor
const divisor = document.createElement('div')
divisor.classList.add('verticalLine', 'border')
scoreboard.appendChild(divisor)

//      Creating computer score elements
const cpuScoreSquare = document.createElement('div')
const cpuScoreSquareTitle = document.createElement('div')
const cpuScoreSquareValue = document.createElement('div')
//      Giving computer score classes
cpuScoreSquare.classList.add('cpuScore')
cpuScoreSquareTitle.classList.add('title')
cpuScoreSquareValue.classList.add('value')
//      Sticking all together
cpuScoreSquare.appendChild(cpuScoreSquareTitle)
cpuScoreSquare.appendChild(cpuScoreSquareValue)
scoreboard.appendChild(cpuScoreSquare)
updateScore()

// Creating replay Button
const replayButton = document.createElement('button')
replayButton.classList.add('neutral')
replayButton.textContent = 'Replay?'
replayButton.addEventListener('click', replay)

// Starting Game UI
function StartGameUI(e){
    title.textContent = 'Ok, Lets go!'
    subtitle.textContent = 'Make a choice now!'
    chalkboard.removeChild(initialButtons)
    chalkboard.appendChild(playerChoiceButtons)
    chalkboard.appendChild(horizontalLine)
    chalkboard.appendChild(scoreboard)
    topBar.insertBefore(playerChoiceSquare, topBar.firstElementChild)
    topBar.appendChild(computerChoiceSquare)
}
// Cancel Game Function (before it starts) UI
function CancelGameUI(e) {
    title.textContent = 'Well, Take your time'
    subtitle.textContent = 'and tell me when you are ready'
    initialButtons.removeChild(btnCancel)
    btnStart.classList.remove('authorize')
    btnStart.classList.add('neutral')
    btnStart.textContent = "I'm ready now!"
    btnStart.removeEventListener('click', StartGameUI)
    btnStart.addEventListener('click', UnCancelGameUI)
}
function UnCancelGameUI(e){
    title.removeAttribute('class')
    title.classList.add('title')
    title.textContent = 'Welcome my friend!'
    subtitle.textContent = 'Are you ready to play?'  
    
    initialButtons.appendChild(btnCancel)
    btnStart.classList.remove('neutral')
    btnStart.classList.add('authorize')
    btnStart.textContent = "Let's Go!"
    btnStart.removeEventListener('click', UnCancelGameUI)
    btnStart.addEventListener('click', StartGameUI)  

}
// Update Score
function updateScore(){
    //      Giving player score values
    playerScoreTitle.textContent = 'Player Score:'
    playerScoreValue.textContent = playerScore
    //      Giving computer score values
    cpuScoreSquareTitle.textContent = 'Computer Score:'
    cpuScoreSquareValue.textContent = computerScore

    // updating SideSquares

    playerChoiceSquare.lastElementChild.removeAttribute('class')
    playerChoiceSquare.lastElementChild.classList.add('playerChoice')
    if (playerSelection != undefined && playerSelection != '') playerChoiceSquare.lastElementChild.classList.add(playerSelection.toLowerCase())
    
    // updating SideSquares
    computerChoiceSquare.lastElementChild.removeAttribute('class')
    computerChoiceSquare.lastElementChild.classList.add('playerChoice')
    if (computerChoice != undefined && computerChoice != '') computerChoiceSquare.lastElementChild.classList.add(computerChoice.toLowerCase())
    
    if(playerScore >= 5 || computerScore >= 5) finishGame()
}
// Start playing the game
function startGame (playerChoice){
    computerChoice = getComputerChoice()
    playerSelection = playerChoice
    matchResult = GetWinner(playerSelection, computerChoice)
    setWinnerAndLooserSelection(matchResult, playerSelection, computerChoice)

    title.removeAttribute('class')
    title.classList.add('title')
    if (matchResult === 'Win') {
        playerScore++
        title.classList.add('win')
    }
    else if (matchResult === 'Loose') {
        computerScore++
        title.classList.add('loose')
    }
    else title.classList.add('draw')

    title.textContent = 'You ' + matchResult + '!';
    if (matchResult === 'Draw') subtitle.textContent = 'A ' + winner + ' draws with a ' + winner
    else subtitle.textContent = winner + ' beats ' + looser
    updateScore()
}
// Function to get the choice from the computer
function getComputerChoice(){
    let choice
    let pickedNumber = (Math.floor(Math.random()*100) + 1)
    return (pickedNumber >= 67) ? choice = 'Rock' : 
    (pickedNumber <= 33) ? choice = 'Paper' : 'Scissors'
}
// Compare decisions made and return the result
function GetWinner(playerSelection, computerSelection){
    return (playerSelection === 'Rock' && 'Scissors' === computerSelection ||
    playerSelection === 'Paper' && 'Rock' === computerSelection ||
    playerSelection === 'Scissors' && 'Paper' === computerSelection) ? 'Win' :
    (playerSelection === 'Rock' && 'Paper' === computerSelection ||
    playerSelection === 'Paper' && 'Scissors' === computerSelection ||
    playerSelection === 'Scissors' && 'Rock' === computerSelection) ? 'Loose' :
    'Draw';
}
// This is for make the winner and looser selections clear for displaying it
function setWinnerAndLooserSelection(endState, playerSelection, computerSelection){
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
// This is reached when some score hits 5
function finishGame(){
    title.removeAttribute('class')
    title.classList.add('title')
    if(playerScore >= 5) {
        title.textContent = 'Congratulations!'
        title.classList.add('win')
        subtitle.textContent = 'You are: the winner'
    }
    else{
        title.textContent = 'Too Bad!'
        title.classList.add('loose')
        subtitle.textContent = 'You are: the looser'
    }
    chalkboard.removeChild(playerChoiceButtons)
    chalkboard.removeChild(horizontalLine)
    chalkboard.appendChild(replayButton)
    topBar.removeChild(playerChoiceSquare)
    topBar.removeChild(computerChoiceSquare)
}
// Play again function
function replay() {
    chalkboard.removeChild(replayButton)
    chalkboard.removeChild(scoreboard)
    chalkboard.appendChild(initialButtons)
    // Restarting variables
    title.removeAttribute('class')
    title.classList.add('title')
    title.textContent = 'Welcome my friend!'
    subtitle.textContent = 'Are you ready to play?' 
    playerSelection = ''
    computerChoice = ''
    matchResult = ''
    gameResult = ''
    winner = ''
    looser = ''
    playerScore = '0'
    computerScore = '0'
    updateScore()
}