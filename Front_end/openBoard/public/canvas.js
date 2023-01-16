let canvas = document.createElement('canvas');
let pencilwidth = document.querySelector('.pencil-tool-width')
let eraserwidth = document.querySelector('.eraser-tool-width')
let pencilcolors = document.querySelectorAll('.pencil-color')
let download = document.querySelector('.downloadsvg')
let undo = document.querySelector('.undosvg')
let redo = document.querySelector('.redosvg')

let pencilvalue;
let eraservalue;
let color = 'red';

let tempurl = canvas.toDataURL();
let undoRedoArr = [ tempurl ];
let track = 0;

document.body.appendChild(canvas)
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');




let mouseDown = false;
// context.beginPath();
// context.moveTo(0,0);
// context.lineTo(150,150);
// context.stroke();

pencilcolors.forEach( (colors) => {
    colors.addEventListener( 'click', (e) => {
        console.log( e.target )
        color = colors.classList[1];
    })
} )

pencilwidth.addEventListener('change', (e) => {
    pencilvalue = pencilwidth.value;
} )

eraserwidth.addEventListener('change', (e) => {
    color = 'white';
    eraservalue = eraserwidth.value;
    if( eraservalue == 10 ){
        eraservalue = 100;
    }
    console.log( eraservalue )
} )

download.addEventListener('click', (e) => {

    let url = canvas.toDataURL();
    let a = document.createElement('a')
    a.href = url;
    a.download = 'board.jpg';
    a.click();
} )

undo.addEventListener( 'click', (e) => {
    if( track == 0 ) return;
    if( track > 0 ){
        track--;
        canvasUndoRedo();
    } 
} )

redo.addEventListener( 'click', (e) => {
    if( track < undoRedoArr.length - 1 ){
        track++;
        canvasUndoRedo()
    } 
} )

function canvasUndoRedo( ){

        console.log( track )
        let url = undoRedoArr[track];
        let img = new Image();
        img.src = url;
        img.onload = (e) => {
            context.drawImage( img , 0, 0, canvas.width, canvas.height);
        } 
    
}

canvas.addEventListener( 'mousedown', (e) => {
    mouseDown = true;
    boardBeginPath( { 
        x : e.clientX,
        y : e.clientY,
        color_style : color,
        width : eraserflag ? eraservalue : pencilvalue
     })
} )

canvas.addEventListener( 'mousemove', (e) => {
    if( mouseDown ){
        drawLine( {
            x : e.clientX,
            y : e.clientY
        } )
    }
})

canvas.addEventListener( 'mouseup', (e) => {
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoArr.push( url );
    track = undoRedoArr.length-1;
} )


function boardBeginPath( obj ){
    context.strokeStyle = obj.color_style;
    context.lineWidth = obj.width;
    context.beginPath();
    context.moveTo( obj.x, obj.y );
}

function drawLine( obj ){
    context.lineTo( obj.x, obj.y );
    context.stroke();
}

