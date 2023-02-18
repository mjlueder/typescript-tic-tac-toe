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
// console.dir(squareEls);
const messageEl = document.getElementById('message')! as HTMLHeadingElement
// console.log(messageEl);
const boardEl = document.querySelector('.board')! as HTMLElement
// console.log(boardEl);
const resetBtnEl = document.querySelector<HTMLButtonElement>('.reset')!
// console.log(resetBtnEl);

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
    // console.dir(sqr);
    // console.log(idx);
    // console.log(squareEls[idx]);
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

// winner = true
// tie = true
// updateMessage()

function handleClick(evt: MouseEvent){
  // console.log(evt.target.id[2]);
  // console.dir(evt.target);
  // console.log(evt.target.textContent);
  if (!(evt.target instanceof HTMLElement)) return
  let sqIdx = Number(evt.target.id[2])
  // console.log(sqIdx);
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
  // console.log('board idx', idx, board[idx]);
}

function checkForTie(){
  let checkTie = board.every(function(value){
    return value !== 0
  })
  tie = checkTie
  // console.log(tie);
}

function checkForWinner(){
    winningCombos.forEach(function(combo){
      let sum = 0
      combo.forEach(function(sqr){
        // console.log(board[sqr])
        sum += board[sqr]
      })
      // console.log('sum ', sum);
      sum = Math.abs(sum)
      // console.log('abs ', sum);
      if (sum === 3) winner = true
      // console.log(winner);
    })
  }

// checkForWinner()

function switchPlayerTurn(){
  if (winner === true) return
  turn *= -1
  // console.log(turn);
}

