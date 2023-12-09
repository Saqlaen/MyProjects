const { 
    Worker, 
    isMainThread, 
    workerData 
} = require('worker_threads');



if( isMainThread ){
    console.log( 'main thread! processID -> ' + process.pid );
    console.log( 'creating worker')
    new Worker( __filename, {
        workerData: [3, 1, 6, 7 ]
    } );
    console.log("creating worker");
    new Worker(__filename, {
        workerData: [ 2 , 6, 7, 2]
    });
}
else{
    console.log( "Worker thread processID -> " + process.pid);
    console.log( `workerData ${workerData} sorted data is ${ workerData.sort() }` );
}