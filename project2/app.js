const API_key = 'd48ac3a26e9689cffe9f754a44678be1';
const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == "404") {
            weather.innerHTML = `<h2>City not found</h2>`;
            return;
        }

        weather.innerHTML = `
        <div class="weather-card">
            <h2>${data.main.temp}°C</h2>
            <h4>${data.weather[0].main}</h4>
        </div>`;

    } catch (error) {
        console.error('Error fetching weather:', error);
    }
};

form.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather(search.value);
});
