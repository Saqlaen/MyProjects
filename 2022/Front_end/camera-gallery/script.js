let video = document.querySelector("video")
let recordContainer = document.querySelector('.record-btn-container')
let captureContainer = document.querySelector('.capture-btn-container')
let record = document.querySelector('.record-btn')
let capture = document.querySelector('.capture-btn')
let timer = document.querySelector('.timer')
let filters = document.querySelectorAll('.filter')
let filterScreen = document.querySelector('.filter-screen')

let recorder ;
let chunks = [];

let recordFlag = false;
let captureflag = false;

let constraints = {
    video : true,
    audio : true
}

// navigator is a global object 
navigator.mediaDevices.getUserMedia( constraints )
.then( (stream) => {
    video.srcObject = stream;
    recorder = new MediaRecorder( stream );

    recorder.addEventListener('start', (e) =>{
        chunks = []
    } )
    recorder.addEventListener('dataavailable', (e) =>{
        chunks.push( e.data )
    } )
    recorder.addEventListener('stop', (e) => {
        let blob = new Blob( chunks, { type: "video/mp4"} )
        let videoURL = URL.createObjectURL( blob )
        let a = document.createElement('a')
        // a.href = videoURL;
        // a.download = 'stream.mp4';
        // a.click();

        if( db ){ 
            let vidId = shortid();
            let dbTransaction = db.transaction( "video","readwrite");
            let videoStore = dbTransaction.objectStore('video');
            let entry = { id: `img-${vidId}`,
                          blobData : blob
                        }
                videoStore.add( entry );
        }
    } )

} )
.catch( (err)=>{
    alert('please allow microphone and camera access')
})


recordContainer.addEventListener( 'click', (e) => {
    if( !recorder ) return;
    recordFlag = !recordFlag;
    if( recordFlag ){
        record.classList.add('scale-record')
         recorder.start()
         startTimer()
    }
    else{
        record.classList.remove('scale-record')
        recorder.stop()
        stopTimer()
    }

} )

captureContainer.addEventListener( 'click', (e)=> {
    captureflag = !captureflag;
    if( captureflag ){
        capture.classList.add('scale-capture')
    }
    
    let canvas = document.createElement('canvas');
    document.body.appendChild( canvas );
    canvas.width = video.width;
    canvas.height = video.height;
    
    let ctx = canvas.getContext('2d');
    ctx.drawImage( video, 0, 0, video.width, video.height );
    
    let imageURL = canvas.toDataURL()
    console.log( imageURL )
    
    let a = document.createElement('a');
    a.href = imageURL;
    a.download = 'image.jpg';
    a.click();

} )

filters.forEach( (filter) => {
    filter.addEventListener( 'click', (e) => {
        transparentColor = getComputedStyle(filter).getPropertyValue('background-color');
        filterScreen.style.backgroundColor = transparentColor;
    } )
} )


let timerId;
let counter = 0;

function startTimer(){
    timer.style.display = 'block';
    timerId = setInterval( ()=>{

        let totalSec = counter;
        let HH = Number.parseInt( totalSec / 3600 ) // in 1h we have 3600 seconds
        HH = ( HH < 10 ) ? `0${ HH }` : HH;
        totalSec = totalSec % 3600;

        let MM = Number.parseInt( totalSec / 60 )
        MM = ( MM < 10 ) ? `0${ MM }` : MM;
        totalSec = totalSec % 60;

        let seconds = totalSec;
        seconds = ( totalSec < 10) ? `0${totalSec}` : totalSec

        timer.innerText = `${ HH }:${ MM }:${ seconds }`

        counter++;
    }, 1000 )
}

function stopTimer(){
    timer.innerText = `00:00:00`;
    timer.style.display = 'none';
    clearInterval( timerId );
}