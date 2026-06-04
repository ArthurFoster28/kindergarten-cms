const API_URL = 'http://localhost:3000/api';
// ========== ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ==========

function switchTab(tab) {
    // Скрыть все секции
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Показать выбранную секцию
    document.getElementById(tab + '-section').classList.add('active');
    
    // Обновить активное меню
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    
    // Загрузить данные
    if (tab === 'events') loadEvents();
    if (tab === 'staff') loadStaff();
    if (tab === 'pricing') loadPricing();
    if (tab === 'admins') loadAdmins();
}

// ========== СОБЫТИЯ ==========

async function loadEvents() {
    try {
        const response = await fetch(`${API_URL}/events`);
        const events = await response.json();
        
        const container = document.getElementById('events-list');
        container.innerHTML = '';
        
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Дата:</strong> ${event.date}</p>
                <p><strong>Время:</strong> ${event.time}</p>
                <p><strong>Место:</strong> ${event.location}</p>
                <p>${event.description.substring(0, 100)}...</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editEvent(${event.id})">✏️ Изменить</button>
                    <button class="btn-delete" onclick="deleteEvent(${event.id})">🗑️ Удалить</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки событий:', error);
    }
}

function openEventModal() {
    document.getElementById('event-id').value = '';
    document.getElementById('event-title').value = '';
    document.getElementById('event-description').value = '';
    document.getElementById('event-full-description').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
    document.getElementById('event-location').value = '';
    document.getElementById('event-image').value = '';
    
    openModal('event-modal');
}

async function editEvent(id) {
    try {
        const response = await fetch(`${API_URL}/events/${id}`);
        const event = await response.json();
        
        document.getElementById('event-id').value = event.id;
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-description').value = event.description;
        document.getElementById('event-full-description').value = event.full_description;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-time').value = event.time;
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-image').value = event.image;
        
        openModal('event-modal');
    } catch (error) {
        console.error('Ошибка загрузки события:', error);
    }
}

async function saveEvent(e) {
    e.preventDefault();
    
    const id = document.getElementById('event-id').value;
    const data = {
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        full_description: document.getElementById('event-full-description').value,
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        location: document.getElementById('event-location').value,
        image: document.getElementById('event-image').value
    };
    
    try {
        const url = id ? `${API_URL}/events/${id}` : `${API_URL}/events`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            closeModal('event-modal');
            loadEvents();
            alert('Событие успешно сохранено!');
        }
    } catch (error) {
        console.error('Ошибка сохранения события:', error);
        alert('Ошибка при сохранении!');
    }
}

async function deleteEvent(id) {
    if (confirm('Вы уверены?')) {
        try {
            const response = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadEvents();
                alert('Событие удалено!');
            }
        } catch (error) {
            console.error('Ошибка удаления события:', error);
            alert('Ошибка при удалении!');
        }
    }
}

// ========== ПЕРСОНАЛ ==========

async function loadStaff() {
    try {
        const response = await fetch(`${API_URL}/staff`);
        const staff = await response.json();
        
        const container = document.getElementById('staff-list');
        container.innerHTML = '';
        
        staff.forEach(person => {
            const card = document.createElement('div');
            card.className = 'staff-card';
            card.innerHTML = `
                <h3>${person.name}</h3>
                <p><strong>Должность:</strong> ${person.position}</p>
                <p><strong>Опыт:</strong> ${person.experience}</p>
                <p>${person.bio.substring(0, 100)}...</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editStaff(${person.id})">✏️ Изменить</button>
                    <button class="btn-delete" onclick="deleteStaff(${person.id})">🗑️ Удалить</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки персонала:', error);
    }
}

function openStaffModal() {
    document.getElementById('staff-id').value = '';
    document.getElementById('staff-name').value = '';
    document.getElementById('staff-position').value = '';
    document.getElementById('staff-bio').value = '';
    document.getElementById('staff-experience').value = '';
    document.getElementById('staff-qualifications').value = '';
    document.getElementById('staff-image').value = '';
    
    openModal('staff-modal');
}

async function editStaff(id) {
    try {
        const response = await fetch(`${API_URL}/staff/${id}`);
        const person = await response.json();
        
        document.getElementById('staff-id').value = person.id;
        document.getElementById('staff-name').value = person.name;
        document.getElementById('staff-position').value = person.position;
        document.getElementById('staff-bio').value = person.bio;
        document.getElementById('staff-experience').value = person.experience;
        document.getElementById('staff-qualifications').value = person.qualifications;
        document.getElementById('staff-image').value = person.image;
        
        openModal('staff-modal');
    } catch (error) {
        console.error('Ошибка загрузки сотрудника:', error);
    }
}

async function saveStaff(e) {
    e.preventDefault();
    
    const id = document.getElementById('staff-id').value;
    const data = {
        name: document.getElementById('staff-name').value,
        position: document.getElementById('staff-position').value,
        bio: document.getElementById('staff-bio').value,
        experience: document.getElementById('staff-experience').value,
        qualifications: document.getElementById('staff-qualifications').value,
        image: document.getElementById('staff-image').value
    };
    
    try {
        const url = id ? `${API_URL}/staff/${id}` : `${API_URL}/staff`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            closeModal('staff-modal');
            loadStaff();
            alert('Сотрудник успешно сохранен!');
        }
    } catch (error) {
        console.error('Ошибка сохранения сотрудника:', error);
        alert('Ошибка при сохранении!');
    }
}

async function deleteStaff(id) {
    if (confirm('Вы уверены?')) {
        try {
            const response = await fetch(`${API_URL}/staff/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadStaff();
                alert('Сотрудник удален!');
            }
        } catch (error) {
            console.error('Ошибка удаления сотрудника:', error);
            alert('Ошибка при удалении!');
        }
    }
}

