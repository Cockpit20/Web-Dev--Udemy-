const express=require("express");
const app=express();

app.get("/",function(req,res){
    res.send("<h1>Hello</h1>");
});

app.get("/contact",function(req,res){
    res.send("Contact me at chandra@gmail.com");
});

app.get("/about",function(req,res){
    res.send("Hey, I am Soumyadeep Chandra. I am an aspiring Web Development Engineer. I love trading and investing in Real Estate and Stock Market");
});

app.get("/services",function(req,res){
    res.send("We provide all kind of services from building to hosting a website");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});