const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddEmployee() {

    // ------- Update prompt lists of current roles and managers -------
    const currentRolesQuery = await pool.query('SELECT title FROM role');
    const roles = currentRolesQuery.rows;
    const roleTitles = [];
    for (const role of roles) { roleTitles.push(role.title) };

    const currentManagersQuery = await pool.query('SELECT rank, last_name FROM employee');
    const managers = currentManagersQuery.rows;
    const managerNames = managers.map(manager => `${manager.rank}. ${manager.last_name}`);
    // const managers = currentManagersQuery.rows;
    // const managerNames = [];

    managerNames.push({ value: null, name: "None" });
    for (const manager of managers) managerNames.push(manager.last_name);

    // -- Prompts for adding employee --
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'addEmployeeFirstName',
                message: 'Enter the first name of the Employee you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Employee name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'addEmployeeLastName',
                message: 'Enter the last name of the Employee you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Employee name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'addEmployeeRank',
                message: 'Select the rank of the Employee you would like to add--',
                choices: [
                    'Cpt',
                    'Cdr',
                    'LtCdr',
                    'Lt',
                    'LtJg',
                    'Ens'
                ]
            },
            {
                type: 'list',
                name: 'addEmployeeRole',
                message: 'Enter the role of the Employee you would like to add--',
                choices: roleTitles
            },
            {
                type: 'list',
                name: 'addEmployeeManager',
                message: "Enter the name of the Employee's manager--",
                choices: managerNames
            }
        ])
        .then(async (answers) => {

            // -------- Handling prompt answers
            try {

                // -- Get role_id of role title of answer
                const roleResult = await pool.query(`SELECT id FROM role WHERE title = $1`, [answers.addEmployeeRole]);
                const roleId = roleResult.rows[0].id;

                // -- Get manager id of manager name of answer

                const answerName = answers.addEmployeeManager;
                const answerNameSplit = answerName.split('. ')

                const managerResult = await pool.query(`SELECT id FROM employee WHERE last_name = $1`, [answerNameSplit[1]]);
                const managerId = managerResult.rows[0]?.id;

                // -- Add answer values to database
                await pool.query(`INSERT INTO employee (last_name, first_name, rank, role_id, manager_id)
                                 VALUES ($1, $2, $3, $4, $5)`, [
                    answers.addEmployeeLastName,
                    answers.addEmployeeFirstName,
                    answers.addEmployeeRank,
                    roleId,
                    managerId
                ]);
                console.log('---------------------');
                console.log("Employee has been successfully added.");
                console.log('---------------------');
            } catch (err) {
                console.error('Error inserting employee', err);
            }
        })
        .catch((err) => {
            if (err.isTtyError) {
                console.log("Prompt could not be rendered in the current environment");
            } else {
                console.log("something else went wrong", err);
            }
        });
};

module.exports = promptAddEmployee;