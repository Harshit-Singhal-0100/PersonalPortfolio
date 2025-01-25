const API_key = 'd48ac3a26e9689cffe9f754a44678be1';
const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const loading = document.querySelector("#loading");
const tempUnitToggle = document.querySelector("#tempUnitToggle");

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