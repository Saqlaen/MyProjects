const puppeteer = require('puppeteer')
const { resolve } = require('uri-js')
const url = 'https://www.hackerrank.com/auth/login'
const codeObj = require('./codes.js')

// 'first last 
const pass =  'qwerty@123'
const email = 'havipop844@letpays.com';

// immediatly invoked functoin
( async function(){

    try {
        const browserP = await puppeteer.launch( 
            {
                headless : false,
                args : ['--start-maximized'],
                defaultViewport : null
            })
            let page = await browserP.pages()
            let newPage = page[0]
            await newPage.goto(url)
            await newPage.waitForSelector('#input-1', { visible : true })
            await newPage.type('#input-1', email)
            await newPage.waitForSelector('#input-2', { visible : true })
            await newPage.type( '#input-2', pass )
            await newPage.click( '.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled' )
            await waitAndClick( '.topic-item.bold>div[data-automation="java"]', newPage )
            await waitAndClick('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', newPage )
            await waitAndClick('input[type="checkbox"]', newPage )
            await typeAnswer( 'input[type="checkbox"]', codeObj.answer[0] , newPage)
            await newPage.keyboard.down('Control')
            await newPage.keyboard.down('A', { delay : 100 } )
            await newPage.keyboard.down('X',)
            await newPage.keyboard.up('Control')
            await waitAndClick('.monaco-editor.no-user-select.vs', newPage )
            await newPage.keyboard.down('Control')
            await newPage.keyboard.down('A', { delay : 100 } )
            await newPage.keyboard.down('V', { delay : 100 } )
            await newPage.keyboard.up('Control')
            await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', newPage )


    } catch (error) {
        console.log( error )
    }
})()

async function waitAndClick( selector, currTab ){
    try {
        await currTab.waitForSelector(selector)
        return await currTab.click(selector)
    } catch (error) {
        console.log( error )
    }
}

async function typeAnswer( selector , answer, newPage  ){
    try {
        await waitAndClick( selector, newPage )
        let type = await newPage.type(selector, answer)
        return type;
    } catch (error) {
        console.log( error )
    }
}
            
            console.log('i"m first')


            // browserP.then( function(newTab){
            //     let pages = newTab.pages()
            //     return pages;
            // }).then( function( b ){
            //     currTab = b[0]
            //     let tab = currTab.goto(url)
            //     return tab;
            // }).then( function(){
            //     let selector = currTab.waitForSelector('#input-1', { visible : true })
            //     return selector
            // }).then( function(){
            //     let login = currTab.type('#input-1', email )
            //     return login
            // }).then( function(){
            //     let selector = currTab.waitForSelector('#input-2', { visible : true })
            //     return selector
            // }).then( function(){
            //     let passcode = currTab.type('#input-2', pass ) 
            //     return passcode
            // }).then( function(){
            //     let loginbtn = currTab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled')
            //     return loginbtn;
            // }).then(()=> { 
            //     let java = waitAndClick( '.topic-item.bold>div[data-automation="java"]', currTab )
            //     return java;
            // }).then( ()=>{
            //     let clickOnSolve = waitAndClick('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', currTab )
            //     return clickOnSolve;
            // }).then( ()=>{
            //     let clickOnCustom = waitAndClick('input[type="checkbox"]', currTab )
            //     return clickOnCustom
            // }).then( ()=>{
            //     let typeInCustom = typeAnswer( 'input[type="checkbox"]', codeObj.answer[0] )
            //     return typeInCustom
            // }).then( ()=>{
            //     let ctrlPress = currTab.keyboard.down('Control')
            //     return ctrlPress;
            // }).then( ()=>{
            //     let APress = currTab.keyboard.down('A', { delay : 100 } )
            //     return APress;
            // }).then( ()=>{
            //     let XPress = currTab.keyboard.down('X',)
            //     return XPress;
            // }).then( ()=>{
            //     let Unpress = currTab.keyboard.up('Control')
            //     return Unpress;
            // }).then( ()=>{
            //     let clickEditor = waitAndClick('.monaco-editor.no-user-select.vs', currTab )
            //     return clickEditor;
            // }).then( ()=>{
            //     let ctrlPress = currTab.keyboard.down('Control')
            //     return ctrlPress;
            // }).then( ()=>{
            //     let APress = currTab.keyboard.down('A', { delay : 100 } )
            //     return APress;
            // }).then( ()=>{
            //     let vPress = currTab.keyboard.down('V', { delay : 100 } )
            //     return vPress;
            // }).then( ()=>{
            //     let Unpress = currTab.keyboard.up('Control')
            //     return Unpress;
            // }).then( ()=>{
            //     let submit = waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', currTab )
            //     return submit
            // }).catch( function(err){
            //     console.log(err);
            // })