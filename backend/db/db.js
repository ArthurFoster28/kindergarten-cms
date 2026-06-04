const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kindergarten_db', // ТОЧНО ТАК ЖЕ, КАК В PGADMIN!
  password: 'Swagin16823',
  port: 5432,
});

module.exports = pool;