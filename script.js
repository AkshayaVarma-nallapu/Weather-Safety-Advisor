const apiKey = "b9a74bc99a01b6e87027b960c12a8547"; // Replace with your OpenWeatherMap API key

document.getElementById("weatherForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const location = document.getElementById("location").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const avgTemp = ((tempMin + tempMax) / 2).toFixed(2);
      const weather = data.weather[0].main;

      const precautions = getPrecautions(weather, avgTemp);
      document.getElementById("result").innerHTML = `
        <p>🌡️ Temperature: ${avgTemp}°C (Avg)</p>
        <p>⛅ Weather: ${weather}</p>
        <p>🛡️ Precaution: ${precautions}</p>
      `;
    } else {
      document.getElementById("result").textContent = "Location not found. Try again.";
    }
  } catch (error) {
    document.getElementById("result").textContent = "Error fetching weather data.";
  }
});

function getPrecautions(weather, temp) {
  temp = parseFloat(temp); // Convert to number for comparison

  if (weather === "Rain") {
    return "Carry an umbrella and wear waterproof shoes.";
  }

  if (weather === "Clear") {
    if (temp > 35) return "It's very hot. Wear a cap, sunscreen, and drink lots of water.";
    if (temp > 25) return "Pleasant weather. Light clothing is enough.";
    return "Sunny but mild. A hat might help.";
  }

  if (weather === "Clouds") {
    if (temp < 20) return "It's cloudy and cool. Carry a light jacket.";
    if (temp > 30) return "It's warm despite the clouds. No jacket needed.";
    return "Cloudy weather. Be ready in case it rains.";
  }

  if (weather === "Snow") return "Wear warm clothes and be careful of slippery roads.";
  if (weather === "Thunderstorm") return "Avoid going outside. Stay indoors.";

  return "No special precautions. Enjoy your day!";
}
