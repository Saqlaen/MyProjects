let db;
let dbrequest = indexedDB.open('gallerydb')
dbrequest.addEventListener('success',(e) => {
    db = dbrequest.result;
})

dbrequest.addEventListener( 'error', (e) => { console.log( error ) } );

dbrequest.addEventListener( 'upgradeneeded', (e) => {
    db = dbrequest.result;

    db.createObjectStore('video', { keyPath : 'id'} );
} )

