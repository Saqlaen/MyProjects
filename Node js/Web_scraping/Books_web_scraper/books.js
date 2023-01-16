const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const xl  = require('xlsx')

const url = 'https://books.toscrape.com/index.html'

let UpperLayername;

request( url , callback )

function callback( err , response, html ){
    if( err ){
        console.log( error )
    }
    else{
        console.log( response )
        start( html )
    }
}

function start( html ){
    let $ = cheerio.load( html )
    let title = $('.side_categories > ul > li > a')
    UpperLayername =  $( title ).text().trim();
    let category = $('.side_categories > ul > li > ul > li a')
    for( let i=0; i<category.length; i++ ){
        let catName = $(category[i]).text().trim()
        let link  = $(category[i]).attr('href')
        let fullLink = 'https://books.toscrape.com/'+link;
        getProducts( fullLink, catName)
    }
}

function getProducts( link, categoryName ){
    request( link, function( err , resp, html ){
        if( err ){
            console.log( err )
        }
        else{
            getListOfBooks( html ,  categoryName.replaceAll(' ','-') )
        }
    } )
}

function getListOfBooks( html, categoryName ){
    let $ = cheerio.load( html )
    let allPro = $('.col-xs-6.col-sm-4.col-md-3.col-lg-3')

    for( let i=0; i<allPro.length; i++ ){
        let product  = $(allPro[i]).find('.price_color')
        let price = $(product).text()
        let nameAndLink = $(allPro[i]).find('h3>a')
        let title = $(nameAndLink).attr('title')
        let bookName = $(nameAndLink).text().trim().split(' ')
        let link = $(nameAndLink).attr('href').split('../')[3]
        let fullLink = 'https://books.toscrape.com/catalogue/'+link;
        makeFolder(  title, price, fullLink, categoryName , i+1 )
    }
}

function makeFolder(  title, price, href, categoryName, i ){
    let dir = path.join(__dirname,UpperLayername) 
    createDir( dir )
    let category = path.join( dir , categoryName )
    createDir( category )


    let xlfile = path.join( category, categoryName+'.xlsx' )
    let content = excelreader( xlfile, 'sheet-01')
    let obj = {                  // if the key and value have the same name then you can write any one
                title,
                price,
                href 
            }
    content.push( obj )
    excelFileWriter( xlfile, content, 'sheet-01' )
    console.log( content )

    let filepath = path.join( category, i+'_data.json')
    fs.writeFileSync( filepath , JSON.stringify( obj ))

}

function createDir( dir ){
    if( fs.existsSync( dir ) == false ){
        fs.mkdirSync( dir )
    }
}

function excelreader( filepath , sheetname ){
    if( fs.existsSync(filepath) == false ){
        return [];
    }
    let workbook = xl.readFile( filepath );
    let excelData = workbook.Sheets[sheetname];
    let ans = xl.utils.sheet_to_json(excelData)
    return ans;
}

function excelFileWriter( path, json, sheetname ){
    let newB = xl.utils.book_new();
    let newS = xl.utils.json_to_sheet(json);
    xl.utils.book_append_sheet( newB, newS, sheetname )
    xl.writeFile( newB, path )
}


console.log('finish')