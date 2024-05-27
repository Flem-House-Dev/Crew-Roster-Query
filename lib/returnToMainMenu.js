const inquirer = require('inquirer');
const promptMainMenu = require('./promptMainMenu');

async function ReturnToMainMenu() {

    return inquirer
        .prompt(
            [{
                type: 'confirm',
                name: 'returnToMain',
                message: 'Are you sure you want to quit?',
            }]
        )
        .then(async (answer) => {
            try {

                if (answer.returnToMain === true) {
                    // await promptMainMenu();
                } else {
                    
                }
            }
            catch (err) {
                console.log("Error executing query", err);
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

module.exports = ReturnToMainMenu;