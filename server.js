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

// ==========================================
// API АВТОРИЗАЦИИ И ЗАЯВОК
// ==========================================

// Вход
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      // Если нашли в таблице admins - отправляем роль admin
      res.json({ success: true, message: 'Вход выполнен!', role: 'admin' });
    } else {
      // Здесь позже можно добавить проверку родителей по другой таблице
      res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Заявки с главной страницы
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

// ==========================================
// API АДМИН-ПАНЕЛИ (CRUD Операции)
// ==========================================

// --- СОБЫТИЯ ---
app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY id DESC');
    // Переименовываем колонки из БД для совместимости с вашим JS-кодом
    const formattedEvents = result.rows.map(e => ({
      ...e,
      date: e.event_date,
      time: e.event_time,
      fullDescription: e.full_description
    }));
    res.json(formattedEvents);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Получить ОДНО событие для редактирования
app.get('/api/events/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      const event = result.rows[0];
      // Переименовываем ключи для совместимости с вашим admin.js
      res.json({
        ...event,
        date: event.event_date,
        time: event.event_time
      });
    } else {
      res.status(404).json({ error: 'Событие не найдено' });
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/events', async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const full_description = req.body.full_description || 'Описание не указано';
    const date = req.body.date;
    const time = req.body.time;
    const location = req.body.location;
    const image = req.body.image;

    await pool.query(
      'INSERT INTO events (title, description, full_description, event_date, event_time, location, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [title, description, full_description, date, time, location, image]
    );
    
    res.json({ success: true });
  } catch (err) { 
    console.error('Ошибка сохранения события:', err.message);
    res.status(500).json({ error: err.message }); 
  }
});

app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, full_description, date, time, location, image } = req.body;
  try {
    await pool.query(
      'UPDATE events SET title=$1, description=$2, full_description=$3, event_date=$4, event_time=$5, location=$6, image=$7 WHERE id=$8',
      [title, description, full_description, date, time, location, image, id]
    );
    res.json({ success: true });
  } catch (err) { 
    console.error('Ошибка обновления события:', err.message);
    res.status(500).json({ error: err.message }); 
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ПЕРСОНАЛ ---
app.get('/api/staff', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff ORDER BY id DESC');
    // Переименовываем колонку photo в image для совместимости с вашим JS
    const staffWithImage = result.rows.map(s => ({ ...s, image: s.photo }));
    res.json(staffWithImage);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Получить ОДНОГО сотрудника для редактирования
app.get('/api/staff/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM staff WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      const person = result.rows[0];
      res.json({ ...person, image: person.photo }); // Переименовываем для админки
    } else {
      res.status(404).json({ error: 'Сотрудник не найден' });
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/staff', async (req, res) => {
  const { name, position, bio, experience, qualifications, image } = req.body;
  try {
    await pool.query('INSERT INTO staff (name, position, bio, experience, qualifications, photo) VALUES ($1, $2, $3, $4, $5, $6)',
    [name, position, bio, experience, qualifications, image]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Обновление сотрудника
app.put('/api/staff/:id', async (req, res) => {
  const { id } = req.params;
  const { name, position, bio, experience, qualifications, image } = req.body;
  try {
    await pool.query('UPDATE staff SET name=$1, position=$2, bio=$3, experience=$4, qualifications=$5, photo=$6 WHERE id=$7',
    [name, position, bio, experience, qualifications, image, id]);
    res.json({ success: true });
  } catch (err) { 
    console.error('Ошибка обновления сотрудника:', err.message);
    res.status(500).json({ error: err.message }); 
  }
});

app.delete('/api/staff/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM staff WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- УСЛУГИ ---
app.get('/api/pricing', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pricing ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Получить ОДНУ услугу для редактирования
app.get('/api/pricing/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pricing WHERE id = $1', [req.params.id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Услуга не найдена' });
    }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/pricing', async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    await pool.query('INSERT INTO pricing (name, description, price, category) VALUES ($1, $2, $3, $4)',
    [name, description, price, category]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Обновление услуги
app.put('/api/pricing/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  try {
    await pool.query('UPDATE pricing SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5',
    [name, description, price, category, id]);
    res.json({ success: true });
  } catch (err) { 
    console.error('Ошибка обновления услуги:', err.message);
    res.status(500).json({ error: err.message }); 
  }
});

app.delete('/api/pricing/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pricing WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- АДМИНИСТРАТОРЫ ---
app.get('/api/admins', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM admins ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/admins', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await pool.query('INSERT INTO admins (username, password, email) VALUES ($1, $2, $3)',
    [username, password, email]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admins/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    // Если пароль не ввели при редактировании, оставляем старый
    if (password) {
      await pool.query('UPDATE admins SET username=$1, password=$2, email=$3 WHERE id=$4', [username, password, email, id]);
    } else {
      await pool.query('UPDATE admins SET username=$1, email=$2 WHERE id=$3', [username, email, id]);
    }
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/admins/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM admins WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});