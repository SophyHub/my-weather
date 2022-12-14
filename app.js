function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  return `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="nextDay">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
          alt=""
          width="42"/>
          <div class= "tempHighLow"> 
          <span class= "tempMax"> ${Math.round(forecastDay.temp.max)}°</span>|
          <span class= "tempLow"> ${Math.round(forecastDay.temp.min)}°</span> 
          </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("h2");
  let cityInput = document.querySelector("#city-input");
  newCity.innerHTML = `uh-oh 🤭,try search again📍${cityInput.value}`;
  var city = document.querySelector("#city-input").value;
  var apiKey = "ad793a6d772939c31783de5822791acf";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=imperial");
  axios.get(apiUrl).then(showTemperture).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function search(event) {
  event.preventDefault();
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperture).then(displayForecast);
  getForecast(response.data.coord);
}

function showTemperture(response) {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  let humidity = document.querySelector("humidity");
  let sunset = document.querySelector("sunset");
  let description = document.querySelector("description");
  let clouds = document.querySelector("cloudCover");
  let iconElement = document.querySelector("#icon");
  let temperature = Math.round(response.data.main.temp);
  const sunsetDayTime = new Date(response.data.sys.sunset * 1000);
  const sunsetTime =
    sunsetDayTime.getHours() + ":" + sunsetDayTime.getMinutes();
  document.querySelector("#sunset").innerHTML = sunsetTime;
  h1.innerHTML = `Currently ${temperature}° F in your City`;
  h2.innerHTML = `${response.data.name}🗺️`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#cloudCover").innerHTML = response.data.clouds.all;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
}
function retrievePosition(position) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperture);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
searchCity.addEventListener("submit", showCity);
