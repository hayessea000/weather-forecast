let cityName 
let cityLat 
let cityLon 
var savedCities
let cityInput = $("#searchinput")
let today= dayjs().format("M/D/YYYY");
let getlocation = function () { 
    let apiUrlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.val()}&appid=87c519cf4ba544282595e47fb0dc2455`
    fetch(apiUrlLoc)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            cityName = data[0].name
            cityLat = data[0].lat
            cityLon = data[0].lon
            var citysearch ={"lat": data[0].lat, "lon": data[0].lon, "nameCity": data[0].name}
            if (savedCities.length < 5){
                savedCities.unshift(citysearch);
            }else{
                var scrap =savedCities.pop();
                savedCities.unshift(citysearch);
            }
            console.log(savedCities)
            localStorage.setItem("savedCities", JSON.stringify(savedCities));
            searchHistory()
            getWeather()
        })
}

let getWeather = function (){
    let apiUrlWeatherForecast= `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=87c519cf4ba544282595e47fb0dc2455&units=imperial`
    let apiUrlWeather= `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=87c519cf4ba544282595e47fb0dc2455&units=imperial`
    fetch(apiUrlWeather)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            console.log(data)
            // makes the todays weather
            let todaysWeather= data
            let todayWeatherBox = $("#todayWeather")
            let todayWeatherBoxHeader = $("<div>")
            let todayWeatherBoxCity = $("<h2>")
            let todayWeatherBoxImage = $("<img>")
            todayWeatherBoxImage.attr("src", `https://openweathermap.org/img/wn/${todaysWeather.weather[0].icon}@2x.png`)
            todayWeatherBoxImage.attr("alt", `${todaysWeather.weather[0].description}`)
            todayWeatherBoxCity.text(`${todaysWeather.name} (${today})`)
            let todayWeatherBoxtemp = $("<p>")
            todayWeatherBoxtemp.text(`Temp: ${todaysWeather.main.temp} °F`)
            let todayWeatherBoxWind = $("<p>")
            todayWeatherBoxWind.text(`Wind: ${todaysWeather.wind.speed} MPH`)
            let todayWeatherBoxHumidity = $("<p>")
            todayWeatherBoxHumidity.text(`Humidity: ${todaysWeather.main.humidity} %`)
            todayWeatherBoxHeader.append(todayWeatherBoxCity)
            todayWeatherBoxHeader.append(todayWeatherBoxImage)
            todayWeatherBox.append(todayWeatherBoxHeader)
            todayWeatherBox.append(todayWeatherBoxHeader)
            todayWeatherBox.append(todayWeatherBoxtemp)
            todayWeatherBox.append(todayWeatherBoxWind)
            todayWeatherBox.append(todayWeatherBoxHumidity)
        })
    fetch(apiUrlWeatherForecast)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            console.log(data)
            // makes the forecast weather
            let forecastWeather= data
            






        })    
}

let searchHistory= function(){
    var cityHistory= $("#savedCities")
    cityHistory.html("")
    for (let i=0; i<savedCities.length; i++){
        var historyCard= $("<button>")
        historyCard.text(savedCities[i].nameCity)
        historyCard.attr("data-lat",`${savedCities[i].lat}`)
        historyCard.attr("data-lon",`${savedCities[i].lon}`)
        var historyDiv= $("<div>")

        historyDiv.append(historyCard)
        cityHistory.append(historyDiv)
    }
}

let searchBtn =$("#submit-btn")
searchBtn.on("click", function(event){
    event.preventDefault()
    let cityInputVal=cityInput.val()
    if(cityInputVal== ""){
        alert("Please enter a value to search for.");
        return;
    }else{
        getlocation()
    }
})   

savedCities = JSON.parse(localStorage.getItem("savedCities"));
if(savedCities== null){
    savedCities=[];
    }
searchHistory()