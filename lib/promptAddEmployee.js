const inquirer = require('inquirer');
const pool = require('../utils/pool');

async function promptAddEmployee() {

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
                choices: [
                    'Captain',
                    'First Officer',
                    'Chief Tactical Officer',
                    'Chief Engineer',
                    'Chief Operations Officer',
                    'Chief Medical Officer',
                    "Ship's Councelor"
                ]
            },
            {
                type: 'list',
                name: 'addEmployeeManager',
                message: "Enter the name of the Employee's manager--",
                choices: [
                    'Picard',
                    'Riker',
                    'Data',
                    'LaForge',
                    'Crusher',
                    'Troi',
                    'Yar',
                    'Worf'
                ]
            }
        ])
        .then(async (answers) => {
            
           try {
              
               const roleResult = await pool.query(`SELECT id FROM role WHERE title = $1`, [answers.addEmployeeRole]);
               const roleId = roleResult.rows[0]?.id;
               
               const managerResult = await pool.query(`SELECT id FROM employee WHERE last_name = $1`, [answers.addEmployeeManager]);
               const managerId = managerResult.rows[0]?.id;
               
               await pool.query(`INSERT INTO employee (last_name, first_name, rank, role_id, manager_id)
                                 VALUES ($1, $2, $3, $4, $5)`, [
                                   answers.addEmployeeFirstName,
                                   answers.addEmployeeLastName,
                                   answers.addEmployeeRank,
                                   roleId,
                                   managerId
                                 ]);
                                 console.log("Employee has been successfully added");
           } catch (err) {
            console.error('Error inserting employee', err);
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

module.exports = promptAddEmployee;