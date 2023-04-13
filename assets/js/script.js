

var getlocation = function () { 
    let cityInput = $("#searchinput")
    var apiUrlLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.val()}&limit=5&appid=87c519cf4ba544282595e47fb0dc2455`
    console.log(apiUrlLoc)
}

var searchBtn =$("#submit-btn")
searchBtn.on("click", function(event){
    event.preventDefault()
    getlocation()
})   
//     if(type == "s"){
//         apiUrl = apiUrl + "search.php?"
//     } else {
//         apiUrl = apiUrl + "filter.php?"
//     }
//     apiUrl = apiUrl + type + "=" + searchParam[1] 
//     console.log(apiUrl)

//     fetch(apiUrl)
//         .then (function (response) {
//             return response.json();
//         })
//         .then (function (data){
//             mealArr = data.meals
//             console.log(mealArr)
//             generateCards();
//         })
// }


// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}