const inquirer = require('inquirer');
const mainMenuQuestions = require('./mainMenuQuestions')
const pg = require('pg');
const promptAddDept = require('./promptAddDept');
const promptAddEmployee = require('./promptAddEmployee');
const promptAddRoll = require('./promptAddRoll');
const promptUpdateEmployeeRoll = require('./promptUpdateEmployeeRoll');

// ------------ Main menu prompt ------------

function promptMainMenu() {

  return inquirer
    .prompt(mainMenuQuestions)
    .then((answers) => {

      switch (answers.mainMenu) {
        case 'View All Departments':
          // add sql code to select all depts
          break;
        case 'View All Roles':
          // add sql code to select all roles
          break;
        case 'View All Employees':
          // add sql code to select all employees
          break;

        case 'Add a Department':
          promptAddDept();
          break;

        case 'Add a Roll':
          promptAddRoll();
          break;

        case 'Add an Employee':
          promptAddEmployee();
          break;

        case 'Update an Employee Role':
          promptUpdateEmployeeRoll();
          break;

        case 'Quit':
          // add code to exit program
          break;

        default:
          console.log("we're getting there");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt could not be rendered in the current environment");
      } else {
        console.log("something else went wrong");
      }
    });
}

module.exports = promptMainMenu;