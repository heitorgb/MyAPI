const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'seu banco',
    password: 'sua senha',
    port: 5432,
});
module.exports = pool;
