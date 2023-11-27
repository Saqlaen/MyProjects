const puppeteer = require('puppeteer');
const url = 'https://www.youtube.com/playlist?list=PLW-S5oymMexXTgRyT3BWVt_y608nt85Uj';
const fs = require('fs')
const path = require('path');
const xlsx = require('xlsx')

let tab;
(async function(){
    try {
        let browser = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ['--start-maximized']
        })
        tab = await browser.newPage()
        await tab.goto( url )
        await tab.waitForSelector('.dynamic-text-container.style-scope.yt-dynamic-sizing-formatted-string .style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28')
        
        let playlistName = await tab.evaluate( (selector) =>{
            return document.querySelector(selector).innerText;
        }, '.style-scope.yt-dynamic-sizing-formatted-string.yt-sans-28')
        
        let views = await tab.evaluate( (sel)=>{
            let ar =  document.querySelectorAll(sel)
            return ar[1].innerText;
        }, '.byline-item.style-scope.ytd-playlist-byline-renderer')

        let nameObj = await tab.evaluate( getPlaylistInfo , '.byline-item.style-scope.ytd-playlist-byline-renderer > .style-scope.yt-formatted-string' )
        let totalVid = nameObj.vidNo.trim()

        console.log( playlistName, views,  totalVid, nameObj.date )

        let currPageVid = await getCurrPagevideosLen()
        console.log(currPageVid)

        while( totalVid - currPageVid > 0 ){

            //scroll till end of the page 
            await scrollToBottom()
            currPageVid = await getCurrPagevideosLen()
        }

        let completelist = await getStats()

        let folderPath =  path.join( __dirname, 'NCS_songs' )
        let filePath = path.join( folderPath, 'songs.json')
        dirCreate( folderPath )
        let json = JSON.stringify( completelist );
        fs.writeFileSync( filePath , json )
        //filePath.split('.json')[0]
        createxl( json ,  'songs.xlsx' )
        


    } catch (error) {
        console.log( error )
    }
}
)()

function getPlaylistInfo( selector ){
    let allEle = document.querySelectorAll( selector )
    let vidNo = allEle[0].innerText;
    let date =  allEle[3].innerText; 
    return {
        vidNo,
        date
    }
}

async function getCurrPagevideosLen(){
   let len = await tab.evaluate( getLenght, '#thumbnail > .yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail' ); 
   return len;
}

function getLenght( selector ){
    let videosInPage = document.querySelectorAll(selector)
    return videosInPage.length;
}

async function scrollToBottom(){
    await tab.evaluate( gotobottom )
    function gotobottom(){
        window.scrollBy( 0, window.innerHeight )
    }
}

async function getStats(){
    let list = await tab.evaluate( getNameAndDuration , 
                                   'h3 #video-title', 
                                   '.style-scope ytd-thumbnail #text' )
    return list;
}

function getNameAndDuration( videoSelector, durationSelector ){
    let videoTitle = document.querySelectorAll( videoSelector )
    let duration = document.querySelectorAll( durationSelector )
    console.log('in here')
    let videoInfo = []
    for( let i = 0; i<duration.length; i++ ){
        let title = videoTitle[i].innerText;
        let len = duration[i].innerText;
        len = len.trim('\n')
        videoInfo.push( { title , len } )
    }
    return videoInfo;
}

function dirCreate( path ){
    if( fs.existsSync(path) == false ){
        fs.mkdirSync( path )
    }
}

function createxl( json , xlname ){
    let book = xlsx.utils.book_new()
    let sheet = xlsx.utils.json_to_sheet( json )
    xlsx.utils.book_append_sheet( book , sheet, 'sheet-1' )
    xlsx.writeFile( book , xlname )
}