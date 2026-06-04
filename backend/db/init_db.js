const pool = require('./db');

async function init() {
  try {
    // Таблица администраторов
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `);

    // Таблица заявок с главной страницы
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        parent_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        child_age INT NOT NULL,
        child_name VARCHAR(100),
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица мероприятий
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        event_date DATE,
        image VARCHAR(255)
      );
    `);

    // Таблица педагогов
    await pool.query(`
      CREATE TABLE IF NOT EXISTS staff (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        position VARCHAR(100) NOT NULL,
        description TEXT,
        photo VARCHAR(255)
      );
    `);

    // Добавляем тестового администратора (если его еще нет в БД)
    await pool.query(`
      INSERT INTO admins (username, password) 
      VALUES ('admin', '123456') 
      ON CONFLICT (username) DO NOTHING;
    `);

    console.log('✅ База данных успешно инициализирована! Таблицы созданы.');
    console.log('👤 Тестовый админ: логин - admin, пароль - 123456');
  } catch (err) {
    console.error('❌ Ошибка инициализации БД:', err);
  } finally {
    pool.end(); // Закрываем подключение к БД после выполнения скрипта
  }
}

init();