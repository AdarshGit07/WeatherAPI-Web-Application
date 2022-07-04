const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.set('view engine', 'ejs');

//user on the home page//
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "8ccbd67baed136f4626a8f88427e7931";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    // console.log(response.statusCode);//200 =>everything works fine

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);//to get data in js object form
      //console log weather Data to get clear idea//
      console.log(weatherData);
      const tem = weatherData.main.temp;  //inside main object//
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const humidity = weatherData.main.humidity;
      const desc = weatherData.weather[0].description;
      res.render("weather",{cityName:query,desc:desc,humidity:humidity,icon:icon,tem:tem})
      // res.write("<h1>It feels like " + desc + " here.</h1> ");
      // res.write("<h1>The temperature in " + query + " is " + tem + " degrees Celcius.</h1>")
      // res.write("<img src=" + imageUrl + ">");
      // res.send();
    });
  });


});


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
