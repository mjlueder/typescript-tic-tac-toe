/*-------------------------------- Constants --------------------------------*/

const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board: number[], turn: number, winner: boolean, tie: boolean

/*------------------------ Cached Element References ------------------------*/
  
const squareEls = document.querySelectorAll<HTMLDivElement>('.sqr')
const messageEl = document.getElementById('message')! as HTMLHeadingElement
const boardEl = document.querySelector('.board')! as HTMLElement
const resetBtnEl = document.querySelector<HTMLButtonElement>('.reset')!

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

init()  

function init(){
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = -1
  winner = false
  tie = false
  render()
}

function render(){
  updateBoard()
  updateMessage()
}

function updateBoard(){
  board.forEach(function(sqr, idx){
    if (sqr === 0) { squareEls[idx].textContent = ''} 
    if (sqr === 1) { squareEls[idx].textContent = '🦋' }
    if (sqr === -1) { squareEls[idx].textContent = '🪲' }
  })
}

function updateMessage() {
  let letter
  if (turn === -1) letter = '🪲'
  if (turn === 1) letter = '🦋'
  if (winner === false && tie === false){
    messageEl.textContent = `It's ${letter}'s turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie!`
  } else {
    messageEl.textContent = `Player ${letter} won!`
  }
}

function handleClick(evt: MouseEvent){
  if (!(evt.target instanceof HTMLElement)) return
  let sqIdx = Number(evt.target.id[2])
  if (isNaN(sqIdx)) return
  if (board[sqIdx]) return
  if (winner === true) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx: number) {
  board[idx] = turn
}

function checkForTie(){
  let checkTie = board.every(function(value){
    return value !== 0
  })
  tie = checkTie
}

function checkForWinner(){
    winningCombos.forEach(function(combo){
      let sum = 0
      combo.forEach(function(sqr){
        sum += board[sqr]
      })
      sum = Math.abs(sum)
      if (sum === 3) winner = true
    })
  }

function switchPlayerTurn(){
  if (winner === true) return
  turn *= -1
}