const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddDept() {

    return inquirer
        .prompt(
            [{
                type: 'input',
                name: 'addDept',
                message: 'Enter the name of the Department you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Department name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            }]
        )
        .then(async (answers) => {
            try {
                console.log(answers.addDept);
                await pool.query(`INSERT INTO department (name) VALUES ('${answers.addDept}')`);
            }
            catch (err) {
                console.log("Error executing query", err);
            }
        })
        .then (() => {
            ReturnToMainMenu();
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt could not be rendered in the current environment");
            } else {
                console.log("something else went wrong");
            }
        });
};

module.exports = promptAddDept;