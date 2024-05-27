const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptUpdateEmployeeRole() {

    // ------- Update prompt lists of current employees and roles -------

    const currentEmployeesQuery = await pool.query('SELECT rank, last_name FROM employee');
    const employees = currentEmployeesQuery.rows;
    const employeeNames = employees.map(employee => `${employee.rank}. ${employee.last_name}`);

    const currentRolesQuery = await pool.query('SELECT title FROM role');
    const roles = currentRolesQuery.rows;
    const roleTitles = [];
    for (const role of roles) { roleTitles.push(role.title) };

    // -- Prompts for updating employee role --
    return inquirer
        .prompt(
            [{
                type: 'list',
                name: 'employeeName',
                message: 'Select the employee you would like to update--',
                choices: employeeNames
            },
            {
                type: 'list',
                name: 'updateEmployeeRole',
                message: 'Select the employees new role --',
                choices: roleTitles
            }
            ])
        .then(async (answers) => {

            // -------- Handling prompt answers
            try {
                // -- Add answer values to database
                const roleResult = await pool.query(`SELECT id FROM role WHERE title = $1`, [answers.updateEmployeeRole]);
                const roleId = roleResult.rows[0]?.id;
                console.log(roleId);

                const answerName = answers.employeeName;
                const answerNameSplit = answerName.split('. ')
                await pool.query('UPDATE employee SET role_id = $1 WHERE last_name = $2', [roleId, answerNameSplit[1]]);
                console.log('---------------------');
                console.log('Employee role has been successfully updated.')
                console.log('---------------------');
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