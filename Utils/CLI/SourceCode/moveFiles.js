// To-do's 
// clean up should take a path as input -> path is nessesary
// get all the type of extension's in that given path
// prompt the user which extension he want's to clean up 
// upon selected extension's we create a folder with extension name and move all the file's to that
// ask if you wanna skip any dir's then take that directory and skip

import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

const extensionArray = [];
const extensions = new Set();
let selectedExtension = [];
const tobeSkippedDirs = [ 'node_modules', '.git' ];
const movedToDirs = new Map();
const movedDirFiles = new Map();

const sleep = ( ms = 3000 ) => {
    return new Promise( (r) => {
        setTimeout( r, ms)
    } )
}

export default async function cleanUp( dest_dir ) {

  await prompt_for_dirsToBeSkipped();
  await prompt_for_selectingExtensions(dest_dir);
  const removeJunk = (dir) => {
      try{
          const files = fs.readdirSync( dir );
          for( const file of files ){
              let src_path = path.join(dir, file);
              if (fs.statSync(src_path).isDirectory() ) {
                  if (tobeSkippedDirs.indexOf(path.basename(src_path)) !== -1) {
                    console.log("NOT GONNA GO INSIDE -> ", src_path);
                    continue;
                  } else {
                    console.log("DIR -> ", src_path);
                    removeJunk(src_path);
                  }
              } else {
                  // MOVING THE FILE's
                  selectedExtension.forEach( (extName) => {
                    if (path.extname(file) === extName) {
                      const folderName = `delete${extName}`;
                      let toBeMovedDir = path.join(
                                                    dest_dir,
                                                    folderName ,
                                                    file
                                                );
                      fs.renameSync(src_path, toBeMovedDir, (err) => { console.log(err); });
                      if( movedDirFiles.has( folderName ) ){
                        const arr = movedDirFiles.get( folderName );
                        arr.push( toBeMovedDir );
                        movedDirFiles.set(folderName, [...arr] );
                      } else {
                        movedDirFiles.set( folderName, [ toBeMovedDir ] );
                      }
                      console.log( `MOVED ${path.basename( file )} FROM ${ path.basename( path.join( src_path, '../' ) )} TO ${ path.basename( path.join( toBeMovedDir, '../' ) ) } `)
                    }
                  });
              }
          };
      }
      catch( err ){
          console.error( err );
      }
  };
  removeJunk( dest_dir );
  await prompt_for_deletingExtFolders();
    
  await sleep();
  figlet(
      "You've  turned  chaos  into  order\nwell  done !!!!",
      (err, data) => {
        if (err) {
          console.log("something went wrong with figlet");
          return;
        }
        console.clear();
        console.log(chalk.bold.rgb(5, 242, 13)(data));
      }
    );

}

async function prompt_for_dirsToBeSkipped(){
    const answers = await inquirer.prompt({
      type: "input",
      name: "dirsToBeSkipped",
      message: `Enter the name of folder's you wanna skip other than defaults( node_modules, .git)`,
    });
    const tobeSkipped = answers.dirsToBeSkipped.split(',');
    tobeSkipped.forEach( e => { tobeSkippedDirs.push( e ) })
}

async function prompt_for_selectingExtensions( dest_dir ) {
  getExtensions(dest_dir);
  extensions.forEach((e) => {
    extensionArray.push(e);
  });

  const answers = await inquirer.prompt({
    type: "checkbox",
    message: `Select the extension's you want`,
    name: "selected_extension",
    choices: extensionArray.map((e) => {
      return {
        name: e,
      };
    }),
    validate(answer) {
      if (answer.length < 1) {
        return "you must choose at least one extension";
      }
      return true;
    },
  });

  selectedExtension = answers.selected_extension;

  // ADDING EXTENSION SUBDIRS AT THE TOP LEVEL
  selectedExtension.forEach((ele) => {
    const name = `delete${ele}`;
    const subdir_path = path.join(dest_dir, name);
    tobeSkippedDirs.push( name );
    movedToDirs.set( name, subdir_path );
    if (!fs.existsSync(subdir_path)) {
      fs.mkdirSync(subdir_path);
    }
  });
}

async function prompt_for_deletingExtFolders() {
    
    function getChoices(){
        const arr = [];
        movedToDirs.forEach( ( value, key ) => { arr.push(key) } );
        return arr;
    }
    
    const answers = await inquirer.prompt({
      type: "checkbox",
      message: `Select the folders you wanna delete`,
      name: "selectedForDelete",
      choices: getChoices(),
      validate(answer) {
        if (answer.length < 1) {
          return "you must choose at least one folder";
        }
        return true;
      },
    });

    const deleteThese = answers.selectedForDelete;
    // console.log( movedDirFiles.entries() )
    deleteThese.forEach( (e) => {
        const willGetDeleted = movedDirFiles.get( e );
        if( willGetDeleted.length > 0 ){
            for( let file of willGetDeleted ){
                const name = path.basename( file );
                if (fs.existsSync( file )) {
                  fs.unlinkSync( file );
                  console.log(chalk.bold.bgRedBright( name + " FILE DELETED!!"));
                } else {
                  console.log(chalk.bold.bgYellowBright("could not delete" + name));
                }
            }
        }
        const deleteDirPath = movedToDirs.get( e );
        if( fs.existsSync( deleteDirPath ) ){
            fs.rmdirSync( deleteDirPath );
            console.log(chalk.bold.bgRedBright( path.basename( deleteDirPath ) + " FOLDER DELETED!!"));
        }
    } );
}

function getExtensions( dir  ){
    let files = fs.readdirSync(dir);
    for( const ele of files ){
        let subDir = path.join( dir, ele );
        if( fs.statSync( subDir ).isDirectory() ){
            if (tobeSkippedDirs.indexOf(path.basename(subDir)) === -1 ){
                getExtensions(subDir);
            }
            else{
                continue;
            }
        }
        else {
            extensions.add( path.extname( subDir ) )
        }
    }
}

