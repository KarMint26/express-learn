const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5100;

app.use(bodyParser.urlencoded({ extended: true }));

const https = require('https');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post('/', (req,res) => {
    let city = req.body.city;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=beb55617e519a87943bcca8511980f34&units=metric";
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const city = weatherData.name;
            const temp = Math.round(weatherData.main.temp);
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<p>The temperature in " + city + " is " + temp + " degrees Celcius</p>");
            res.write("<h1>The weather in " + city + " is " + weatherDescription + "</h1>");
            res.write("<img style='width: 12rem;' src='" + imageUrl + "'>");

            res.send();
        });
    });
})

app.listen(port, () => {
    console.log("Server is running on http://localhost:5100");
});