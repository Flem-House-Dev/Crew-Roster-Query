const inquirer = require('inquirer');
const mainMenuQuestions = require('./mainMenuQuestions')
const pg = require('pg');
// const { Pool } = require('pg');
const pool = require('../utils/pool');
const promptAddDept = require('./promptAddDept');
const promptAddEmployee = require('./promptAddEmployee');
const promptAddRole = require('./promptAddRoll');
const promptUpdateEmployeeRole = require('./promptUpdateEmployeeRole');


// ------------ Main menu prompt ------------

async function promptMainMenu() {

  return inquirer
    .prompt(mainMenuQuestions)
    .then(async (answers) => {

      switch (answers.mainMenu) {
        case 'View All Departments':
          try {
            const { rows } = await pool.query('SELECT * FROM department');
            console.log(rows);
            console.log('---------------------');
            ReturnToMainMenu();
          } catch (err) {
            console.log("Error executing query", err);
          }
          break;
        case 'View All Roles':
          try {
            const { rows } = await pool.query('SELECT * FROM role');
            console.log(rows);
            console.log('---------------------');
            ReturnToMainMenu();
          } catch (err) {
            console.log("Error executing query", err);
          }
          break;
        case 'View All Employees':
          try {
            const { rows } = await pool.query('SELECT * FROM employee');
            console.log(rows);
            console.log('---------------------');
            ReturnToMainMenu();
          } catch (err) {
            console.log("Error executing query", err);
          }
          break;

        case 'Add a Department':
          try {
            await promptAddDept();
          } catch (err) {
            console.log("Error handling query", err);
          }
          break;

        case 'Add a Roll':
          try {
            await promptAddRole();
          } catch (err) {
            console.log("Error handling query", err);
          }
          break;

        case 'Add an Employee':
          try {
            await promptAddEmployee();
          } catch (err) {
            console.log("Error handling query", err);
          }
          break;

        case 'Update an Employee Role':
          try {
            await promptUpdateEmployeeRole();
          } catch (err) {
            console.log("Error handling query", err);
          }
          break;

        case 'Quit':
          
          await pool.end();
          

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

// ---------- Return to main menu prompt

async function ReturnToMainMenu() {

  return inquirer
      .prompt(
          [{
              type: 'confirm',
              name: 'returnToMain',
              message: 'Would you like to make another inquiry?',
          }]
      )
      .then(async (answers) => {
          try {
           if (answers.returnToMain === true) {
              await promptMainMenu();
              console.log("returning to main");
           } else {
              console.log('Ending query.');
           }}
          catch (err) {
              console.log("Error executing query", err);
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