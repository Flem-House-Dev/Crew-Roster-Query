const pool = require('../utils/pool');

async function promptViewAllEmployees() {
    try {
        // Query to view employees
        const query = `SELECT e.last_name, e.first_name, e.rank, r.title, m.last_name AS manager_name 
                       FROM employee e 
                       JOIN role r ON e.role_id = r.id
                       LEFT JOIN employee m ON e.manager_id = m.id`

        const { rows } = await pool.query(query);
        console.table(rows);
        console.log('---------------------');
    } catch (err) {
        console.log("Error executing query", err);
    };
};

module.exports = promptViewAllEmployees;