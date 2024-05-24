const mainMenuQuestions = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'Main menu-- Please select one of the following:',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Roll',
            'Add an Employee',
            'Update an Employee Role',
            'Quit'
        ], 
        default: 'View All Departments'
    }
];

module.exports = mainMenuQuestions;