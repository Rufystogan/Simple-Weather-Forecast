//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const api = {
  key: "5dac0acc7f516749376b21bd0e3fea7a",
  base: "https://api.openweathermap.org/data/2.5/"
}

//Event Listener Function on keypress
const searchBox = document.getElementById("input-box");
searchBox.addEventListener("keypress", event);

function event(evt){
	if (evt.keyCode == 13) {
	console.log(searchBox.value);
    getWeatherReport(searchBox.value);
  }
}
//Get Weather Report
function getWeatherReport(city){
	fetch(`${api.base}weather?q=${city}&appid=${api.key}&units=metric`)
	.then(weather =>{
		return weather.json();
	}).then(showWeatherReport);
}
//Show Weather Report
function showWeatherReport(weather){
	console.log(weather);

	let city = document.getElementById("place");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

	let temperature = document.getElementById("temp");
	temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

	let minmaxTemp = document.getElementById("min-max");
	minmaxTemp.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C(min) / ${Math.round(weather.main.temp_max)}&deg;C(max)`;

	let weatherType = document.getElementById("weather");
	weatherType.innerText = weather.weather[0].main;

	let date = document.getElementById("date");
	let todayDate = new Date();
	date.innerText = dateManage(todayDate);

    //changeable icon
	let locationIcon = document.querySelector('.weather-icon');
	var icon = ("<img src='icon/" + weather.weather[0].icon + ".png'>");
	locationIcon.innerHTML = icon;

	//changeable background
	if(weatherType.textContent == "Clear"){
	   document.body.style.backgroundImage = "url('img/sunnybg.jpg')";

	} else if(weatherType.textContent == "Clouds"){
	   document.body.style.backgroundImage = "url('img/cloudybg.jpg')";

	} else if(weatherType.textContent == "Rain"){
	   document.body.style.backgroundImage = "url('img/rainy1bg.jpg')";

	} else if(weatherType.textContent == "Snow"){
	   document.body.style.backgroundImage = "url('img/snowybg.jpg')";

	} else if(weatherType.textContent == "Haze"){
	   document.body.style.backgroundImage = "url('img/hazybg.jpg')";

	} else if(weatherType.textContent == "Thunderstorm"){
	   document.body.style.backgroundImage = "url('img/thunderstormbg.jpg')";
    }
	
}
//Date Manage

function dateManage (dateArg) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[dateArg.getDay()];
  let date = dateArg.getDate();
  let month = months[dateArg.getMonth()];
  let year = dateArg.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


