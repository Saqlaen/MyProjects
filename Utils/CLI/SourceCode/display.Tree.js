import fs from "fs";
import path from "path";
import chalk from "chalk";
import figlet from "figlet";


let isOnlyDirs = undefined;
const extensions = new Set();
const extension_arr = [];

function findFilesAndFolders( dir, indent = "", filePath ) {

  // logic for DIRECTORY
  if( fs.statSync( dir ).isDirectory() ){
    let subDirs = fs.readdirSync(dir);
    let log = indent + "└──" + path.basename(dir) + "\n";
    
    fs.appendFileSync(filePath, log, "utf-8");
    console.log(indent + "└──" + path.basename(dir));
    
    subDirs.forEach((e) => {
      let subDirPath = path.join(dir, e);
      if (
        path.basename(dir) === "node_modules" ||
        path.basename(dir) === ".git"
      ) {
        return;
      }
      findFilesAndFolders(subDirPath, indent + "|\t", filePath);
    });

  } else {

    if (isOnlyDirs !== "-d"){
      // logic for FILES
      let log = indent + "|--" + path.basename(dir) + "\n";
      fs.appendFileSync(filePath, log, "utf-8");
      console.log(indent + "|--" + path.basename(dir));

      // storing the type of file extension to the set
      extensions.add( path.extname(dir) );
    }
  }
}

export default function displayTree( argDir, indent, txt_filePath, isOnlyDirArg ){

    isOnlyDirs = isOnlyDirArg;

    if( fs.existsSync( txt_filePath ) ){
        fs.unlinkSync( txt_filePath );
        console.log(
          chalk.yellowBright(
            `------------------ got rid of old -> ${path.basename(
              txt_filePath
            )} ------------------`
          )
        );
    }

    if (isOnlyDirs === "-d") {
      fs.appendFileSync(
        txt_filePath,
        `--------------------\nDIRECTORY's\n--------------------\n`,
        "utf-8"
      );
    } else {
      fs.appendFileSync(
        txt_filePath,
        `--------------------\nFILE's\n--------------------\n`,
        "utf-8"
      );
    }

    findFilesAndFolders( argDir, indent, txt_filePath );

    extensions.forEach( (e) => {
      fs.appendFileSync(txt_filePath, `Extensions -> ${e}\n`, "utf-8");
      extension_arr.push(e);
    });
    
    console.log( extension_arr );
    console.log( `Saved the tree in -> ${txt_filePath}`, path.basename(argDir) );
    figlet(`You  asked  only  ${ isOnlyDirArg ? 'DIRECTORY ': 'FILES '}!!!!`, (err, data) => {
      if (err) {
        console.log("something went wrong with figlet");
        return;
      }
      console.log(chalk.bold.rgb(235, 52, 79)(data));
    });
}