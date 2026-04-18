const API_KEY = "f4b7f34a7c3b67ddb02d1df43ed09de9";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const HISTORY_KEY = "weatherSearchHistory";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");
const emptyState = document.getElementById("empty-state");
const searchHistory = document.getElementById("search-history");
const clearHistoryButton = document.getElementById("clear-history");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

async function getWeather(city) {
    if (API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
        showError("Add your OpenWeatherMap API key in app.js first.");
        showEmptyState("Weather results will appear here after you add the API key.");
        return;
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found.");
            }

            if (response.status === 401) {
                throw new Error("API key is invalid or not active yet.");
            }

            throw new Error(data.message || "Failed to fetch weather data.");
        }

        displayWeather(data);
        saveToHistory(data.name);
    } catch (requestError) {
        if (requestError instanceof TypeError) {
            showError("Network error. Open the app with Live Server or check your internet connection.");
            return;
        }

        showError(requestError.message);
    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    const {
        name,
        sys,
        weather,
        main,
        wind
    } = data;

    const weatherInfo = weather[0];

    cityName.textContent = `${name}, ${sys.country}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
    weatherIcon.alt = weatherInfo.description;
    temperature.textContent = `${Math.round(main.temp)} deg C`;
    description.textContent = capitalizeWords(weatherInfo.description);
    feelsLike.textContent = `${Math.round(main.feels_like)} deg C`;
    humidity.textContent = `${main.humidity}%`;
    wind.textContent = `${wind.speed} m/s`;
    pressure.textContent = `${main.pressure} hPa`;

    weatherDisplay.classList.remove("hidden");
    emptyState.classList.add("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
    emptyState.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
    showEmptyState("Try another city or check your internet connection.");
}

function hideError() {
    error.textContent = "";
    error.classList.add("hidden");
}

function capitalizeWords(text) {
    return text.replace(/\b\w/g, (character) => character.toUpperCase());
}

function showEmptyState(message) {
    emptyState.innerHTML = `<div class="empty-state">${message}</div>`;
    emptyState.classList.remove("hidden");
}

function saveToHistory(city) {
    const currentHistory = getHistory();
    const updatedHistory = [city, ...currentHistory.filter((item) => item !== city)].slice(0, 5);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    loadHistory();
}

function getHistory() {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
}

function loadHistory() {
    const history = getHistory();

    if (!history.length) {
        searchHistory.innerHTML = "<li class=\"history-empty\">No recent searches yet.</li>";
        return;
    }

    searchHistory.innerHTML = history
        .map((city) => `
            <li>
                <button type="button" class="history-item" data-city="${city}">${city}</button>
            </li>
        `)
        .join("");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    getWeather(city);
});

searchHistory.addEventListener("click", (event) => {
    const button = event.target.closest(".history-item");

    if (!button) {
        return;
    }

    const { city } = button.dataset;
    cityInput.value = city;

    getWeather(city);
});

clearHistoryButton.addEventListener("click", () => {
    localStorage.removeItem(HISTORY_KEY);
    loadHistory();
});

loadHistory();
