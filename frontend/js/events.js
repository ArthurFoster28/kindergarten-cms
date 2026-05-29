const events = [
    {
        icon: '🏊',
        title: 'Поход в бассейн',
        date: '5 июня 2026',
        description: 'Увлекательное занятие в бассейне. Дети учатся плавать, развивают уверенность в воде и получают массу удовольствия.',
        time: '15:00',
        location: 'Бассейн "Дельфин"'
    },
    {
        icon: '🎬',
        title: 'Поход в кино',
        date: '12 июня 2026',
        description: 'Дети смотрят увлекательный мультфильм в кинотеатре. После фильма - вкусный попкорн!',
        time: '13:00',
        location: 'Кинотеатр "СинемаХолл"'
    },
    {
        icon: '🦁',
        title: 'Контактный зоопарк',
        date: '18 июня 2026',
        description: 'Экскурсия в контактный зоопарк. Ребята смогут увидеть животных, покормить их и узнать интересные факты.',
        time: '10:00',
        location: 'Зоопарк "Зверинец"'
    },
    {
        icon: '🎨',
        title: 'Мастер-класс по рисованию',
        date: '8 июня 2026',
        description: 'Юные художники создают свои шедевры под руководством профессионального художника. Различные техники рисования.',
        time: '10:00',
        location: 'Студия искусств'
    },
    {
        icon: '🎭',
        title: 'Театральное представление',
        date: '15 июня 2026',
        description: 'Представление сказки "Три медведя" в исполнении детей. Отличный способ развить артистические способности.',
        time: '16:30',
        location: 'Актовый зал'
    },
    {
        icon: '🏃',
        title: 'Спортивный праздник',
        date: '20 июня 2026',
        description: 'Веселые соревнования, эстафеты и спортивные игры. Дети развивают физические способности и работают в команде.',
        time: '09:00',
        location: 'Спортивная площадка'
    }
];

const eventsGrid = document.getElementById('eventsGrid');

events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
        <div class="event-image">${event.icon}</div>
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
            <button class="btn-event">Узнать больше</button>
        </div>
    `;
    eventsGrid.appendChild(eventCard);
});