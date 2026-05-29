const staff = [
    {
        icon: '👩‍🏫',
        name: 'Мария Сергеевна Петрова',
        position: 'Воспитатель средней группы',
        bio: 'Опытный педагог с большой любовью к детям. Организует интересные занятия по рисованию и развитию речи.',
        experience: 'Стаж: 12 лет',
        qualifications: 'Высшее педагогическое образование, сертификат по детской психологии'
    },
    {
        icon: '👩‍⚕️',
        name: 'Елена Петровна Васильева',
        position: 'Врач детского сада',
        bio: 'Опытный медик, который тщательно следит за здоровьем каждого ребенка.',
        experience: 'Стаж: 15 лет',
        qualifications: 'Врач-педиатр, высшее медицинское образование'
    },
    {
        icon: '👨‍🏫',
        name: 'Иван Игоревич Сомов',
        position: 'Физкультурный инструктор',
        bio: 'Развивает физические способности детей через веселые игры и спортивные занятия.',
        experience: 'Стаж: 8 лет',
        qualifications: 'Тренер по детской гимнастике, высшее физкультурное образование'
    },
    {
        icon: '👩‍🎵',
        name: 'Ольга Владимировна Морозова',
        position: 'Музыкальный руководитель',
        bio: 'Прививает детям любовь к музыке и развивает их творческие способности.',
        experience: 'Стаж: 10 лет',
        qualifications: 'Высшее музыкальное образование, композитор'
    },
    {
        icon: '👩‍🏫',
        name: 'Анна Станиславовна Орлова',
        position: 'Воспитатель младшей группы',
        bio: 'Использует нежный и заботливый подход к малышам. Помогает им адаптироваться.',
        experience: 'Стаж: 7 лет',
        qualifications: 'Высшее педагогическое образование'
    },
    {
        icon: '👩‍🔬',
        name: 'Виктория Анатольевна Кирпичева',
        position: 'Психолог',
        bio: 'Оказывает психологическую поддержку детям и родителям. Проводит консультации.',
        experience: 'Стаж: 9 лет',
        qualifications: 'Высшее психологическое образование, детский психолог'
    }
];

const staffGrid = document.getElementById('staffGrid');

staff.forEach(member => {
    const staffCard = document.createElement('div');
    staffCard.className = 'staff-card';
    staffCard.innerHTML = `
        <div class="staff-photo">${member.icon}</div>
        <div class="staff-info">
            <h3 class="staff-name">${member.name}</h3>
            <p class="staff-position">${member.position}</p>
            <p class="staff-bio">${member.bio}</p>
            <div class="staff-experience">
                <strong>${member.experience}</strong>
            </div>
            <div class="staff-qualifications">
                <strong>Квалификация:</strong>
                ${member.qualifications}
            </div>
        </div>
    `;
    staffGrid.appendChild(staffCard);
});