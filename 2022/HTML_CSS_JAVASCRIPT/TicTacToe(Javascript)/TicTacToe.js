const gameContainer = document.querySelector(".gameContainer");
const submit = document.getElementById("submit");
const details = document.querySelector(".details");
const message = document.querySelector(".message");
const tryAgain = document.getElementById("tryAgain");

let player1 = "";
let palyer2 = "";
let keepPlaying = true;
let tieCheck = 0;
const winningCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

let activePlayer;
function startGame(){
    activePlayer== Math.floor(Math.random()*2);
} 
//0 for player 1
//1 for player 2
function updateActivePlayer(){
    if( activePlayer==0 ){
        activePlayer = 1;
    }
    else{
        activePlayer = 0
    }
}

function showMessage(name){
    message.innerHTML = `<h1>${name}</h1>` ;
}

function showGrid(){
    palyer1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    startGame();
    showMessage(`${ activePlayer==0 ? palyer1 : player2 } your turn`);

    details.style.display = "none";
    gameContainer.style.display = "flex";

    for(let i=1; i<=9; i++){
        const div = document.createElement("div");
        div.id = i;
        div.classList.add("game-slot");

        div.addEventListener("click",()=>{
            if(!div.innerHTML && keepPlaying ){
                div.innerHTML = activePlayer==0 ? "X" : "O";
                activePlayer==0 ? div.style.color = "red" : div.style.color = "blue";
                tieCheck++;

                const winner = checkWinner();
                if(!winner){
                    updateActivePlayer();
                    showMessage(`${ activePlayer==0 ? palyer1 : player2 } your turn`);
                }
                else{
                    showMessage(`${ activePlayer==0 ? palyer1 : player2 } Congractulation`);
                    keepPlaying = true;
                    tryAgain.style.visibility = "visible";
                    tieCheck = 0;
                }
                if(tieCheck==9){
                    showMessage("TRY AGAIN!!!!!!");
                    tryAgain.style.visibility = "visible";
                    keepPlaying = true;
                    tieCheck = 0;
                }
            }
        })

        gameContainer.appendChild(div);
    }
}


function checkWinner(){
    let flag = false;
    for(let i=0;i< winningCondition.length; i++ ){
        const winCombo = winningCondition[i];

        const cell1 = document.getElementById(winCombo[0]+1);
        const cell2 = document.getElementById(winCombo[1]+1);
        const cell3 = document.getElementById(winCombo[2]+1);

        const val1 = cell1.innerText;
        const val2 = cell2.innerText;
        const val3 = cell3.innerText;

        if( val1==val2 && val2==val3 && val1!=""){
            flag = true;
            keepPlaying = false;
            cell1.style.backgroundColor = "greenyellow";
            cell2.style.backgroundColor = "greenyellow";
            cell3.style.backgroundColor = "greenyellow";
            break;
        }
    }
    return flag;
}

function removeval(){
    for(let i=1;i<=9;i++){
        const div = document.getElementById(i);
        gameContainer.removeChild(div);
    }
    showGrid();
}

submit.addEventListener("click", showGrid);
tryAgain.addEventListener("click",removeval);