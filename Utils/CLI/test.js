import path from "path";
import figlet from "figlet";
import chalk from "chalk";
import url from 'url';
import inquirer from 'inquirer';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const dirs = fs.readdirSync( __dirname );
// dirs.forEach(  ( file ) => {  console.log( file )} );

// const choices = Array.apply(0, new Array(26)).map((x, y) =>
//   String.fromCharCode(y + 65)
// );
// choices.push("Multiline option 1\n  super cool feature \n  more lines");
// choices.push("Multiline option 2\n  super cool feature \n  more lines");
// choices.push("Multiline option 3\n  super cool feature \n  more lines");
// choices.push("Multiline option 4\n  super cool feature \n  more lines");
// choices.push("Multiline option 5\n  super cool feature \n  more lines");
// choices.push(new inquirer.Separator());
// choices.push("Multiline option \n  super cool feature");
// choices.push({
//   name: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
//   value: "foo",
//   short: "The long option",
// });


const extensionArray = [ '.txt', '.srt', '.mp4', '.mp3' ];

async function askQuestion(){
    // const answer = await inquirer.prompt([
    //   {
    //       type: 'input',
    //       name: 'person_first_name',
    //       message: 'What is your FirstName? ',
    //       default(){
    //           return 'FirstName'
    //       },
    //   },
    //   {
    //       type: 'input',
    //       name: 'person_last_name',
    //       message: 'Enter your last-Name'
    //   },
    //     {
    //       type: "list",
    //       name: "theme",
    //       message: "What do you want to do?",
    //       choices: [
    //         "Order a pizza",
    //         "Make a reservation",
    //         new inquirer.Separator(),
    //         "Ask for opening hours",
    //         {
    //           name: "Contact support",
    //           disabled: "Unavailable at this time",
    //         },
    //         "Talk to the receptionist",
    //       ],
    //     },
    //     {
    //       type: "list",
    //       name: "size",
    //       message: "What size do you need?",
    //       choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
    //       filter(val) {
    //         return val.toLowerCase();
    //       },
    //     },
    //     {
    //       type: "list",
    //       loop: false,
    //       name: "letter",
    //       message: "What's your favorite letter?",
    //       choices,
    //     },
    //     {
    //       type: "checkbox",
    //       name: "name",
    //       message: "Select the letter contained in your name:",
    //       choices,
    //     },
    //   {
    //     type: "checkbox",
    //     message: `Select the extension's you want`,
    //     name: "Selected_extension",
    //     choices: extensionArray.map((e) => {
    //       return {
    //         name: e,
    //       };
    //     }),
    //     validate(answer) {
    //       if (answer.length < 1) {
    //         return "you must choose at least one topping.";
    //       }
    //       return true;
    //     },
    //   },
    // {
    //     type: 'input',
    //     name: 'FoldersToBeSkipped',
    //     message: 'Enter the names of folder"s you wanna skip',
    //     default(){
    //         return 'node_modules,.git'
    //     }

    // }
    // ]);
    // const selectedExtension = answer.FoldersToBeSkipped;


    // figlet.fonts(function (err, fonts) {
    //   if (err) {
    //     console.log("something went wrong...");
    //     console.dir(err);
    //     return;
    //   }
    //   console.dir(fonts);
    // });
}

askQuestion();
