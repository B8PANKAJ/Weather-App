const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const APIKey = "377eaa10c3872a24ce5a8cc9581026f4";
search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src =
            "images/clear.pnghttps://cdn-icons-png.flaticon.com/128/2570/2570483.png";
          break;

        case "Rain":
          image.src = "https://cdn-icons-png.flaticon.com/128/2864/2864448.png";
          break;

        case "Snow":
          image.src = "https://cdn-icons-png.flaticon.com/128/2942/2942909.png";
          break;

        case "Clouds":
          image.src = "https://cdn-icons-png.flaticon.com/128/9421/9421117.png";
          break;

        case "Haze":
          image.src = "https://cdn-icons-png.flaticon.com/128/1585/1585460.png";
          break;

        case "Smoke":
          image.src = "https://cdn-icons-png.flaticon.com/128/7407/7407787.png";
          break;

        default:
          image.src = "images/404.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
