// 40961afd2ab5d2926debb895b0f079e9 - API keys


var cityName = "Austin";
function searchCityWeather (cityName){

$.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=40961afd2ab5d2926debb895b0f079e9",function(todaysData){
    console.log(todaysData);
    var lat = todaysData.coord.lat;
    var lon = todaysData.coord.lon;

    $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=40961afd2ab5d2926debb895b0f079e9`,function(forecastData){
        console.log(forecastData);
          // update our todays forecast Card with current data
        var humidity = forecastData.current.humidity;
        var temp = forecastData.current.temp;
        clearWeather();
          // print to the dom/html all the forecast data
        $("#current-temp").text("Temperature: " + temp + "F");
        $("#current-humidity").text("Humidity: " + humidity + "%");

          for (let i = 1; i < 6; i++) {
            var tomorrowUnix = forecastData.daily[i].dt
            var p = $("<p id=fiveDayDate>" + moment.unix(tomorrowUnix).format("MM/DD/YYYY") + "</p>")
            var _5dayTemp = forecastData.daily[i].temp.day
            var _5dayHumidity = forecastData.daily[i].humidity

            $("#"+i).append(p);
            $("#"+i).append("<p id=fiveDayTemp>"+ _5dayTemp +"</p>")
            $("#"+i).append("<p id=fiveDayHumidity>"+ _5dayHumidity +"</p>")

          }
    })
});
}

function clearWeather(){
    $("#current-temp").empty();
    $("#current-humidity").empty();
    $("#fiveDayTemp").empty();
    $("#fiveDayHumidity").empty();
    $("#fiveDayDate").empty();

}


$("#searchBtn").on("click", function(){
    event.preventDefault();

    cityName = $("#cityName").val().trim();
    console.log(cityName)
    searchCityWeather(cityName);
})