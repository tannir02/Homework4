const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');

const express = require('express');
const app = express();
const port = 8002;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const https = require('https');

const apiKey = 'YOUR_API_KEY';
const city = 'London';

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

https.get(url, (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', (d) => {
    const weatherData = JSON.parse(d);
    if (res.statusCode === 200) {
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(`Temperature: ${temperature} K`);
      console.log(`Description: ${description}`);
    } else {
      console.log(`Error: ${weatherData.message}`);
    }
  });
}).on('error', (e) => {
  console.error(e);
});