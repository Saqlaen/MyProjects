let optionsContent = document.querySelector('.options-container')
let toolsContainer = document.querySelector('.tools-container')
let pencil_tools = document.querySelector('.pencil-tool')
let eraser_tools = document.querySelector('.eraser-tool')
let pencil = document.querySelector('.pencilsvg')
let eraser = document.querySelector('.erasersvg')
let stickynote = document.querySelector('.stickysvg')
let upload = document.querySelector('.uploadsvg')
let optionflag = false;
let pencilflag = false;
let eraserflag = false;

optionsContent.addEventListener('click', (e) => {
    let x = 'fa-x';
    let lines = 'fa-bars'
    let icon = optionsContent.children[0];
    optionflag = !optionflag;
    if( optionflag ){
        icon.classList.remove(x);
        icon.classList.add( lines );
        toolsContainer.style.display = 'flex';
    }
    else{
        icon.classList.remove( lines );
        icon.classList.add( x );
        toolsContainer.style.display = 'none';
        pencil_tools.style.display = 'none';
        eraser_tools.style.display = 'none';
    }

})

pencil.addEventListener('click', (e) => {
    // e.stopPropagation();
    pencilflag = !pencilflag;
    if( pencilflag ){
        pencil_tools.style.display = 'block';
    } 
    else{
        pencil_tools.style.display = 'none';
    }
} )

eraser.addEventListener('click', (e) => {
    eraserflag = !eraserflag;
    if( eraserflag ){
        eraser_tools.style.display = 'flex';
    }
    else{
        eraser_tools.style.display = 'none';
    }
} )

stickynote.addEventListener( 'click', (e) => { 
    let stickeyContainer = document.createElement('div')
    stickeyContainer.setAttribute('class','sticky-container')
    stickeyContainer.innerHTML = 
    `
    <div class="header">
        <div class="minimize"></div>
        <div class="delete"></div>
    </div>
    <div class="body">
        <textarea></textarea>
    </div>
    `
    document.body.appendChild( stickeyContainer );

    let minimize = stickeyContainer.querySelector('.minimize');
    let remove = stickeyContainer.querySelector('.delete');
    stickyNoteAction( minimize, remove, stickeyContainer);

    stickeyContainer.onmousedown = function(event){
       dragAndDrop( stickeyContainer ,event)
    };
    stickeyContainer.ondragstart = function() {
        return false;
    };

} )

function stickyNoteAction( minimize, remove, stickeyContainer ){
    remove.addEventListener('click', (e) => {
        stickeyContainer.remove();
    } )

    minimize.addEventListener( 'click', (e) => {
        let note = stickeyContainer.querySelector('.body')
        let display = getComputedStyle(note).getPropertyValue('display')
        if( display === 'none' ){
            note.style.display = 'block'
        }
        else{
            note.style.display = 'none';
        }
    } )
}

function dragAndDrop( stickeyContainer, event ){
    let shiftX = event.clientX - stickeyContainer.getBoundingClientRect().left;
    let shiftY = event.clientY - stickeyContainer.getBoundingClientRect().top;
  
    stickeyContainer.style.position = 'absolute';
    stickeyContainer.style.zIndex = 1000;
  
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        stickeyContainer.style.left = pageX - shiftX + 'px';
        stickeyContainer.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    stickeyContainer.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      stickeyContainer.onmouseup = null;
    };
}

upload.addEventListener( 'click', (e) => {
    let input = document.createElement('input')
    input.setAttribute('type','file');
    input.click();

    input.addEventListener( 'change', (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL( file );

        let stickeyContainer = document.createElement('div')
        stickeyContainer.setAttribute('class','sticky-container')
        stickeyContainer.innerHTML = 
        `
        <div class="header">
            <div class="minimize"></div>
            <div class="delete"></div>
        </div>
        <div class="body">
            <img src="${url}">
        </div>
        `
        document.body.appendChild( stickeyContainer );
        let minimize = stickeyContainer.querySelector('.minimize');
        let remove = stickeyContainer.querySelector('.delete');
        stickyNoteAction( minimize, remove, stickeyContainer);

        stickeyContainer.onmousedown = function(event){
        dragAndDrop( stickeyContainer ,event)
        };
        stickeyContainer.ondragstart = function() {
            return false;
        };


    } )
} )