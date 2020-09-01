// 40961afd2ab5d2926debb895b0f079e9 - API keys


var cityName = "Austin";


function searchCityWeather(cityName) {

    $.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=40961afd2ab5d2926debb895b0f079e9", function (todaysData) {
        // console.log(todaysData);
        var lat = todaysData.coord.lat;
        var lon = todaysData.coord.lon;

        $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=40961afd2ab5d2926debb895b0f079e9`, function (forecastData) {
            // update our todays forecast Card with current data
            console.log(forecastData);
            var humidity = forecastData.current.humidity;
            var temp = forecastData.current.temp;
            var now = moment().format("MM/DD/YYYY");
            $("#now-date").append(now);

            // clearWeather();


            // print to the dom/html all the forecast data

            $("#now-date").text(" \" " + cityName.toUpperCase()+ " \" " + now);
            $("#current-temp").text("Temperature: " + temp + "F");
            $("#current-humidity").text("Humidity: " + humidity + "%");

            var iconToday = forecastData.daily[0].weather[0].icon;
            var iconTodayUrl = "http://openweathermap.org/img/wn/" + iconToday + ".png";
            var uvIndex = forecastData.daily[0].uvi;

            $("#now-date").append("<img src=" + iconTodayUrl + ">");
            $("#now-date").append("<p id=uv>" + "UV Index: " + uvIndex + "</p>");

            // API provide 7days. I need 5days, so using for loop for 5days
            for (let i = 1; i < 6; i++) {
                var tomorrowUnix = forecastData.daily[i].dt
                var p = $("<p id=fiveDayDate>" + moment.unix(tomorrowUnix).format("MM/DD") + "</p>")
                var _5dayTemp = forecastData.daily[i].temp.day
                var _5dayHumidity = forecastData.daily[i].humidity
                var icon = forecastData.daily[i].weather[0].icon;
                console.log(icon);
                var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";

                // create date
                $("#" + i).append(p);
                // create img
                $("#" + i).append("<img src=" + iconUrl + ">");
                // create temp
                $("#" + i).append("<p id=fiveDayTemp>" + _5dayTemp + "F </p>")
                // creaate humidity
                $("#" + i).append("<p id=fiveDayHumidity>" + _5dayHumidity + "%</p>")

            }
        })
    });
}

function clearWeather() {
    $("#now-date").empty();
    $("#current-temp").empty();
    $("#current-humidity").empty();
    $("#fiveDayTemp").empty();
    $("#fiveDayHumidity").empty();
    $("#fiveDayDate").empty();
    $("#uv").empty();
    $(".day").empty();
}


// show the history
$("#searchBtn").on("click", function () {
    event.preventDefault();
    clearWeather();
    cityName = $("#cityName").val().trim();
    console.log(cityName)
    searchCityWeather(cityName);
    localStorage.setItem("searchedHistory",cityName);
    $("#sList").prepend("<p>" + cityName.toUpperCase() + "</p>");

})


