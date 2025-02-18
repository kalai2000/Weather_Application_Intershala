const userlocation = document.getElementById("user-location"); 
console.log(userlocation);


WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=278c74b50867b67a7fb174370bb7a155&q=`;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=278c74b50867b67a7fb174370bb7a155&exclude=minutely&units=metric&`;

function finduserLocation() {
    fetch(WEATHER_DATA_ENDPOINT+"London")
    .then((response)=>response.json())
    .then((data)=>
        {console.log(data);
        });
}

finduserLocation();