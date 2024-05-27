const inquirer = require('inquirer');
const pool = require('../utils/pool');
const mainMenuQuestions = require('./mainMenuQuestions')

// -- Import prompts --
const promptAddDept = require('./promptAddDept');
const promptAddEmployee = require('./promptAddEmployee');
const promptAddRole = require('./promptAddRoll');
const promptUpdateEmployeeRole = require('./promptUpdateEmployeeRole');
const promptViewAllDepartments = require('./promptViewAllDepartments');
const promptViewAllRoles = require('./promptViewAllRoles');
const promptViewAllEmployees = require('./promptViewAllEmployees');

// ------------ Main menu prompt ------------

async function promptMainMenu() {

  return inquirer
    .prompt(mainMenuQuestions)
    .then(async (answers) => {

      switch (answers.mainMenu) {
        case 'View All Departments':
          await promptViewAllDepartments();
          await promptMainMenu();
          break;

        case 'View All Roles':
          await promptViewAllRoles();
          await promptMainMenu();
          break;

        case 'View All Employees':
          await promptViewAllEmployees();
          await promptMainMenu();
          break;

        case 'Add a Department':
          await promptAddDept();
          await promptMainMenu();
          break;

        case 'Add a Roll':
          await promptAddRole();
          await promptMainMenu();
          break;

        case 'Add an Employee':
          await promptAddEmployee();
          await promptMainMenu();
          break;

        case 'Update an Employee Role':
          await promptUpdateEmployeeRole();
          await promptMainMenu();
          break;

        case 'Quit':
          console.log('Exiting query.');
          process.exit();
        default:
          console.log("we're getting there");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt could not be rendered in the current environment");
      } else {
        console.log("something else went wrong", error);
      }
    });
};

module.exports = promptMainMenu;