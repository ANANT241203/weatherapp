const defaultCity = 'Philadelphia';

async function fetchWeather(event) {
    if (!event || (event.key === 'Enter' && event.target.value.trim() !== '')) {
        const city = event ? event.target.value : defaultCity;
        const apiKey = 'f9bb6d9bfe59812c74f5ed34b565e612';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            updateWeatherUI(data);
        } else {
            alert('City not found!');
        }
    }
}

function updateWeatherUI(data) {
    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherIcon = getWeatherIcon(weatherCondition);

    // Update UI Elements
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}&deg;`;
    document.getElementById('condition').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;

    // Update Hourly Forecast
    const hourlyContainer = document.getElementById('hourly');
    hourlyContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const hourDiv = document.createElement('div');
        hourDiv.innerHTML = `
            <p>${i + 1}:00</p>
            <img src="https://img.icons8.com/color/${weatherIcon}" alt="${weatherCondition}">
            <p>${Math.round(data.main.temp - i)}&deg;</p>`;
        hourlyContainer.appendChild(hourDiv);
    }

    // Update 5-Day Forecast
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <p>Day ${i + 1}</p>
            <img src="https://img.icons8.com/color/${weatherIcon}" alt="${weatherCondition}">
            <p>${Math.round(data.main.temp - i * 2)}&deg; / ${Math.round(data.main.temp - i * 3)}&deg;</p>`;
        forecastContainer.appendChild(dayDiv);
    }

    // Change Background and Palette
    changeBackground(weatherCondition);
}

function getWeatherIcon(condition) {
    const icons = {
        clear: "sun",
        clouds: "cloud",
        rain: "rain",
        drizzle: "light-rain",
        thunderstorm: "storm",
        snow: "snowflake",
        mist: "fog-day",
        fog: "fog-day",
        haze: "fog-day",
    };

    return icons[condition] || "cloud"; // Default to "cloud" icon
}

function changeBackground(condition) {
    const body = document.body;
    const container = document.querySelector('.container');


    if (condition === 'clear') {
        body.style.background = 'linear-gradient(to bottom, #FFD700, #FF8C00)';
        container.style.background = 'rgba(255, 255, 255, 0.2)';
        body.style.color = 'black';
        document.body.style.setProperty('--input-text-color', 'black');

    } else if (condition === 'clouds') {
        body.style.background = 'linear-gradient(to bottom, #B0C4DE, #778899)';
        container.style.background = 'rgba(0, 0, 0, 0.2)';
        body.style.color = 'white';
        document.body.style.setProperty('--input-text-color', 'white');

    } else if (condition === 'rain' || condition === 'drizzle') {
        body.style.background = 'linear-gradient(to bottom, #87CEFA, #4682B4)';
        container.style.background = 'rgba(0, 0, 0, 0.3)';
        body.style.color = 'white';
        document.body.style.setProperty('--input-text-color', 'white');

    } else if (condition === 'snow') {
        body.style.background = 'linear-gradient(to bottom,rgb(115, 240, 240),rgb(72, 193, 209))';
        container.style.background = 'rgba(255, 255, 255, 0.3)';
        body.style.color = 'black';
        document.body.style.setProperty('--input-text-color', 'black');

    } else {
        body.style.background = 'linear-gradient(to bottom, #696969, #2F4F4F)';
        container.style.background = 'rgba(0, 0, 0, 0.3)';
        body.style.color = 'white';
        document.body.style.setProperty('--input-text-color', 'white');

    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
});
