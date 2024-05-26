const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptUpdateEmployeeRole () {

       // ------- Update prompt lists of current employees and roles -------

       const currentEmployeesQuery = await pool.query('SELECT first_name, last_name FROM employee');
       const employees = currentEmployeesQuery.rows;
       const employeeNames = [];
       for (const employee of employees) {
        const { firstName, lastName } = employee;
         employeeNames.push({ firstName, lastName });
        };

       const currentRolesQuery = await pool.query('SELECT title FROM role');
       const roles = currentRolesQuery.rows;
       const roleTitles = [];
       for (const role of roles) {roleTitles.push(role.title)};

    // -- Prompts for updating employee role --
    return inquirer
    .prompt(
        [{
            type: 'selct',
            name: 'employeeName',
            message: 'Select the employee you would like to update--',
            choices: employeeNames
        },
        {
            type: 'input',
            name: 'updateEmployeeRole',
            message: 'Select the employees new role --',
            choices: roles
        }
    ])
    .then(async (answers) => {
        
        // -------- Handling prompt answers
        try {
            // -- Add answer values to database
            await pool.query('UPDATE employee SET role = $1 WHERE id = $2', [answers.employeeName, answers.updateEmployeeRole]);
        } catch (err) {
            console.error('Error updating employee role', err);
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt could not be rendered in the current environment");
        } else {
            console.log("something else went wrong");
        }
    });
};

module.exports = promptUpdateEmployeeRole;