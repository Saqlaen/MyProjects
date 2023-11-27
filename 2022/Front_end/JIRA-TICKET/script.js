
let addTicket = document.querySelector('.add-btn')
let addFlag = false;
let removeFlag = false;
let mainContainer = document.querySelector('.main-container')
let modalContainer = document.querySelector('.modal-container')
let modal = document.querySelector('.modal-container');
let priorityColor = document.querySelectorAll('.p-color');
let removeTicket = document.querySelector('.remove-btn')
let filtercolor = document.querySelectorAll('.color')

let colors = ['lightpink', 'lightblue', 'lightgreen', 'black']
let currcolor = colors[colors.length-1];


let ticketArr = []

if( localStorage.getItem('tickets') ){
    ticketArr = JSON.parse( localStorage.getItem('tickets') )
    ticketArr.forEach( (obj) => {
        ticketCreation( obj.text, obj.textid, obj.color )
    } )
}

// for filtering
for( let i=0; i<filtercolor.length; i++ ){
    filtercolor[i].addEventListener('click', (e) =>{
        console.log( ticketArr )
        let selectedColor = filtercolor[i].classList[0];

        let filtedTickets = ticketArr.filter( (obj) => {
            return selectedColor == obj.color;
        } )

        let alltickets = document.querySelectorAll('.ticket-container')
        alltickets.forEach( (ticket) =>{
            ticket.remove()
        } )

        filtedTickets.forEach( (ticket)=>{
            ticketCreation( ticket.text, ticket.textid , ticket.color )
        })
    } )

    filtercolor[i].addEventListener('dblclick', (e) => {
        let alltickets = document.querySelectorAll('.ticket-container')
        alltickets.forEach( (ticket) =>{
            ticket.remove()
        })
        ticketArr.forEach( (ticket) => {
            ticketCreation( ticket.text, ticket.textid, ticket.color )
        } )
    } )
}

// add modal 
addTicket.addEventListener('click', (e)=>{
    let modal = document.querySelector('.modal-container')
    addFlag = !addFlag;
    if( addFlag ){
        modal.style.display = 'flex'
    }
    else{
        modal.style.display = 'none'
    }
})

// remove modal 
removeTicket.addEventListener( 'click', (e)=> {
    removeFlag = !removeFlag
    if( removeFlag ){
        removeTicket.style.backgroundColor = "#2196F3";
    }
    else{
        removeTicket.style.backgroundColor = '#2c2c54';
    }
})


// ticket creation
function ticketCreation( text, textid, color ){
    
    let ticketContainer = document.createElement('div')
    ticketContainer.classList.add('ticket-container')
    ticketContainer.innerHTML = `
            <div class="ticket-color ${color}"></div>
            <div class="ticket-id">#${textid}</div>
            <div class="ticket-area">${ text }</div>
            <div class="ticket-lock"> 
               <i class="lni lni-lock-alt"></i> 
            </div>`
    mainContainer.appendChild( ticketContainer )

    let addToArrflag = true;
    ticketArr.forEach( (obj) =>{
        if( obj.textid == textid ){
            addToArrflag = false;
        }
    } )

    if( addToArrflag ){
        ticketArr.push( {
            textid,
            color,
            text
        })

        localStorage.setItem('tickets', JSON.stringify(ticketArr))
    }

    handleremove( ticketContainer )
    handelLock( ticketContainer )
}

function handleremove( ticket ){
    let ticket_id = ticket.querySelector('.ticket-id')
    ticket.addEventListener( 'click', (e) => {
        if( !removeFlag ){ return; }
        
        let indx = ticketArr.findIndex( (obj) => {
            return obj.id == ticket_id;
        })
        ticketArr.splice( indx, 1);
        localStorage.setItem( 'tickets', JSON.stringify( ticketArr) );

        ticket.remove();
    } )
}


function handelLock( ticket ){
    let lockclass = 'lni-lock-alt';
    let unlockclass = 'lni-unlock';
    let ticket_id = ticket.querySelector('.ticket-id').innerText;
    ticket_id =  ticket_id.substring(1)
    let ticketArea = ticket.querySelector('.ticket-area')
    let ticket_lock = ticket.querySelector('.ticket-lock')
    let lockIcon = ticket_lock.children[0]
    
    lockIcon.addEventListener('click', (e)=>{

        if( lockIcon.classList.contains( lockclass ) ){
            lockIcon.classList.remove( lockclass)
            lockIcon.classList.add( unlockclass )
            ticketArea.setAttribute('contenteditable','true')
        }
        else{
            lockIcon.classList.remove( unlockclass)
            lockIcon.classList.add( lockclass )
            ticketArea.setAttribute('contenteditable','false')
        }

        // modified 
        let txt = ticketArea.innerText;
        let ticketIndx = ticketArr.findIndex( (obj) => {
            return obj.textid == ticket_id;
        } )
        console.log( ticketIndx )
        ticketArr[ticketIndx].text = txt;
        localStorage.setItem( 'tickets', JSON.stringify( ticketArr) );
    } )
}

modalContainer.addEventListener('keydown', (e) =>{
    let textArea = document.querySelector('.text-area')
    let key = e.key;
    if( key === 'Shift' ){
        let text = textArea.value
        ticketCreation( text, shortid() ,currcolor )
        modal.style.display = 'none'
        addFlag = false;
        textArea.value = "";
    }
})



priorityColor.forEach( (color, idx )=>{
    color.addEventListener('click', (e)=>{
        priorityColor.forEach( (c) =>{
            c.classList.remove('default')
            c.classList.remove('border')
        })
        currcolor = color.classList[1]
        color.classList.add('border')
    })
} )