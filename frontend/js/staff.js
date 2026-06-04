// Загрузка персонала из JSON через Fetch API
async function loadStaff() {
    try {
const response = await fetch('/api/staff');        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const staff = await response.json();
        const staffGrid = document.getElementById('staffGrid');
        
        // Очищаем контейнер
        staffGrid.innerHTML = '';
        
        // Добавляем каждого сотрудника
        staff.forEach(member => {
            const staffCard = document.createElement('div');
            staffCard.className = 'staff-card';
            staffCard.innerHTML = `
                <div class="staff-photo" style="background-image: url('${member.image}'); background-size: cover; background-position: center;"></div>
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
        
        console.log('✅ Персонал загружен успешно:', staff.length);
        
    } catch (error) {
        console.error('❌ Ошибка при загрузке персонала:', error);
        document.getElementById('staffGrid').innerHTML = 
            '<p style="color: red; grid-column: 1/-1; text-align: center;">Ошибка при загрузке данных. Пожалуйста, обновите страницу.</p>';
    }
}

// Загружаем персонал когда страница загружена
document.addEventListener('DOMContentLoaded', loadStaff);