const jsWeather = document.querySelector(".js-weather");
const jsWeather_temp = jsWeather.querySelector(".temp");
const jsWeather_city = jsWeather.querySelector(".city");

const CURRENTCOORDS = "currentCoords";
const API_KEY = "67acf362eedc992b52331d3d8ca5ca75";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temp = Math.floor(data.main.temp);
      const city = data.name;
      jsWeather_temp.innerText = `${temp}`;
      jsWeather_city.innerText = `${city}`;
    });
}
function saveCoords(obj) {
  localStorage.setItem(CURRENTCOORDS, JSON.stringify(obj));
}

function getCoordsSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
  saveCoords(coordsObj);
}

function getCoordsError() {
  console.log("Can't access geolocation");
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(getCoordsSuccess, getCoordsError);
}

function init() {
  const loadedCoords = localStorage.getItem(CURRENTCOORDS);
  if (loadedCoords === null) {
    askCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

init();
