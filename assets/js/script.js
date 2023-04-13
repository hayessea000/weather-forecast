let cityName 
let cityLat 
let cityLon 

let getlocation = function () { 
    let cityInput = $("#searchinput")
    let apiUrlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.val()}&appid=87c519cf4ba544282595e47fb0dc2455`
    fetch(apiUrlLoc)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            console.log(data)
            cityName = data[0].name
            cityLat = data[0].lat
            cityLon = data[0].lon
            console.log(cityLat)
            console.log(cityLon)
            console.log(cityName)
            getWeather()
        })
}

let getWeather = function (){
    let apiUrlWeather= `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=87c519cf4ba544282595e47fb0dc2455&units=imperial`
    fetch(apiUrlWeather)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            console.log(data)
        })
}

let searchBtn =$("#submit-btn")
searchBtn.on("click", function(event){
    event.preventDefault()
    getlocation()
})   