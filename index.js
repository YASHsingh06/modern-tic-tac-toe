const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGame=document.querySelector(".btn");

let currentPlayer;
let gameGrid;
let turnCount=0;

initGame();

boxes.forEach((box,index) => {
    box.addEventListener("click",() => handleClick(index));
   
});

newGame.addEventListener("click",initGame);

const winningPos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Anti-diagonal
  ];

function initGame(){
    turnCount=0;
    currentPlayer='X';
    gameGrid=['','','','','','','','','',];
    newGame.classList.remove("btn-active");
    gameInfo.innerText=`Current Player - ${currentPlayer} `;
    boxes.forEach((box)=>{
        box.style.pointerEvents="all";
        box.innerHTML='';
        box.classList.remove("win");
    });

}

function handleClick(index){
    
    if(gameGrid[index]===''){
        boxes[index].style.pointerEvents="none";
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;

        // swap turns
        swapTurn();

        // check if someone won
        checkGameStatus();
    }
}
function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer='O';
    }
    else{
        currentPlayer='X';
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`; 
}
function checkGameStatus(){
    
    turnCount++;
    winningPos.forEach((pos)=>{
        if (
            gameGrid[pos[0]] !== '' &&
            gameGrid[pos[1]] !== '' &&
            gameGrid[pos[2]] !== '' &&
            gameGrid[pos[0]] === gameGrid[pos[1]] &&
            gameGrid[pos[1]] === gameGrid[pos[2]]
        ) {
            updateWinner(pos);
        }
    });

    if(turnCount===9){
        gameInfo.innerText="Game Tied";
        newGame.classList.add("btn-active");
    }
    
}

function updateWinner(pos){

    if(boxes[pos[0]].innerHTML==='X'){
        gameInfo.innerText="WINNER - X";
    }
    else{
        gameInfo.innerText="WINNER - O";

    }

    boxes[pos[0]].classList.add("win");
    boxes[pos[1]].classList.add("win");
    boxes[pos[2]].classList.add("win");

    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    });
    newGame.classList.add("btn-active");
  

}