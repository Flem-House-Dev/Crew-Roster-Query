const inquirer = require('inquirer');

const promptAddDept = () => {

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
        .then((answers) => {
            // add sql code to add department
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