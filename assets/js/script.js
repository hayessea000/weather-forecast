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
            // makes the todays weather
            let todaysWeather= data
            let todayWeatherBox = $("#todayWeather")
            todayWeatherBox.html("")
            let todayWeatherBoxHeader = $("<div>")
            todayWeatherBoxHeader.attr("class", "row")
            let todayWeatherBoxCity = $("<h2>")
            todayWeatherBoxCity.text(`${todaysWeather.name} (${today})`)
            let todayWeatherBoxImage = $("<img>")
            todayWeatherBoxImage.attr("id", "bigguy")
            todayWeatherBoxImage.attr("src", `https://openweathermap.org/img/wn/${todaysWeather.weather[0].icon}.png`)
            todayWeatherBoxImage.attr("alt", `${todaysWeather.weather[0].description}`)
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
            // makes the forecast weather
            let forecastWeather= data
            console.log(forecastWeather)
            let forecastWeatherBox = $("#forecast")
            forecastWeatherBox.html("")
            for(let i=3; i<40; i=i+8){
                console.log(i)
                let forecastWeatherCard = $("<div>")
                forecastWeatherCard.attr("class", "forecast-card")
                let forecastWeatherDate = $("<h4>")
                forecastWeatherDate.attr("class", "text-light")
                let forecastDate= dayjs(forecastWeather.list[i].dt_txt).format("M/D/YYYY")
                forecastWeatherDate.text(forecastDate)
                let forecastWeatherImage =$("<img>")
                forecastWeatherImage.attr("src", `https://openweathermap.org/img/wn/${forecastWeather.list[i].weather[0].icon}.png`)
                forecastWeatherImage.attr("alt", `${forecastWeather.list[i].weather[0].description}`)
                let forecastWeatherTemp =$("<p>")
                forecastWeatherTemp.attr("class", "text-light")
                forecastWeatherTemp.text(`Temp: ${forecastWeather.list[i].main.temp} °F`)
                let forecastWeatherWind =$("<p>")
                forecastWeatherWind.attr("class", "text-light")
                forecastWeatherWind.text(`Wind: ${forecastWeather.list[i].wind.speed} MPH`)
                let forecastWeatherHumidity =$("<p>")
                forecastWeatherHumidity.attr("class", "text-light")
                forecastWeatherHumidity.text(`Humidity: ${forecastWeather.list[i].main.humidity} %`)
                forecastWeatherCard.append(forecastWeatherDate)
                forecastWeatherCard.append(forecastWeatherImage)
                forecastWeatherCard.append(forecastWeatherTemp)
                forecastWeatherCard.append(forecastWeatherWind)
                forecastWeatherCard.append(forecastWeatherHumidity)
                forecastWeatherBox.append(forecastWeatherCard)
            }
            
            
            

        })    
}

let searchHistory= function(){
    var cityHistory= $("#savedCities")
    cityHistory.html("")
    for (let i=0; i<savedCities.length; i++){
        var historyCard= $("<button>")
        historyCard.text(savedCities[i].nameCity)
        historyCard.attr("class","historyBtn")
        historyCard.attr("data-lat",`${savedCities[i].lat}`)
        historyCard.attr("data-lon",`${savedCities[i].lon}`)
        var historyDiv= $("<div>")
        historyDiv.append(historyCard)
        cityHistory.append(historyDiv)
    }
    let historySearch= $(".historyBtn")
    historySearch.on("click", function(event){
        cityLat = event.target.getAttribute("data-lat")
        console.log(cityLat)
        cityLon = event.target.getAttribute("data-lon")
        console.log(cityLon)
        getWeather()
        
    }) 
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