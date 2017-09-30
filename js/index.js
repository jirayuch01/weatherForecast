function getFormattedDate() {
  var hours = new Date().getHours();
  var hours = (hours + 24 - 2) % 24;
  var mid = 'am';
  if (hours == 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours % 12;
    mid = 'pm';
  }
  // alert('Toronto time: ' + hours + mid);

  var date = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  var nowDay = weekday[date.getDay()];
  var nowMonth = month[date.getMonth()];

  var str = nowDay + " "
    + date.getDate() + " "
    + nowMonth + " "
    + date.getFullYear() + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "
    + " <span><img src='images/icon-time.png'> " +
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds() + " " + mid + "</span>";
  return str;
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

window.onload = function () {
  var strDateTime1 = getFormattedDate();
  document.getElementById("Console").innerHTML = 
      "<p style='color: white'><span><img src='images/icon-date.png'> " + strDateTime1 + "</span><p>";
};

$(document).ready(function () {
  var lat = 0;
  var lon = 0;
  var suffix = "°C"
  var inputCity;
  var mode = "coords";
  var datetime = "";
  var dateCount = 0;
  var dateElement = "";
  var forecastDayTemp = 0;
  var forecastDayCount = 0;
  var APIKEY = "a5f643711b1b904eb04e440232b395b8";
  var URL = "http://api.openweathermap.org/data/2.5/weather?";
  var imgsrc = "http://openweathermap.org/img/w/"
  var data;

  function getWeather(input, mode) {
    var xhr = new XMLHttpRequest();
    var forecast = new XMLHttpRequest();
    if (mode == "city") {
      xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=metric&APPID=" + APIKEY, false);
      xhr.send();
      forecast.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=metric&APPID=" + APIKEY, false);
      forecast.send();
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=metric&APPID=" + APIKEY,
        dataType: "jsonp",
        statusCode: {
          404: function () {
            alert('Can not find, please search again!!!');
            // var row = '<div class="container">';
            // row += '<div class="alert alert-danger">';
            // row += '<strong>Danger!</strong> You should <a href="#" class="alert-link">read this message</a>.';
            // row += '</div>';
            // row += '</div>';
            // $("#data2").append(row);
          }
        }
      });
    } else if (mode == "coords") {
      xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + input[0] + "&lon=" + input[1] + "&units=metric&APPID=" + APIKEY, false);
      xhr.send();
      forecast.open("GET", "http://api.openweathermap.org/data/2.5/forecast?lat=" + input[0] + "&lon=" + input[1] + "&units=metric&APPID=" + APIKEY, false);
      forecast.send();
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + input[0] + "&lon=" + input[1] + "&units=metric&APPID=" + APIKEY,
        dataType: "jsonp",
        statusCode: {
          404: function () {
            alert('Can not find, please search again!!!1');
            // var row = '<div class="container">';
            // row += '<div class="alert alert-danger">';
            // row += '<strong>Danger!</strong> You should <a href="#" class="alert-link">read this message</a>.';
            // row += '</div>';
            // row += '</div>';
            // $("#data2").append(row);
          }
        }
      });
    }
    data = JSON.parse(xhr.response);
    updateDisplay(data);
    updateForecast(JSON.parse(forecast.response));
  }

  function updateDisplay(city) {
    var html = "";
    $("#location").text(city.name);
    $("#curr-temp").text(Math.floor(city.main.temp) + suffix);
    $("#curr-description").text(city.weather[0].description);
    if (city.weather[0].description == "clear sky") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/clear_sky.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "few clouds") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/few_clouds.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "scattered clouds") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/scattered_clouds.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "broken clouds") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/broken_clouds.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "moderate rain") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/moderate_rain.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/rain_start.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "shower rain") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/shower_rain.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/water-rain2.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "rain") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/rain.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/water-rain2.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "thunderstorm") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/thunderstorm.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/storm-thunder.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "snow") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/snow.gif';
    } else if (city.weather[0].description == "mist") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/mist.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "light rain") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/rain.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/water-rain2.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else if (city.weather[0].description == "thunderstorm with light rain") {
      var img = new Image();
      img.onload = function () {
        // $('body').css({'background':'#000'});
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/thunderstorm_with_light_rain.gif';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/thunder.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    } else {
      var img = new Image();
      img.onload = function () {
        $('.hero').css({
          'background-image': 'url("' + img.src + '")'
        });
      };
      img.src = 'images/weather-banner.jpg';
      var row = "<audio controls autoplay loop style='display:none;'><source src='sound/clouds.mp3' type='audio/mpeg'></audio>";
      $("#data").append(row);
    }
    console.log(city.weather[0].description);
    $("#curr-humidity").text(city.main.humidity + " %");
    $("#curr-pressure").text(city.main.pressure + " hPa");
    $("#curr-speed").text(city.wind.speed + " km/h");
    html += imgsrc + city.weather[0].icon + ".png";
    document.getElementById("curr-icon").src = html;
  }

  function updateForecast(days) {
    datetime = 0;
    dateCount = 0;
    var iconHTML = ""
    for (var i = 0; i < days.list.length; i++) {
      if (days.list[i].dt_txt.slice(0, 10) != datetime) {
        forecastDayTemp = 0;
        forecastDayCount = 0;
        dateCount++;
        datetime = days.list[i].dt_txt.slice(0, 10);
        dateElement = "#day" + dateCount + "-date";
        $(dateElement).text(getDay(datetime));
        for (var j = 0; j < days.list.length; j++) {
          if (datetime == days.list[j].dt_txt.slice(0, 10)) {
            forecastDayTemp += days.list[j].main.temp;
            forecastDayCount++;
          }
        }
        forecastDayTemp = Math.floor(forecastDayTemp / forecastDayCount);
        $("#day" + dateCount + "-temp").text(forecastDayTemp + suffix);
        $("#day" + dateCount + "-description").text(days.list[i].weather[0].description);
        iconHTML = imgsrc + days.list[i].weather[0].icon + ".png";
        document.getElementById("day" + dateCount + "-icon").src = iconHTML;
      }
    }
  }

  function getDay(dateString) {
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return week[new Date(dateString).getDay()];
  }

  function getTempFormat(input, degree) {
    if (degree == "°F") {
      return Math.ceil((input * 1.8) + 32);
    }
    if (degree == "°C") {
      return Math.floor((input - 32) * (5.0 / 9.0));
    }
  }

  $("#cel").css("font-weight", "bold");

  $("#temp-control").click(function () {
    var temp;
    if (suffix == "°C") {
      suffix = "°F";
      $("#cel").css("font-weight", "normal");
      $("#far").css("font-weight", "bold");
    } else if (suffix == "°F") {
      suffix = "°C";
      $("#cel").css("font-weight", "bold");
      $("#far").css("font-weight", "normal");
    }
    temp = getTempFormat($("#curr-temp").text().split("°")[0], suffix);
    $("#curr-temp").text(temp + suffix);
    for (dateCount = 1; dateCount < 6; dateCount++) {
      temp = getTempFormat($("#day" + dateCount + "-temp").text().split("°")[0], suffix);
      $("#day" + dateCount + "-temp").text(temp + suffix);
    }

  })

  $("#search-btn").click(function () {
    mode = "city";
    inputCity = document.getElementById("city-input").value;
    getWeather(inputCity, mode);
  })

  getWeather("Phuket , Thailand", "city");
});