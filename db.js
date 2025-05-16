const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: '192.168.2.110',
    database: 'dbifin',
    password: 'Ym3.1TkP',
    port: 5432,
});
module.exports = pool;
