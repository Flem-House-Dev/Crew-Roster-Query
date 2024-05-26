const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddRole() {

    // ------- Update the list of current departments -------
    const currentDeptsQuery = await pool.query('SELECT name FROM department');
    const depts = currentDeptsQuery.rows;

    const deptNames = [];
    for (const dept of depts) {
        deptNames.push(dept.name);
    }

    // ------- Prompts -------
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRollName',
                message: 'Enter the name of the Roll you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Roll name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRollSalary',
                message: 'Enter the salary of the Roll you would like to add--',
                validata: (answer) => {
                    if (answer === "" || answer === NaN) {
                        return "Invalid entry. Please enter a valid number. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'addRollDept',
                message: 'Select the dapartment that the new role belongs to--',
                choices: deptNames
            }
        ]
        )
        .then(async (answers) => {
            // add sql code to add Roll

        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt could not be rendered in the current environment");
            } else {
                console.log("something else went wrong");
            }
        });
};

module.exports = promptAddRole;