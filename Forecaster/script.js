mapboxgl.accessToken = 'pk.eyJ1IjoiYmxha2V0bSIsImEiOiJjbGtld2JqdG4xY3pwM29vMHZ5MGs2dWVtIn0.7wH6VSxnv2VKef8Qcu9Zzg';

const geocodingApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const weatherApiAccessKey = '8c94c40e2c1f46d38d9230227230707';

function handleLocationSearch() {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value.trim();
  if (location !== '') {
    const geocodingUrl = `${geocodingApiUrl}${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const suggestions = data.features.slice(0, 5);
          displayLocationSuggestions(suggestions);
        } else {
          clearLocationSuggestions();
        }
      })
      .catch(error => {
        clearLocationSuggestions();
      });
  } else {
    clearLocationSuggestions();
  }
}

function displayLocationSuggestions(suggestions) {
  const locationSuggestions = document.getElementById('location-suggestions');
  locationSuggestions.innerHTML = '';

  suggestions.forEach(suggestion => {
    const suggestionText = suggestion.place_name;
    const suggestionElement = document.createElement('div');
    suggestionElement.classList.add('suggestion');
    suggestionElement.textContent = suggestionText;

    suggestionElement.addEventListener('click', () => {
      document.getElementById('location-input').value = suggestionText;
      clearLocationSuggestions();
    });

    locationSuggestions.appendChild(suggestionElement);
  });

  locationSuggestions.style.display = 'block';
}

function clearLocationSuggestions() {
  const locationSuggestions = document.getElementById('location-suggestions');
  locationSuggestions.innerHTML = '';
  locationSuggestions.style.display = 'none';
}

function handleTabKeyPress(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    const firstSuggestion = document.querySelector('.suggestion');
    if (firstSuggestion) {
      const suggestionText = firstSuggestion.textContent;
      document.getElementById('location-input').value = suggestionText;
      clearLocationSuggestions();
    }
  }
}

function getWeatherData(q) {
  const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiAccessKey}&q=${q}`;

  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherCard = document.getElementById('weather-card');
      if (data.current) {
        const tempCelsius = data.current.temp_c;
        const tempFahrenheit = data.current.temp_f;
        const feelsLikeF = data.current.feelslike_f;
        const feelsLikeC = data.current.feelslike_c
        const windKph = data.current.wind_kph;
        const windMph = data.current.wind_mph;
        const windDir = data.current.wind_dir;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;

        weatherCard.innerHTML = `
          <h2>${data.location.name}, ${data.location.country}</h2>
          <p>${condition}</p>
          <p>Temperature: ${tempCelsius}°C / ${tempFahrenheit}°F</p>
          <p>Feels like: ${feelsLikeC}°C / ${feelsLikeF}°F</p>
          <p>Wind Speed: ${windKph} km/h / ${windMph} mph</p>
          <p>Wind Direction: ${windDir}</p>
          <img src="${icon}" alt="Weather Icon">
        `;
      } else {
        weatherCard.innerHTML = `<h2>Weather data not available</h2>`;
      }
    })
    .catch(error => {
      const weatherCard = document.getElementById('weather-card');
      weatherCard.innerHTML = `<h2>Error fetching weather data</h2>`;
    });
}

function handleLocationSearchTyping() {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value.trim();
  if (location !== '') {
    const geocodingUrl = `${geocodingApiUrl}${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const suggestions = data.features.slice(0, 5);
          displayLocationSuggestions(suggestions);
        } else {
          clearLocationSuggestions();
        }
      })
      .catch(error => {
        clearLocationSuggestions();
      });
  } else {
    clearLocationSuggestions();
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

document.getElementById('location-input').addEventListener('input', handleLocationSearchTyping);
document.getElementById('location-input').addEventListener('keydown', handleTabKeyPress);
document.getElementById('get-weather-btn').addEventListener('click', () => {
  const locationInput = document.getElementById('location-input');
  const location = locationInput.value.trim();
  if (location !== '') {
    const geocodingUrl = `${geocodingApiUrl}${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const content = locationInput.value;
          getWeatherData(content);
        } else {
          const weatherCard = document.getElementById('weather-card');
          weatherCard.innerHTML = `<h2>Location not found</h2>`;
        }
      })
      .catch(error => {
        const weatherCard = document.getElementById('weather-card');
        weatherCard.innerHTML = `<h2>Error fetching location data</h2>`;
      });
  }
});

document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
