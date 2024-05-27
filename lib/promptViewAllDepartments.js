const pool = require('../utils/pool');

async function promptViewAllDepartments() {
    try {
        const { rows } = await pool.query('SELECT * FROM department');
        const columnsToDIsplay = ['name'];
        console.table(rows, columnsToDIsplay);
        console.log('---------------------');
    } catch (err) {
        console.log("Error executing query", err);
    };
};

module.exports = promptViewAllDepartments;