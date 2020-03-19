const Manager = require("./class/Manager");
const Engineer = require("./class/Engineer");
const Intern = require("./class/Intern");
const inquirer = require("inquirer");
const fs = require("fs");
const render = require("./htmlRender");
const idArr = [];
const employees = [];
function appMenu(){
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function createManager(){
        console.log("Please build your team!");
        inquirer.prompt([
            {
                type:"input",
                name: "managerName",
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your manager's id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    if (!validateEmail(answer)) {
                        return "Invalid email! Please try again."
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number"
            }
        ]).then(userInput => {
            const manager = new Manager(userInput.managerName, userInput.managerID, userInput.managerEmail, userInput.managerOfficeNumber);
            employees.push(manager);
            idArr.push(userInput.managerID);
            createTeam();
        });
    }
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "none"
                ]
            }
        ]).then(unserChoice => {
            switch(unserChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                        addIntern();
                        break;
                        default:
                            buildTeam();
            }
        });
    }
    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your engineer's id?",
                validate: answer => {
                    if(idArr.includes(answer)) {
                        return "This ID is taken. Please enter a different id.";
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    if (!validateEmail(answer)) {
                        return "Invalid email! Please try again."
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github username?"
            }
        ]).then(userInput => {
            const engineer = new Engineer(userInput.engineerName, userInput.engineerID, userInput.engineerEmail, userInput.engineerGithub);
            employees.push(engineer);
            idArr.push(userInput.engineerID);
            createTeam();
        });
    }
    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your inter's name?"
            },
            {
                type: "input",
                name: "internID",
                message: "What is your inter's id?",
                validate: answer => {
                    if (idArr.includes(answer)){
                        return "This is is taken. Please enter a different id.";
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "what is your intern's email?",
                validate: answer => {
                    if (!validateEmail(answer)) {
                        return "Invalid email! Please try again."
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?"
            }
        ]).then(userInput => {
            const intern = new Intern(userInput.internName, userInput.internID, userInput.internEmail, userInput.internSchool);
            employees.push(intern);
            idArr.push(userInput.internID);
            createTeam();
        });
    }
    function buildTeam(){
        fs.writeFile("./index.html", render(employees), function(err) {
            if (err) {
                return err;
            }
        });
    }
    createManager();
}
appMenu();