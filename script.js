// --- Часы ---
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// --- Вход в систему ---
const loginBtn = document.getElementById('login-btn');
loginBtn.addEventListener('click', () => {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('os-screen').classList.add('active');
    startConsoleTyping();
});

// --- Дерево навыков ---
function showSkill(title, desc) {
    const detailBox = document.getElementById('skill-detail');
    detailBox.innerHTML = `<strong>${title}:</strong> ${desc}`;
}

// --- Шопинг калькулятор ---
let currentHappiness = 0;
const shopItems = document.querySelectorAll('.shop-item');
const progressBar = document.getElementById('shop-progress');
const shopStatus = document.getElementById('shop-status');

shopItems.forEach(item => {
    item.addEventListener('click', () => {
        const val = parseInt(item.getAttribute('data-val'));
        currentHappiness += val;
        progressBar.style.width = Math.min(currentHappiness, 100) + '%';
        progressBar.textContent = currentHappiness + '%';

        if(currentHappiness < 50) {
            shopStatus.textContent = 'Уровень счастья растёт! Набираем обороты 🛍️';
        } else if(currentHappiness < 100) {
            shopStatus.textContent = 'Прекрасный выбор! Энергия на максимуме ✨';
        } else {
            shopStatus.textContent = '🎉 МАКСИМАЛЬНЫЙ УРОВЕНЬ СЧАСТЬЯ И ЛЮБВИ ДОСТИГНУТ!';
        }
    });
});

// --- Колесо призов ---
const prizes = [
    "🎁 Приз: Завтрак в постель от Дашуни!",
    "🛍️ Приз: Безлимитный день шопинга!",
    "💆‍♀️ Приз: Массаж и вечер полного релакса!",
    "☕ Приз: Чашка чая по первому требованию!"
];
document.getElementById('spin-btn').addEventListener('click', () => {
    const resBox = document.getElementById('wheel-result');
    resBox.textContent = "Крутим колесо...";
    setTimeout(() => {
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
        resBox.textContent = randomPrize;
    }, 800);
});

// --- Аудиоплеер для праздничной песни ---
const audio = document.getElementById('bday-song');
const playBtn = document.getElementById('play-btn');

function toggleAudio() {
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.textContent = "⏸️ Пауза";
        }).catch(err => {
            console.log("Ошибка воспроизведения:", err);
            playBtn.textContent = "▶️ Нажмите еще раз";
        });
    } else {
        audio.pause();
        playBtn.textContent = "▶️ Включить музыку";
    }
}

// --- Викторина ---
function checkQuiz(isCorrect) {
    const res = document.getElementById('quiz-res');
    if(isCorrect) {
        res.style.color = "#2ed573";
        res.textContent = "АБСОЛЮТНО ВЕРНО! Ты лучшая Мамуля во вселенной! ❤️";
    } else {
        res.style.color = "#ff4757";
        res.textContent = "Ошибка! Такой вариант система даже не рассматривает! Попробуй еще раз 😉";
    }
}

// --- Мини-игра «Ловец» ---
let score = 0;
const gameArea = document.getElementById('game-area');
const scoreEl = document.getElementById('game-score');
const startBtn = document.getElementById('start-game-btn');
let gameInterval;

const items = ['💖', '💊', '帽', '🛍️', '☕', '👑', '🎁'];

startBtn.addEventListener('click', () => {
    score = 0;
    scoreEl.textContent = score;
    startBtn.style.display = 'none';
    gameInterval = setInterval(spawnTarget, 700);
});

function spawnTarget() {
    if(score >= 50) {
        clearInterval(gameInterval);
        gameArea.innerHTML = '<h3 style="margin-top:100px; color:#2ed573;">🎉 ВЫ ПОБЕДИЛИ! 50/50 ОЧКОВ! Вы лучшая Мамуля!</h3>';
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Сыграть ещё раз';
        return;
    }

    const target = document.createElement('div');
    target.className = 'game-target';
    target.textContent = items[Math.floor(Math.random() * items.length)];
    
    const x = Math.random() * (gameArea.clientWidth - 40);
    const y = Math.random() * (gameArea.clientHeight - 40);
    
    target.style.left = x + 'px';
    target.style.top = y + 'px';

    target.addEventListener('click', () => {
        score += 10;
        scoreEl.textContent = score;
        target.remove();
    });

    gameArea.appendChild(target);

    setTimeout(() => {
        if(target.parentNode) target.remove();
    }, 1200);
}

// --- Консоль от Дашуни ---
const consoleText = `> Executing Dasha_Love_Script.sh...
> Loading gratitude database from Dasha...
> Status: 200 OK

Дорогая, любимая Мамуля!
Это я, твоя Дашуня! 💖
Спасибо тебе огромнейшее за твою бесконечную заботу, за то, что всегда поддерживаешь меня в учебе на IT и во всех моих идеях, за твой юмор и за твое тепло.
Пусть твоя жизнь будет яркой, насыщенной и легкой, как идеальный код без единой ошибки и бага!
Я тебя безумно сильно люблю! ❤️`;

function startConsoleTyping() {
    const consoleBox = document.getElementById('console-output');
    let i = 0;
    consoleBox.textContent = '';
    
    function type() {
        if (i < consoleText.length) {
            consoleBox.textContent += consoleText.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}
// --- ИНТЕРАКТИВНЫЙ КУРСОР И ЭФФЕКТЫ ДЛЯ ПК И ТЕЛЕФОНОВ ---
const sparkles = ['✨', '💖', '🌸', '⭐', '❤️'];

// Функция создания искорок
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    const dx = (Math.random() - 0.5) * 60 + 'px';
    const dy = (Math.random() - 0.5) * 60 + 'px';
    sparkle.style.setProperty('--dx', dx);
    sparkle.style.setProperty('--dy', dy);

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

// 1. Для компьютеров: шлейф при движении мыши
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.3) {
        createSparkle(e.clientX, e.clientY);
    }
});

// 2. Для телефонов/планшетов: разлёт искорок при тапе пальцем
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 5; i++) {
        createSparkle(touch.clientX, touch.clientY);
    }
});