let container = document.querySelector('.container')

setTimeout( () => {
    if( db ){
        let dbtransaction = db.transaction('video', 'readonly');
        let video = dbtransaction.objectStore('video')
        let fetchRequest = video.getAll();
        fetchRequest.onsuccess = (e) => {
            let vids = fetchRequest.result;

            vids.forEach( (element) => {
                let media = document.createElement('div')
                media.className = 'media';
                media.setAttribute('id', element.id )
                let url = URL.createObjectURL( element.blobData )
                media.innerHTML = `
                    <div class="video-container">
                        <video controls src="${url}" autoplay></video>
                    </div>
                    <div class="action">
                        <div class="download">
                         <i class="fa-solid fa-download"></i>
                        </div>
                        <div class="remove">
                         <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    `;
                    let deleteBtn = media.querySelector('.remove');
                    deleteBtn.addEventListener('click', deleteListener );
                    let downloadBtn = media.querySelector('.download');
                    downloadBtn.addEventListener('click', downloadListener )

                    container.appendChild( media );
            });
        }
    }
}, 100 )

function deleteListener( e ){
    let id = e.currentTarget.parentElement.parentElement.getAttribute('id')
    let videoTransaction = db.transaction('video','readwrite')
    let videoStore = videoTransaction.objectStore('video')
    videoStore.delete( id );
    e.currentTarget.parentElement.parentElement.remove()
}

function downloadListener (e) {
    let id = e.currentTarget.parentElement.parentElement.getAttribute('id')
    let videoTransaction = db.transaction('video', 'readwrite')
    let videoStore = videoTransaction.objectStore('video')
    let request = videoStore.get( id )
    request.onsuccess = (e) => {
        let videoResult = request.result;
        console.log( videoResult )
        let url = URL.createObjectURL( videoResult.blobData )
        let a = document.createElement('a')
        a.href = url;
        a.download = 'stream.mp4'
        a.click();
    }

}