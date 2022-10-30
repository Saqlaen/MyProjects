const container = document.querySelector(".container");

const SQUARE = 800;

for( let i=0; i<SQUARE; i++ ){
    const square = document.createElement("div");
    square.classList.add("square");

    square.addEventListener("mouseover", ()=> setColor(square) );
    square.addEventListener("mouseout", ()=> removeColor(square) );

    container.appendChild(square);
}

function setColor(element){
    const color = randomColor();

    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    function randomColor(){
        return `rgb(${ getRandom(0,255) },${getRandom(0,255)},${getRandom(0,255)})`;
    }

    function getRandom( min, max ){
        return Math.floor( Math.random() * (max-min+1) ) + min;
    }
}

function removeColor(element){
    element.style.background = "#1d1d1d";
    element.style.boxShadow = "0 0 2px #000"
}