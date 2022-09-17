
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

const chalkboard = document.querySelector('.chalkboard')
console.log(chalkboard)