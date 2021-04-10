//Global
let units = "metric";
let tempUnit = "°C";

// Background colors
const clearSky = "linear-gradient(#cf961b, #cccf1b)";
const fewClouds = "linear-gradient(#dad7d1, #cfcc1b)";
const scatteredClouds = "linear-gradient(#dad7d1, #cfcc1b)";

//DOM Event Listeners
document.querySelector(".city-container button").addEventListener("click", function () {
    weather.search();
  });

document.querySelector(".city-search").addEventListener("keyup", function(event){
    if(event.key == 'Enter'){
        weather.search();
    }
});

// unit selector and toggle button
document.querySelector(".units").addEventListener("click", function (event){
    if(event.target !== event.currentTarget){
        if(event.target.value === "C"){
            units = "metric";
            tempUnit = "°C";
            // toggle button
            if(event.target.classList == "inactive"){
                event.target.classList = "active";
                document.querySelector("#fahrenheit").classList = "inactive";
            }else if(event.classList == "active"){
                event.target.classList = "inactive";
            }
        }else if(event.target.value === "F"){
            units = "imperial";
            tempUnit = "°F";
            if(event.target.classList == "inactive"){
                event.target.classList = "active";
                document.querySelector("#celsius").classList = "inactive";
            }else if(event.classList == "active"){
                event.target.classList = "inactive";
            }
        }
    }
});

//Object
let weather = {
    "apiKey": "bc249ccdaa0d36d96488f428749b2e38",
    fetchWeather: function(cityName){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${this.apiKey}`
        ).then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".location-timezone").innerText = name;
        document.querySelector(".temperature-degree").innerText = temp;
        document.querySelector(".temperature-unit").innerText = tempUnit;  // celsius or Fahrenheit
        document.querySelector(".temperature-description").innerText = description;
        document.querySelector(".weather-icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        // this.displayIconAndBackgroundColorByWeather(description);
        // document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".city-search").value);
      },
    // displayIconAndBackgroundColorByWeather: function(weatherDescription){
    //     if(weatherDescription === "clear sky"){
    //         document.querySelector("body").style.background = clearSky;
    //         document.querySelector(".weather-icon").src = `./icon/clearSky.png`;
    //     }else if(weatherDescription === "few clouds"){
    //         document.querySelector("body").style.background = fewClouds;
    //         document.querySelector(".weather-icon").src = `./icon/fewClouds.png`;
    //     }else if(weatherDescription === "scattered clouds"){
    //         document.querySelector("body").style.background = scatteredClouds;
    //         document.querySelector(".weather-icon").src = `./icon/scatteredClouds.png`;
    //     }else if(weatherDescription === "broken clouds"){
    //         document.querySelector("body").style.background = scatteredClouds;
    //         document.querySelector(".weather-icon").src = `./icon/scatteredClouds.png`;
    //     }else if(weatherDescription === "shower rain"){
    //         document.querySelector("body").style.background = scatteredClouds;
    //         document.querySelector(".weather-icon").src = `./icon/showerRain.png`;
    //     }
    // },
};

// weather.fetchWeather("Split");
