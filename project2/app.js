const API_key = 'd48ac3a26e9689cffe9f754a44678be1';
const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const loading = document.querySelector("#loading");
const tempUnitToggle = document.querySelector("#tempUnitToggle");

let isCelsius = true; // Default unit is Celsius
let weatherData = {}; // Store fetched weather data

// Function to toggle between Celsius and Fahrenheit
const toggleUnit = () => {
    isCelsius = !isCelsius;
    updateWeatherCard(); // Update the weather card without re-fetching data
};

// Add event listener for unit toggle
tempUnitToggle.addEventListener('click', toggleUnit);

// Convert temperature from Celsius to Fahrenheit
const convertTemp = (tempInCelsius) => {
    return (tempInCelsius * 9/5) + 32;
};

// Function to display the weather card
const displayWeatherCard = (data) => {
    // Store the fetched weather data
    weatherData = {
        tempCelsius: data.main.temp, 
        tempFahrenheit: convertTemp(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
        weather: data.weather[0].main
    };

    updateWeatherCard();
};

// Function to update the weather card with the correct temperature unit
const updateWeatherCard = () => {
    if (!weatherData.tempCelsius) return;

    // Get the temperature based on the current unit
    const temp = isCelsius ? weatherData.tempCelsius : weatherData.tempFahrenheit;
    const tempUnit = isCelsius ? 'C' : 'F';

    // Update the weather card content
    weather.innerHTML = `
        <div class="weather-card">
            <h2>${temp}°${tempUnit}</h2>
            <h4>${weatherData.weather}</h4>
            <p>Humidity: ${weatherData.humidity}%</p>
            <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
            <p>Pressure: ${weatherData.pressure} hPa</p>
            <p>Visibility: ${weatherData.visibility / 1000} km</p>
            <p>Sunrise: ${weatherData.sunrise}</p>
            <p>Sunset: ${weatherData.sunset}</p>
        </div>
    `;
};

// Fetch weather data for the city
const getWeather = async (city) => {
    loading.style.display = 'block';  // Show loading animation
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weather.innerHTML = `<h2 style="color: red;">City not found. Please try again.</h2>`;
            loading.style.display = 'none';  // Hide loading
            return;
        }

        // Display the weather card with fetched data
        displayWeatherCard(data);
        loading.style.display = 'none';  // Hide loading
    } catch (error) {
        weather.innerHTML = `<h2 style="color: red;">Error fetching weather data. Try again later.</h2>`;
        loading.style.display = 'none';  // Hide loading
        console.error('Error fetching weather:', error);
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather(search.value);  // Fetch weather data for the entered city
});