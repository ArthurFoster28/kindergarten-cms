require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./backend/db/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Раздаем папку frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// --- Роуты API ---

// Вход для администратора
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Вход выполнен!' });
    } else {
      res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Заявка с главной страницы
app.post('/api/applications', async (req, res) => {
  const { parentName, phone, childAge, childName, email } = req.body;
  try {
    await pool.query(
      'INSERT INTO applications (parent_name, phone, child_age, child_name, email) VALUES ($1, $2, $3, $4, $5)',
      [parentName, phone, childAge, childName, email]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});