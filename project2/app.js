const API_key = 'd48ac3a26e9689cffe9f754a44678be1';
const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const loading = document.querySelector("#loading");
const tempUnitToggle = document.querySelector("#tempUnitToggle");
const geolocateBtn = document.querySelector("#geolocate");
const weatherAlerts = document.querySelector("#weather-alerts");
const weatherNews = document.querySelector("#weather-news");
const shareBtn = document.querySelector("#share");

let isCelsius = true; // Default unit is Celsius

const toggleUnit = () => {
    isCelsius = !isCelsius;
    const currentCity = search.value;
    if (currentCity) {
        getWeather(currentCity); // Re-fetch weather data based on new unit
    }
};

tempUnitToggle.addEventListener('click', toggleUnit);

const getWeather = async (city) => {
    loading.style.display = 'block';  // Show loading animation
    weather.innerHTML = ''; // Clear previous weather info
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=${isCelsius ? 'metric' : 'imperial'}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.cod === "404") {
            weather.innerHTML = `<h2 style="color: red;">City not found. Please try again.</h2>`;
            loading.style.display = 'none';  // Hide loading
            return;
        }

        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.setAttribute('data-temperature', data.main.temp > 30 ? 'hot' : 'cold');

        // Use OpenWeatherMap's icon URL
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.innerHTML = `
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <h2>${data.main.temp.toFixed(1)}°${isCelsius ? 'C' : 'F'}</h2>
            <h4>${data.weather[0].main}</h4>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Visibility: ${data.visibility / 1000} km</p>
            <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        `;

        weather.appendChild(weatherCard);
        loading.style.display = 'none';  // Hide loading
        fetchWeatherAlerts(city);
        fetchWeatherNews();
    } catch (error) {
        weather.innerHTML = `<h2 style="color: red;">Error fetching weather data. Try again later.</h2>`;
        loading.style.display = 'none';  // Hide loading
        console.error('Error fetching weather:', error);
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather(search.value);
});

geolocateBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

const getWeatherByCoords = async (lat, lon) => {
    loading.style.display = 'block';  // Show loading animation
    weather.innerHTML = ''; // Clear previous weather info
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=${isCelsius ? 'metric' : 'imperial'}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');
        weatherCard.setAttribute('data-temperature', data.main.temp > 30 ? 'hot' : 'cold');

        // Use OpenWeatherMap's icon URL
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.innerHTML = `
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <h2>${data.main.temp.toFixed(1)}°${isCelsius ? 'C' : 'F'}</h2>
            <h4>${data.weather[0].main}</h4>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Visibility: ${data.visibility / 1000} km</p>
            <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
        `;

        weather.appendChild(weatherCard);
        loading.style.display = 'none';  // Hide loading
    } catch (error) {
        weather.innerHTML = `<h2 style="color: red;">Error fetching weather data. Try again later.</h2>`;
        loading.style.display = 'none';  // Hide loading
        console.error('Error fetching weather:', error);
    }
};

const fetchWeatherAlerts = async (city) => {
    // Fetch weather alerts for the city
    try {
        const url = `https://api.openweathermap.org/data/2.5/alerts?q=${city}&appid=${API_key}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.alerts && data.alerts.length > 0) {
            weatherAlerts.innerHTML = data.alerts.map(alert => `
                <div class="alert">
                    <h4>${alert.event}</h4>
                    <p>${alert.description}</p>
                    <p><strong>Start:</strong> ${new Date(alert.start * 1000).toLocaleTimeString()}</p>
                    <p><strong>End:</strong> ${new Date(alert.end * 1000).toLocaleTimeString()}</p>
                </div>
            `).join('');
        } else {
            weatherAlerts.innerHTML = `<p>No weather alerts for this location.</p>`;
        }
    } catch[_{{{CITATION{{{_1{](https://github.com/EleanorEllingson/web-dev/tree/b2f2a382e77a20fd6895677c8b8f402ac4bae352/7-bank-project%2F1-template-route%2Ftranslations%2FREADME.ko.md)[_{{{CITATION{{{_2{](https://github.com/Aschuuu/typer/tree/e36c91849d40df74ad53462554c52d80af890808/index.php)