// ========== УСЛУГИ ==========

async function loadPricing() {
    try {
        const response = await fetch(`${API_URL}/pricing`);
        const services = await response.json();
        
        const container = document.getElementById('pricing-list');
        container.innerHTML = '';
        
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'pricing-card';
            card.innerHTML = `
                <h3>${service.name}</h3>
                <p><strong>Категория:</strong> ${service.category}</p>
                <p><strong>Цена:</strong> ${service.price}</p>
                <p>${service.description.substring(0, 100)}...</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editPricing(${service.id})">✏️ Изменить</button>
                    <button class="btn-delete" onclick="deletePricing(${service.id})">🗑️ Удалить</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
    }
}

function openPricingModal() {
    document.getElementById('pricing-id').value = '';
    document.getElementById('pricing-name').value = '';
    document.getElementById('pricing-description').value = '';
    document.getElementById('pricing-price').value = '';
    document.getElementById('pricing-category').value = 'Основные услуги';
    
    openModal('pricing-modal');
}

async function editPricing(id) {
    try {
        const response = await fetch(`${API_URL}/pricing/${id}`);
        const service = await response.json();
        
        document.getElementById('pricing-id').value = service.id;
        document.getElementById('pricing-name').value = service.name;
        document.getElementById('pricing-description').value = service.description;
        document.getElementById('pricing-price').value = service.price;
        document.getElementById('pricing-category').value = service.category;
        
        openModal('pricing-modal');
    } catch (error) {
        console.error('Ошибка загрузки услуги:', error);
    }
}

async function savePricing(e) {
    e.preventDefault();
    
    const id = document.getElementById('pricing-id').value;
    const data = {
        name: document.getElementById('pricing-name').value,
        description: document.getElementById('pricing-description').value,
        price: document.getElementById('pricing-price').value,
        category: document.getElementById('pricing-category').value
    };
    
    try {
        const url = id ? `${API_URL}/pricing/${id}` : `${API_URL}/pricing`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            closeModal('pricing-modal');
            loadPricing();
            alert('Услуга успешно сохранена!');
        }
    } catch (error) {
        console.error('Ошибка сохранения услуги:', error);
        alert('Ошибка при сохранении!');
    }
}

async function deletePricing(id) {
    if (confirm('Вы уверены?')) {
        try {
            const response = await fetch(`${API_URL}/pricing/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadPricing();
                alert('Услуга удалена!');
            }
        } catch (error) {
            console.error('Ошибка удаления услуги:', error);
            alert('Ошибка при удалении!');
        }
    }
}

// ========== АДМИНИСТРАТОРЫ ==========

async function loadAdmins() {
    try {
        const response = await fetch(`${API_URL}/admins`);
        const admins = await response.json();
        
        const container = document.getElementById('admins-list');
        container.innerHTML = '';
        
        admins.forEach(admin => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            card.innerHTML = `
                <h3>${admin.username}</h3>
                <p><strong>Email:</strong> ${admin.email}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editAdmin(${admin.id})">✏️ Изменить</button>
                    <button class="btn-delete" onclick="deleteAdmin(${admin.id})">🗑️ Удалить</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка загрузки администраторов:', error);
    }
}

function openAdminModal() {
    document.getElementById('admin-id').value = '';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-email').value = '';
    
    openModal('admin-modal');
}

async function editAdmin(id) {
    try {
        const response = await fetch(`${API_URL}/admins/${id}`);
        const admin = await response.json();
        
        document.getElementById('admin-id').value = admin.id;
        document.getElementById('admin-username').value = admin.username;
        document.getElementById('admin-email').value = admin.email;
        document.getElementById('admin-password').value = '';
        
        openModal('admin-modal');
    } catch (error) {
        console.error('Ошибка загрузки администратора:', error);
    }
}

async function saveAdmin(e) {
    e.preventDefault();
    
    const id = document.getElementById('admin-id').value;
    const data = {
        username: document.getElementById('admin-username').value,
        password: document.getElementById('admin-password').value,
        email: document.getElementById('admin-email').value
    };
    
    try {
        const url = id ? `${API_URL}/admins/${id}` : `${API_URL}/admins`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            closeModal('admin-modal');
            loadAdmins();
            alert('Администратор успешно сохранен!');
        }
    } catch (error) {
        console.error('Ошибка сохранения администратора:', error);
        alert('Ошибка при сохранении!');
    }
}

async function deleteAdmin(id) {
    if (confirm('Вы уверены?')) {
        try {
            const response = await fetch(`${API_URL}/admins/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadAdmins();
                alert('Администратор удален!');
            }
        } catch (error) {
            console.error('Ошибка удаления администратора:', error);
            alert('Ошибка при удалении!');
        }
    }
}

// ========== МОДАЛЬНЫЕ ОКНА ==========

function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Закрыть модаль при клике на фон
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// ========== ВЫХОД ==========

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    }
}

// ========== ЗАГРУЗКА ПРИ СТАРТЕ ==========

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});
