#!/usr/bin/env node

const arg = process.argv.slice(2);
const fs = require("fs");
const path = require("path");

const command = arg[0];
const argDir = arg[1] === undefined ? __dirname : arg[1];
const isOnlyDirs = arg[2];
const extensions = new Set();
const extension_arr = [];

switch (command) {
  case "test":
    console.log(process.argv);
    console.log(arg[1].split(","));
    break;
  case "tree":
    
    var txt_filePath = path.join(argDir, `${path.basename(argDir)}_tree.txt`);
    if( isOnlyDirs === '-d' ){
        fs.appendFileSync(txt_filePath, `--------------------\nDIRECTORY's\n--------------------\n`, "utf-8");
    }
    else{
        fs.appendFileSync( txt_filePath,`--------------------\nFILE's\n--------------------\n`,"utf-8");
    }
    displayTree(argDir, "", txt_filePath);

    extensions.forEach((e) => {
      fs.appendFileSync(txt_filePath, `Extensions -> ${e}\n`, "utf-8");
      extension_arr.push(e);
    });

    console.log(extension_arr);
    console.log(
      `Saved the tree in -> ${txt_filePath}`,
      path.basename(argDir)
    );
    break;
  case "cleanup":
    break;
  case "help":
    console.log(
      `└──file-orgy tree "DIRNAME" / file-orgy tree\n└──file-orgy cleanup "DIRNAME"\n└──file-orgy help `
    );
    break;
  default:
    console.log(
      "<----------------------- PLEASE INPUT THE RIGHT COMMAND TRY USING ----------------------->"
    );
    console.log("├──file-orgy help");
    break;
}

// const srt_regex = /\.jpg$/;
// const html_regex = /\.mp4$/;

// const toBeRemoved = [];
// let subdirs = ["jpg", "mp4"];

// console.log(__dirname);

// // DIR THAT I WANT TO CLEAN UP
// const dest_dir = path.join("/mnt", "e", "insta save");

// // ADDING SUBDIRS AT THE TOP LEVEL
// subdirs.forEach((ele) => {
//   const subdir_path = path.join(dest_dir, `delete_me_${ele}`);
//   if (!fs.existsSync(subdir_path)) {
//     fs.mkdirSync(subdir_path);
//   }
// });

// // TO LOG ITEMS THAT HAVE BEEN MOVED
// setTimeout(() => {
//   console.log(toBeRemoved);
// }, 2000);

// const removeJunk = (dir) => {
//   fs.readdir(dir, (err, files) => {
//     if (err) {
//       console.log(err.message);
//     }
//     files.forEach( (file) => {
//       let src_path = path.join(dir, file);
//       if (fs.statSync(src_path).isDirectory()) {
//         if (
//           file === "delete_me_jpg" ||
//           file === "delete_me_mp4" ||
//           file === "GYM" ||
//           file === "OTHERS" ||
//           file === "M"
//         ) {
//           console.log("NOT GONNA GO INSIDE -> ", file);
//         } else {
//           console.log("DIR -> ", src_path);
//           removeJunk(src_path);
//         }
//       }

//       if (srt_regex.test(file)) {
//         let toBeMovedDir = path.join(dest_dir, "delete_me_jpg", file );
//         fs.rename(src_path, toBeMovedDir, (err) => {
//           console.log(err);
//         });
//         toBeRemoved.push(file);
//       }
//       if (html_regex.test(file)) {
//         let toBeMovedDir = path.join(dest_dir, "delete_me_mp4", file) ;
//         fs.rename(src_path, toBeMovedDir, (err) => {
//           console.log(err);
//         });
//         toBeRemoved.push(file);
//       }
//     });
//   });
// };

// removeJunk(dest_dir);

function displayTree(dir, indent = "", filePath) {
  if (fs.statSync(dir).isDirectory()) {
    // logic for DIRECTORY
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
      displayTree(subDirPath, indent + "|\t", filePath);
    });
  } else {
    if( isOnlyDirs !== '-d'){
        // logic for FILES
        let log = indent + "|--" + path.basename(dir) + "\n";
        fs.appendFileSync(filePath, log, "utf-8");
        console.log(indent + "|--" + path.basename(dir));
    
        // storing the type of file extension to the set
        extensions.add(path.extname(dir));
    }
  }
}