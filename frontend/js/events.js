// Загрузка событий из JSON через Fetch API
async function loadEvents() {
    try {
const response = await fetch('/api/events');        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const events = await response.json();
        const eventsGrid = document.getElementById('eventsGrid');
        
        // Очищаем контейнер
        eventsGrid.innerHTML = '';
        
        // Добавляем каждое событие
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-image" style="background-image: url('${event.image}'); background-size: cover; background-position: center;"></div>
                <div class="event-content">
                    <span class="event-date">${event.date}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <div class="event-meta-item">
                            <i class="fas fa-clock"></i> ${event.time}
                        </div>
                        <div class="event-meta-item">
                            <i class="fas fa-map-marker-alt"></i> ${event.location}
                        </div>
                    </div>
                    <button class="btn-event" data-event-id="${event.id}">Узнать больше</button>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
        
        // Добавляем слушатели на кнопки "Узнать больше"
        document.querySelectorAll('.btn-event').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const eventId = e.target.dataset.eventId;
                const event = events.find(ev => ev.id == eventId);
                openEventModal(event);
            });
        });
        
        console.log('✅ События загружены успешно:', events.length);
        
    } catch (error) {
        console.error('❌ Ошибка при загрузке событий:', error);
        document.getElementById('eventsGrid').innerHTML = 
            '<p style="color: red; grid-column: 1/-1; text-align: center;">Ошибка при загрузке данных. Пожалуйста, обновите страницу.</p>';
    }
}

// Открытие модального окна события
function openEventModal(event) {
    // Создаем модальное окно если его еще нет
    let modal = document.getElementById('eventModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'eventModal';
        modal.className = 'modal event-modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div class="modal-content event-modal-content">
            <button class="close" onclick="closeEventModal()">&times;</button>
            <div class="event-modal-body">
                <img src="${event.image}" alt="${event.title}" class="event-modal-image">
                <div class="event-modal-info">
                    <h2>${event.title}</h2>
                    <p class="event-modal-date"><i class="fas fa-calendar"></i> ${event.date}</p>
                    <p class="event-modal-time"><i class="fas fa-clock"></i> ${event.time}</p>
                    <p class="event-modal-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                    <hr>
                    <p class="event-modal-description">${event.full_description}</p>
                    <button class="btn btn-primary" onclick="closeEventModal()" style="width: 100%; margin-top: 20px;">Закрыть</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEventModal();
        }
    });
}

// Закрытие модального окна события
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Загружаем события когда страница загружена
document.addEventListener('DOMContentLoaded', loadEvents);