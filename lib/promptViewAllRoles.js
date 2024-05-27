const pool = require('../utils/pool');

async function promptViewAllRoles() {
    try {
        
        const query = `SELECT r.title, r.salary, d.name AS department_name FROM role r JOIN department d ON r.department = d.id`
        const { rows } = await pool.query(query);
        const columnsToDIsplay = ['title', 'salary', 'department_name'];

        console.table(rows, columnsToDIsplay);
        console.log('---------------------');
    } catch (err) {
        console.log("Error executing query", err);
    };
};

module.exports = promptViewAllRoles;