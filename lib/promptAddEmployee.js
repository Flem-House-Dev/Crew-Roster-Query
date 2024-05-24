const inquirer = require('inquirer');

const promptAddEmployee = () => {

    return inquirer
        .prompt(
            [{
                type: 'input',
                name: 'addEmployee',
                message: 'Enter the name of the Employee you would like to add--',
                validata: (answer) => {
                    if (answer === "") {
                        return "Invalid entry. Please enter a Employee name. Or, you may exit the query at any time by typing 'ctr + c'";
                    }
                    else {
                        return true;
                    }
                }
            }]
        )
        .then((answers) => {
            // add sql code to add Employee
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt could not be rendered in the current environment");
            } else {
                console.log("something else went wrong");
            }
        });
};

module.exports = promptAddEmployee;