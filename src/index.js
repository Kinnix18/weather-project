let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";

let form = document.querySelector("form");
let input = document.querySelector("input.question");

let h1 = document.querySelector("h1");
let h1Data = document.querySelector("h1 .data");
let h1Celsius = document.querySelector("h1 .celsius");
let h1Fahrenheit = document.querySelector("h1 .fahrenheit");

let h2 = document.querySelector("h2");

let h3 = document.querySelector("h3");
let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[time.getDay()];

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h3.innerHTML = `${day} <br />
                ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();

  h2.innerHTML = `${input.value}`;

  weatherHandlerByCity(input.value);
}

form.addEventListener("submit", showCity);

function convertToFahrenheit() {
  let fTemp = h1Data.innerText * 1.8 + 32;
  h1Data.innerHTML = `${Math.round(fTemp)}`;

  h1Celsius.classList.add("not-active");
  h1Fahrenheit.classList.remove("not-active");
}
h1Fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelc() {
  let cTemp = (h1Data.innerText - 32) * 0.5556;
  h1Data.innerHTML = `${Math.round(cTemp, 2)}`;

  h1Fahrenheit.classList.add("not-active");
  h1Celsius.classList.remove("not-active");
}
h1Celsius.addEventListener("click", convertToCelc);

function weatherHandlerByCity(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}°C`;
  h2.innerHTML = response.data.name;
}
