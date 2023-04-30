const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/bmicalculator', (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;

    res.send("The result of Calculator is : " + result);
});

app.post('/bmicalculator', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var resultBMI = Math.round(weight / (height**2));

    if(resultBMI < 18.5){
        res.send("The result of the BMI calculation is : " + resultBMI + ", You Are Underweight");
    } else if(resultBMI >= 18.5 && resultBMI <= 24.9){
        res.send("The result of the BMI calculation is : " + resultBMI + ", You Are Have Ideal Weight");
    } else if(resultBMI > 24.9 && resultBMI < 30){
        res.send("The result of the BMI calculation is : " + resultBMI + ", You Are Overweight");
    } else {
        res.send("The result of the BMI calculation is : " + resultBMI + ", You Are Obesity");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});