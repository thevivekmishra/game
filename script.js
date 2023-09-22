const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    //horizontally
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //vertically
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //diagonally
    [0,4,8],
    [2,4,6],
];

//function to initilize a game
function initGame(){
    //first player when game start x
    currentPlayer = "X";
    //when game start grids are empty
    gameGrid = ["","","","","","","","",""];
    //when game start new button hidden
    newGameBtn.classList.remove("active");
    //game info show the status of current player
    gameInfo.innerText=`Current Player - ${currentPlayer}`;

    //function when new button clicked
    boxes.forEach((box,index) => {
        box.innerText="";
        //cursor become pointer
        boxes[index].style.pointerEvents="all";
        //to remove green bg color 
        box.classList = `box box${index+1}`;
    });
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position) => {
if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
     && ( gameGrid[position[0]] === gameGrid[position[1]]) && ( gameGrid[position[1]] === gameGrid[position[2]])){
    
        //check if x wins
        if(gameGrid[position[0]] === "X")
        answer="X";
    else
       answer="O";
  //we have to disable pointer events
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  })

       //setting background color 
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");
    }
    });
    
    // we have to show who is winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        //we have to active new button because is declared 
        newGameBtn.classList.add("active");
        return;
        
        //now background set but grid also take input 
        //so we have to write functon that check the fill count and stop pointer events

    }

    //tie condition
      let fillCount = 0;
      gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
      });

      if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
      }
     
}


function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap
        swapTurn();
        //check winning condition
        checkGameOver();
    }
}


boxes.forEach((box,index) => {
    box.addEventListener("click",() =>{
        handleClick(index);
    })
})

//when we click on new game it initilize the value which is 
//stored inside init function
newGameBtn.addEventListener("click",initGame);

const button=document.querySelector(".button");

button.addEventListener("click", initGame);