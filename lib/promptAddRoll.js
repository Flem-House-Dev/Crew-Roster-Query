const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddRole() {

    // ------- Update prompt list of current departments -------
    const currentDeptsQuery = await pool.query('SELECT name FROM department');
    const depts = currentDeptsQuery.rows;

    const deptNames = [];
    for (const dept of depts) {
        deptNames.push(dept.name);
    }

    // -- Prompts for adding role --

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'addRollTitle',
                message: 'Enter the title of the Roll you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Roll title. Or, you may exit the query at any time by typing 'ctr + c'";
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

            // -------- Handling prompt answers
            try {

                // -- Get role_id of role title from of answer
                const deptResult = await pool.query('SELECT id FROM department WHERE name = $1', [answers.addRollDept]);
                const deptId = deptResult.rows[0]?.id;

                // --Add answer values to database
                await pool.query(`INSERT INTO role (title, salary, department)
                                  VALUES ($1, $2, $3)`, [
                    answers.addRollTitle,
                    answers.addRollSalary,
                    deptId
                ]);
                console.log('---------------------');
                console.log('Role has been successfully added.');
                console.log('---------------------');
            } catch (err) {
                console.error('Error inserting role', err);
            }
        })
        .catch((err) => {
            if (err.isTtyError) {
                console.log("Prompt could not be rendered in the current environment", err);
            } else {
                console.log("something else went wrong", err);
            }
        });
};

module.exports = promptAddRole;