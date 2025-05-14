const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dbdesenvolvimento',
    password: 'Ym3.1TkP',
    port: 5432,
});
module.exports = pool;