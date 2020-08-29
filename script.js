// 40961afd2ab5d2926debb895b0f079e9 - API keys


var cityName = "Austin";

$.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=40961afd2ab5d2926debb895b0f079e9",function(todaysData){
    console.log(todaysData);
    var lat = todaysData.coord.lat;
    var lon = todaysData.coord.lon;

    $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=40961afd2ab5d2926debb895b0f079e9`,function(forecastData){
          // update our todays forecast Card with current data
            var todayForecast = $(".forecastToday")
            .val()
            .trim();
            console.log("todayForecast");
          // print to the dom/html all the forecast data


          for (let i = 1; i < 6; i++) {
            var tomorrowUnix = forecastData.daily[i].dt
            var p = $("<p>" + moment.unix(tomorrowUnix).format("MM/DD/YYYY") + "</p>")
            $("#resInfo").append(p);
          }
    })
})


// var cityName = "Raleigh";
// $.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=??????????",function(todaysData){
//     console.log(todaysData);
//     var lat = todaysData.coord.lat;
//     var lon = todaysData.coord.lon;
//     $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=???????????`,function(forecastData){
//           // update our todays forecast Card with current data
//           // print to the dom/html all the forecast data
//           for (let i = 1; i < 6; i++) {
//             var tomorrowUnix = forecastData.daily[i].dt
//             var p = $("<p>" + moment.unix(tomorrowUnix).format("MM/DD/YYYY") + "</p>")
//             $("#resInfo").append(p);
//           }
//     })
// })