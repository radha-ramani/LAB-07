const API_KEY = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const message = document.getElementById("message");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        weatherCard.style.display = "none";
        return;
    }

    message.textContent = "Loading...";
    weatherCard.style.display = "none";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;

        temperature.textContent =
            `${data.main.temp.toFixed(1)} °C`;

        condition.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherIcon.alt =
            data.weather[0].description;

        message.textContent = "";

        weatherCard.style.display = "block";

    } catch (error) {

        message.textContent =
            "Unable to find the city. Please enter a valid city name.";

        weatherCard.style.display = "none";
    }
}