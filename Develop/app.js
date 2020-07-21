const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

async function init() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message:'Enter the manager\'s name: ',
            validate: function(name) {
                if(name.trim() === '') {
                    console.log('Name is required.')
                    return false;
                }

                return true;
            }
        },
        {
            type: 'input',
            name:'id',
            message:'Enter the manager\'s id: ',
        },
        {
            type: 'input',
            name:'email',
            message:'Enter the manager\'s email: ',
        },
        {
            type: 'input',
            name:'officeNumber',
            message:'Enter the manager\'s office number: ',
        },
    ]);

    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
    determineChoice();
}
 init();

 async function determineChoice() {
    //  ask whether they want to add and intern, engineer or done
    const answers = await inquirer.prompt({
        type: 'list',
        choices:['intern', 'engineer', 'done'],
        name: 'choice',
        message: 'Select one of the following: ',
    })

    if(answers.choice === 'intern') {
        createIntern();
        
    }
    if(answers.choice === 'engineer') {
        createEngineer();
        
    }
    if (answers.choice === 'done') {
        createHTML();
    }
 }

 async function createIntern() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message:'Enter the Intern\'s name: ',
        },
        {
            type: 'input',
            name:'id',
            message:'Enter the Intern\'s id: ',
        },
        {
            type: 'input',
            name:'email',
            message:'Enter the Intern\'s email: ',
        },
        {
            type: 'input',
            name:'school',
            message:'Enter the intern\'s school: ',
        },
    ]);

    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    createHTML();
 }

 async function createEngineer() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message:'Enter the Engineer\'s name: ',
        },
        {
            type: 'input',
            name:'id',
            message:'Enter the Engineer\'s id: ',
        },
        {
            type: 'input',
            name:'email',
            message:'Enter the Engineer\'s email: ',
        },
        {
            type: 'input',
            name:'github',
            message:'Enter the Engineer\'s GitHub: ',
        },
    ]);

    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    createHTML();
}

async function createHTML() {
    console.log('output path is: ' , outputPath);
    console.log('team members are: ', teamMembers);
    fs.writeFileSync(outputPath, render(teamMembers));
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
