const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/city", (req, res) => {
const city = [];

city[0] = {
    name: "Paris",
    country: "France",
    population: 2,
    food: ["Croissant", "Macarons", "Baguette"],
    img: "image/paris.jpg" 
};

city[1] = {
    name: "Tokyo",
    country: "Japan",
    population: 2,
    food: ["Ramen", "Sushi", "Udon"],
    img: "image/tokyo.jpg"  
};

city[2] = {
    name: "Rome",
    country: "Italy",
    population: 2,
    food: ["Pasta", "Pizza", "Gelato"],
    Image: "image/rome.jpg"
    
};

city[3] = {
    name: "New York",
    country: "United States",
    population: 2,
    food: ["Hot Dog", "Bagel", "Pizza"],
    img: "image/new york.jpg"
};

city[4] = {
    name: "Sydney",
    country: "Australia",
    population: 2,
    food: ["Meat Pie", "Pavlova", "Vegemite"],
    img: "image/sydney.jpg"  
};

res.json(city);
});

app.listen(3000, () => {
    console.log("listening");
});