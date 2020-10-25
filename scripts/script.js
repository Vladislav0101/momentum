// DOM Elements
const time = document.getElementById('time'),
    day = document.getElementById('day'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set Am or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    // 12hr Format
    hour = hour % 12 || 12;

    // Output Time
    time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)} ${showAmPm ? amPm : ''}`;

    setTimeout(showTime, 1000);
}

// Show Day
function showDay() {
    let today = new Date(),
        nmbDay = today.getDate(),
        weekDay = today.getDay(),
        month = today.getMonth();
    switch (weekDay) {
        case 1:
            weekDay = 'Sunday';
            break;
        case 2:
            weekDay = 'Monday';
            break;
        case 3:
            weekDay = 'Tuesday';
            break;
        case 4:
            weekDay = 'Wednesday';
            break;
        case 5:
            weekDay = 'Thursday';
            break;
        case 6:
            weekDay = 'Friday';
            break;
        case 0:
            weekDay = 'Saturday';
            break;
    }
    switch (month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'February';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }
    day.innerHTML = `${weekDay} | ${nmbDay}-${month}`;
}

// Add Zeroes

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours(),
        imgNmb = Math.floor(1 + Math.random() * 20);
    if (6 <= hour && hour < 12) {
        // Morning
        document.body.style.backgroundImage = `url('img/morning/${imgNmb}.jpg')`;
        greeting.textContent = 'Good Morning, ';
    } else if (12 <= hour && hour < 18) {
        // Day
        greeting.textContent = 'Good Afternoon, ';
        document.body.style.backgroundImage = `url('img/day/${imgNmb}.jpg')`;
    } else if (18 <= hour && hour < 24) {
        // Evening
        greeting.textContent = 'Good Evening, ';
        document.body.style.backgroundImage = `url('img/evening/${imgNmb}.jpg')`;
    } else if (0 <= hour && hour < 6) {
        // Night
        greeting.textContent = 'Good Night, ';
        document.body.style.backgroundImage = `url('img/night/${imgNmb}.jpg')`;
    }
}

function refreshImg() {
    let refreshImg = document.getElementById('refresh-img');
    let today = new Date(),
        hour = today.getHours(),
        i = Math.floor(hour / 6);
    refreshImg.onclick = function() {
        let timeDay = ['night', 'morning', 'day', 'evening'];
        let imgNmb = Math.floor(1 + Math.random() * 20);
        i++;
        i = i === 4 ? 0 : i;
        document.body.style.transition = 'background 1s linear';
        document.body.style.backgroundImage = `url('img/${timeDay[i]}/${imgNmb}.jpg`;
    }
}
refreshImg();

// Get Name
function getName() {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') == '') {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}
name.addEventListener('focus', () => {
    name.textContent = '';
});
name.addEventListener('blur', () => {
    if (name.innerHTML == '') {
        name.textContent = localStorage.getItem('name');
    }
});

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (name.innerHTML == '') {
                e.target.textContent = localStorage.getItem('name');
            }
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Name
function getFocus() {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') == '') {
        focus.textContent = '[Enter focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}
focus.addEventListener('focus', () => {
    focus.textContent = '';
});
focus.addEventListener('blur', () => {
    if (focus.innerHTML == '') {
        focus.textContent = localStorage.getItem('focus');
    }
});

// Set Name
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (focus.innerHTML == '') {
                e.target.textContent = localStorage.getItem('focus');
            }
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Quote
async function getQuote() {
    const url = 'https://type.fit/api/quotes';
    const res = await fetch(url);
    const data = await res.json();
    let changeQuote = document.getElementById('changeQuote');
    let nmb = (Math.random() * 10000).toFixed();
    nmb = nmb < 1640 ? nmb : (nmb / 10).toFixed();
    document.getElementById('quoteText').textContent = data[nmb].text;
    document.getElementById('quoteAuthor').textContent = data[nmb].author;
    changeQuote.onclick = function() {
        nmb = (Math.random() * 10000).toFixed();
        nmb = nmb < 1640 ? nmb : (nmb / 10).toFixed();
        document.getElementById('quoteText').textContent = data[nmb].text;
        document.getElementById('quoteAuthor').textContent = data[nmb].author;
    }
}

// Weather
let town = document.getElementById('weatherCheck');

function getTown() {
    if (localStorage.getItem('town') === null || localStorage.getItem('town') == '') {
        town.textContent = '[Enter town]';
    } else {
        town.textContent = localStorage.getItem('town');
    }
}
town.addEventListener('focus', () => {
    town.textContent = '';
});
town.addEventListener('blur', () => {
    if (town.innerHTML == '') {
        town.textContent = localStorage.getItem('town');
    }
});

// Set Town
function setTown(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            if (town.innerHTML == '') {
                e.target.textContent = localStorage.getItem('town');
            }
            town.blur();
        }
    } else {
        localStorage.setItem('town', e.target.innerText);
    }
}
town.addEventListener('keypress', setTown);
town.addEventListener('blur', setTown);
//

async function getWeather() {
    try {
        let temperature = document.getElementById('temperature');
        let humidity = document.getElementById('humidity');
        let wind = document.getElementById('wind');
        const weatherIcon = document.querySelector('.weather-icon');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('town')}&lang=en&appid=20279d6d34de7e47af76af33f73a8c0d&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        temperature.textContent = data.main.temp;
        humidity.textContent = data.main.humidity;
        wind.textContent = data.wind.speed;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        setTimeout(getWeather, 1000);
    } catch (err) {
        alert('check the spelling of the city');
    }
}

// Run
showDay();
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getWeather();
getTown();