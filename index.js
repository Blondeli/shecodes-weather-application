// Define API Key for general use
let apiKey = "714608e2f44bce5ef2aac9b653b6c111";


// Display current date and time
let now = new Date();

function displayDate(time, dateHTML) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let month = months[time.getMonth()];
  let day = days[time.getDay()];
  let date = time.getDate();

  dateHTML.innerHTML = `${day}, ${month} ${date}`;
}

function displayTime(time, timeHTML) {
  let hour = time.getHours();
  let minute = time.getMinutes();

  if (minute < 10) {
    minute = "0" + minute;
  }

  timeHTML.innerHTML = `${hour}h${minute}`;
}

// Display date
let currentDate = document.querySelector("#current-date");
displayDate(now, currentDate);

// Display time
let currentTime = document.querySelector("#current-time");
displayTime(now, currentTime);


// Display city name and temperature + details
function getTemperature(response) {

  // Display temperature
  let temperature = Math.round(response.data.main.temp);
  let tempHtml = document.querySelector("#temp-number");
  tempHtml.innerHTML = temperature;

  // Display humidity
  let humidity = response.data.main.humidity;
  let humidityHtml = document.querySelector(".humidity");
  humidityHtml.innerHTML = humidity;

  // Display wind speed
  let wind = Math.round(response.data.wind.speed * 3.6);
  let windHtml = document.querySelector(".wind");
  windHtml.innerHTML = wind;

  // Display sunrise
  let sunrise = new Date(response.data.sys.sunrise * 1000);
  sunrise = sunrise.toLocaleTimeString();
  sunrise = sunrise.substr(0, 5).replace(":", "h");
  let sunriseHtml = document.querySelector(".sunrise");
  sunriseHtml.innerHTML = sunrise;

  // Display sunset
  let sunset = new Date(response.data.sys.sunset * 1000);
  sunset = sunset.toLocaleTimeString();
  sunset = sunset.substr(0, 5).replace(":", "h");
  let sunsetHtml = document.querySelector(".sunset");
  sunsetHtml.innerHTML = sunset;

  // Display weather description
  let weatherDescription = response.data.weather[0].description;
  weatherDescription = weatherDescription[0].toUpperCase() + weatherDescription.substring(1);
  let weatherDescriptionHtml = document.querySelector(".weather-description");
  weatherDescriptionHtml.innerHTML = weatherDescription;

  // Display weather icon
  let weatherIcon = response.data.weather[0].icon;
  let weatherIconHtml = document.querySelector("#weather-icon");
  weatherIconHtml.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
}

function changeCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search").value;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = citySearch;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getTemperature);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", changeCityName);


// Display current location and temperature
function getCurrentTemperature(response) {
  // let temperature = Math.round(response.data.main.temp);
  // let tempHtml = document.querySelector("#temp-number");
  // tempHtml.innerHTML = temperature;

  let currentLocation = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = currentLocation;

  getTemperature(response);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentLocation);


//Change temperature metric

//Change to Celsius
function changeToC() {
  let tempMetric = document.querySelector(".temp-metric");
  if (tempMetric.innerHTML === "ºF") {
    let tempNumber = document.querySelector(".temp-number");
    tempMetric.innerHTML = "ºC";
    tempNumber.innerHTML = Math.round((tempNumber.innerHTML - 32) * 5/9);
  }
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToC);

//Change to Fahrenheit
function changeToF() {
  let tempMetric = document.querySelector(".temp-metric");
  if (tempMetric.innerHTML === "ºC") {
    let tempNumber = document.querySelector(".temp-number");
    tempMetric.innerHTML = "ºF";
    tempNumber.innerHTML = Math.round((tempNumber.innerHTML * 9/5) + 32);
  }
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", changeToF);
