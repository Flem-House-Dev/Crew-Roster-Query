const inquirer = require('inquirer');

const promptUpdateEmployeeRoll = () => {

    return inquirer
    .prompt(
        [{
            type: 'input',
            name: 'updateEmployeeRoll',
            message: 'Enter the name of the Employee you would like to update--',
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
        // add sql code to update Employee
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt could not be rendered in the current environment");
        } else {
            console.log("something else went wrong");
        }
    });
};

module.exports = promptUpdateEmployeeRoll;