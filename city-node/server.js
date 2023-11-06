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
    population: "2.162 million",
    food: ["Croissant", "Macarons", "Baguette"],
    language: "French",
    img: "image/paris.jpg" 
};

city[1] = {
    name: "Tokyo",
    country: "Japan",
    population: "13.96 million",
    food: ["Ramen", "Sushi", "Udon"],
    language: "Japanese",
    img: "image/tokyo.jpg"  
};

city[2] = {
    name: "Rome",
    country: "Italy",
    population: "2.873 million",
    food: ["Pasta", "Pizza", "Gelato"],
    language: "Italian",
    img: "image/rome.jpg"
    
};

city[3] = {
    name: "New York",
    country: "United States",
    population: "8.468 million",
    food: ["Hot Dog", "Bagel", "Pizza"],
    language: "English",
    img: "image/new york.jpg"
};

city[4] = {
    name: "Sydney",
    country: "Australia",
    population: "5.13 million",
    food: ["Meat Pie", "Pavlova", "Vegemite"],
    language: "English",
    img: "image/sydney.jpg"  
};

res.json(city);
});

app.listen(3000, () => {
    console.log("listening");
});