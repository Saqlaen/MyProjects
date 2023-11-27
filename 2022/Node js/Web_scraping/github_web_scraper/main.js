const req = require('request')
const url = 'https://github.com/topics'
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')
const { resolve } = require('path')

req( url , callback )

function callback( err, response, html ){
    if(err ){
        console.log(err)
    }
    else{
        getLinks( html )
    }
}

function getLinks( html ){
    let $ = cheerio.load(html)
    let link = $('.js-toggler-container.starring-container+a')
    for( let i=0; i<link.length; i++ ){
        let href = $(link[i]).attr('href');
        let topic = href.split('/').pop()
        let fulllink = `https://github.com${href}`
        console.log( fulllink )
        extractFromThisLink( fulllink, topic )
    }
}


function extractFromThisLink( url, topic ){
    req( url, cb )
    function cb( err, response, body ){
        if( err ){
            console.log( err )
        }
        else{
            console.log( response )
            getChildLinks( body, topic )
        }
    }
}

function getChildLinks( html, topic  ){
    let $ = cheerio.load( html );
    let childlink8 = $('.f3.color-fg-muted.text-normal.lh-condensed')
    console.log( topic )
    for( let i=0; i < childlink8.length; i++ ){
        let twoAnchors = $(childlink8[i]).find('a')
        let href = $(twoAnchors[1]).attr('href')
        if( href){
            let forwardlink =  `https://github.com${href}/issues`
            let reponame = href.split('/').pop()
            extractIssues( forwardlink, topic, reponame  )
        }
    }
}

function extractIssues( link, topic ,reponame ){
    req( link, calb  )
    function calb(err, resp, body ){
        if( err ){
            console.log( err )
        }
        else{
            collectIssues( body  , topic, reponame )
        }
    }
}

function collectIssues( body, topic , reponame  ){
    let $ = cheerio.load( body )
    let issueArr = $('.flex-auto.min-width-0.p-2.pr-3.pr-md-2>a')
    let arr = [];
    for( let i=0; i<issueArr.length; i++ ){
        // console.log( $(issueArr[i]).attr('href'))
        if( $(issueArr[i]).attr('href') != false ){
            arr.push( $(issueArr[i]).attr('href') )
        }
    }
    // console.log( arr )
    let folderpath = path.join(__dirname, topic );
    dirCreate( folderpath )
    let modulepath = path.join(folderpath, 'Issue_in_'+reponame);
    dirCreate( modulepath )
    let filepath = path.join( modulepath, reponame+'.json' )
    fs.writeFileSync( filepath, JSON.stringify(arr) )
}

function dirCreate( folderpath ){
    if( fs.existsSync(folderpath) == false ){
        fs.mkdirSync(folderpath)
    }
}