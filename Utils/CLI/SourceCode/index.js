#!/usr/bin/env node

// NPM PACKAGE'S
import chalk from 'chalk';
import figlet from 'figlet';


// NODE BUILT-IN's
import path from 'path';
import url from 'url';

// USER DEFINED MODULE
import displayTree from './display.Tree.js';
import cleanUp from "./moveFiles.js";

// WORK AROUND for __dirname and __filename because they are not available with esmodule's
const __filename = url.fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const arg = process.argv.slice(2);
const command = arg[0];
const argDir = arg[1] === "." ? process.cwd() : arg[1];
const isOnlyDirs = arg[2];

async function callFiglet(msg, color = chalk.bold.rgb(71, 44, 232)) {
  await figlet(msg, (err, data) => {
    if (err) {
      console.log("something went wrong with figlet");
      return;
    }
    console.clear();
    console.log( color(data) );
  });
}

switch (command) { 
  case "test":
    await callFiglet( 'Just For Testing Purpose')
    console.log( chalk.bold(process.argv) );
    if( arg[1] )
        console.log( arg[1].split(",") );
    break;

  case "tree":
    await callFiglet( `You've  summonned the  tree...`);
    var txt_filePath = path.join( argDir, `${path.basename(argDir)}_tree.txt`);
    displayTree(argDir, "", txt_filePath, isOnlyDirs );
    break;

  case "cleanup":
    await callFiglet("Wise Choice !!!!");
    cleanUp(argDir);
    break;

  case "help":
    await callFiglet("Help  is  here !!!!");
    const info = chalk.bold.greenBright
    console.log(
      info(
        `└──file-orgy <command> <dirname> [ flag ]\n --command [ test, tree, cleanup, help ]\n --dirname . ( to perform operation on cwd or absolute path )\n --flag [ -d ]\n\n└──file-orgy tree "dirname" / file-orgy tree .\n└──file-orgy cleanup "dirname" `
      )
    );
    break;

  default:
    await callFiglet('Type  the  following  U dumb fuckk ')
    console.log( chalk.bold.redBright("├──file-orgy help") );
    break;
}