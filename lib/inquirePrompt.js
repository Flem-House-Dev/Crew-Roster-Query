const inquirer = require('inquirer');
const mainMenuQuestions = require('./questions')
const pg = require('pg');

function promptMainMenu() {

  return inquirer
  .prompt(mainMenuQuestions)
  .then((answers) => {
    
    switch (answers.mainMenu)
    {
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
        // add sql code to add dept
        break;
      case 'Add a Roll':
        // add sql code to add dept
        break;
      case 'Add an Employee':
        // add sql code to add dept
        break;
      case 'Update an Employee Role':
        // add sql code to update role
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
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

module.exports = promptMainMenu;