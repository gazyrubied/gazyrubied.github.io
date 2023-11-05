const showCity = async () => {
    const response = await fetch("/api/city"); 
    const cityJSON = await response.json();

    let cityListDiv = document.getElementById("city-list");

    cityJSON.forEach(city => {
        const cityDiv = document.createElement("div");

        const h3 = document.createElement("h3");
        h3.innerHTML = city.name;
        cityDiv.appendChild(h3);

        const img = document.createElement("img");
        img.src = "http://localhost:3000/" + city.img
        cityDiv.appendChild(img);

        const cityInfo = document.createElement("ul");
        cityInfo.classList.add("city-info");

        const countryItem = document.createElement("li");
        countryItem.textContent = `Country: ${city.country}`;
        cityInfo.appendChild(countryItem);

        const populationItem = document.createElement("li");
        populationItem.textContent = `Population: ${city.population}`;
        cityInfo.appendChild(populationItem);

        const foodItem = document.createElement("li");
        foodItem.textContent = `Famous Food: ${city.food.join(", ")}`;
        cityInfo.appendChild(foodItem);

        cityDiv.appendChild(cityInfo);

        cityListDiv.appendChild(cityDiv);
    });
};

const getCity = async () => {
    try {
        return (await fetch("http://localhost:3000/api/city")).json();
    } catch (error) {
        console.log("error");
        return "";
    }
};

window.onload = () => {
    showCity();
};