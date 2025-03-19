// Select DOM elements
const userlocation = document.getElementById("user-location");
const search = document.getElementById("search");
const currentlocation = document.getElementById("Currentlocation");
const recentSearchesDatalist = document.getElementById("recent-searches");
const place = document.getElementById("place");
const temprature = document.getElementById("temprature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weather_image = document.getElementById("weather-image");
const forecastContainers = document.querySelectorAll(".forecast-day");

// OpenWeather API Key & Endpoints
const API_KEY = "278c74b50867b67a7fb174370bb7a155";
const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&`;
const FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&`;

// Function to fetch weather by city name
function finduserLocation() {
    const city = userlocation.value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    saveSearch(city); // Save city to recent searches
    fetchWeather(`${WEATHER_API}q=${encodeURIComponent(city)}`);
    userlocation.value = "";
}

// Function to fetch weather using user's current location
function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Fetching weather for: Latitude ${latitude}, Longitude ${longitude}`);
            fetchWeather(`${WEATHER_API}lat=${latitude}&lon=${longitude}`);
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("Please enable location permissions in your browser.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("Location request timed out. Try again.");
                    break;
                default:
                    alert("An unknown error occurred while retrieving location.");
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// Function to fetch weather and forecast data
function fetchWeather(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`City not found. Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
            return fetch(`${FORECAST_API}lat=${data.coord.lat}&lon=${data.coord.lon}`);
        })
        .then(response => response.json())
        .then(updateForecastUI)
        .catch(error => console.error("Error fetching weather data:", error));
}

// Function to update main weather UI
function updateWeatherUI(data) {
    const date = new Date(data.dt * 1000).toLocaleString();
    place.innerHTML = `${data.name}, ${date}`;
    temprature.innerHTML = `Temperature: ${data.main.temp}°C`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    wind.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
    weather_image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

// Function to update 5-day weather forecast
function updateForecastUI(forecastData) {
    console.log("5-Day Forecast Data:", forecastData);
    const dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("12:00:00"));

    dailyData.forEach((day, index) => {
        if (forecastContainers[index]) {
            const date = new Date(day.dt * 1000).toLocaleDateString();
            forecastContainers[index].querySelector(".date").textContent = date;
            forecastContainers[index].querySelector(".temp").textContent = `Temp: ${day.main.temp}°C`;
            forecastContainers[index].querySelector(".wind").textContent = `Wind: ${day.wind.speed} m/s`;
            forecastContainers[index].querySelector(".humidity").textContent = `Humidity: ${day.main.humidity}%`;
            forecastContainers[index].querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        }
    });
}

// Function to save searched cities in Local Storage
function saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (!searches.includes(city)) {
        searches.unshift(city);
        if (searches.length > 5) searches.pop();
        localStorage.setItem("recentCities", JSON.stringify(searches));
    }
    updateDatalist();
}

// Function to update datalist with recent searches
function updateDatalist() {
    let searches = JSON.parse(localStorage.getItem("recentCities")) || [];
    recentSearchesDatalist.innerHTML = "";
    searches.forEach(city => {
        let option = document.createElement("option");
        option.value = city;
        recentSearchesDatalist.appendChild(option);
    });
}

// Load recent searches when the page loads
updateDatalist();

// Event listeners for search and current location buttons
search.addEventListener("click", finduserLocation);
currentlocation.addEventListener("click", getUserLocation);
