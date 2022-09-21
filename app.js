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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let day = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="nextDay">${day}</div>
            <img src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"/>
          <div class= "tempHighLow"> 
          <span class= "max">98°</span>|
          <span class= "low">78°</span> 
          </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function showCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("h2");
  let cityInput = document.querySelector("#city-input");
  newCity.innerHTML = `uh-oh 🤭,try search again📍${cityInput.value}`;
  var city = document.querySelector("#city-input").value;
  var apiKey = "1c11d2f653de96f3ffba668f7268667a";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
    .concat(city, "&appid=")
    .concat(apiKey, "&units=imperial");
  axios.get(apiUrl).then(showTemperture);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function search(event) {
  event.preventDefault();
  let apiKey = "1c11d2f653de96f3ffba668f7268667a";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperture);
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
  displayForecast(response.data.coord);
}
function retrievePosition(position) {
  let apiKey = "1c11d2f653de96f3ffba668f7268667a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperture);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
searchCity.addEventListener("submit", showCity, showTemperture);
