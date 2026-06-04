const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',         // ваш пользователь pgAdmin
  host: 'localhost',
  database: 'kindergarten_db', // название вашей БД
  password: 'Swagin16823',   // !!! ВАШ ПАРОЛЬ ОТ PGADMIN !!!
  port: 5432,
});

module.exports = pool;