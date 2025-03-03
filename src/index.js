/*
const userlocation = document.getElementById("user-location");
const search = document.getElementById("search");
const currentlocation = document.getElementById("currentlocation");
const place = document.getElementById("place");
const temprature = document.getElementById("temprature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weather_image = document.getElementById("weather-image");
const forecastContainers = document.querySelectorAll(".forecast-day"); // Select forecast cards

const API_KEY = "278c74b50867b67a7fb174370bb7a155";
const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
const WEATHER_FORECAST_API = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&`;

function finduserLocation() {
    const city = userlocation.value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetch(WEATHER_API_ENDPOINT + encodeURIComponent(city))
        .then(response => {
            if (!response.ok) {
                throw new Error(`City not found. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather Data:", data);

            // Update main weather details
            const date = new Date(data.dt * 1000).toLocaleString();
            place.innerHTML = `${data.name}, ${date}`;
            temprature.innerHTML = `Temperature: ${data.main.temp}°C`;
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
            wind.innerHTML = `Wind Speed: ${data.wind.speed} m/s`;
            weather_image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            // Fetch 5-day forecast data
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=metric`);
        })
        .then(response => response.json())
        .then(forecastData => {
            console.log("5-Day Forecast Data:", forecastData);

            const dailyData = forecastData.list.filter(reading => reading.dt_txt.includes("12:00:00")); // Get data at 12 PM for each day

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
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

// Add event listener to search button
search.addEventListener("click", finduserLocation);
//currentlocation.addEventListener("click",finduserLocation);

*/

// Select DOM elements
const userlocation = document.getElementById("user-location");
const search = document.getElementById("search");
const currentlocation = document.getElementById("Currentlocation");
const place = document.getElementById("place");
const temprature = document.getElementById("temprature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const weather_image = document.getElementById("weather-image");
const forecastContainers = document.querySelectorAll(".forecast-day"); // Forecast cards

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
    fetchWeather(`${WEATHER_API}q=${encodeURIComponent(city)}`);
    userlocation.value ="";
}

// Function to fetch weather using user's current location
function getUserLocation() {
    userlocation.value ="";
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
            alert("Unable to retrieve location. Please allow location access.");
            console.error("Geolocation error:", error);
        },
        { 
            enableHighAccuracy: true,  // Requests the most accurate position
            timeout: 10000,            // Max time (ms) to wait for a location
            maximumAge: 0              // Prevents returning a cached location
        }
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

// Event listeners for search and current location buttons
search.addEventListener("click", finduserLocation);
currentlocation.addEventListener("click", getUserLocation);




