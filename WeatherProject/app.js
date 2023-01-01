const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const query=req.body.cityName;
    const APIKey="6817ebbcc96313ec5c55ec62cc29e1e1";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+APIKey;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius</h1>");
            res.write("<h2>The weather is currenty "+desc+"</h2>");
            res.write("<img src="+imageURL+">");
            res.send();
        });
    })
})


app.listen(3000,()=>{
    console.log("Server started on port 3000...");
})