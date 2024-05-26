const { Pool } = require('pg');

const pool = new Pool(
  {
    user: 'postgres',
    password: '63712em',
    host: 'localhost',
    database: 'crew_roster_db'
  }
);

pool.connect(() => {
  console.log("pool connected");
});

module.exports = pool;