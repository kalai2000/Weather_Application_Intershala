Weather Dashboard

Project Overview

This project is a Weather Dashboard that provides real-time weather information and a 5-day forecast for any city. Users can either search by city name or use their current location to retrieve weather data.

Features

Search by City Name: Enter a city name to fetch the current weather and 5-day forecast.

Use Current Location: Automatically fetch weather data for the user's current location using Geolocation API.

Recent Searches: Recent cities are stored in local storage for quick access.

Detailed Forecast: Displays temperature, wind speed, and humidity for each day.

Responsive Design: Optimized for various screen sizes using Tailwind CSS.

Technologies Used

HTML5 for structure

CSS3 with Tailwind CSS for styling

JavaScript (Vanilla JS) for functionality

OpenWeather API for weather data

Installation & Setup

Clone the repository

git clone  https://github.com/kalai2000/Weather_Application_Intershala
cd weather-dashboard

Add API Key

Register on OpenWeather to get your free API key.

Replace the API_KEY variable in index.js with your key:

const API_KEY = "YOUR_API_KEY";

Run the Project

Open index.html directly in your browser.

How to Use

Enter a city name in the search input and click the Search button to get the weather details.

Alternatively, click the Use Current Location button to fetch weather data for your current location.

The 5-day forecast will display below the main weather details.

Known Issues

Ensure location permissions are enabled in your browser for current location fetching to work.

If the city name is invalid, an alert will notify the user.

 