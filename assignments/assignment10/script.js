class Toy {
  constructor(imagePath, name, price, ageRange, rating) {
    this.imagePath = imagePath;
    this.name = name;
    this.price = price;
    this.ageRange = ageRange;
    this.rating = rating;
  }

  get item() {
    return `${this.name} Price: $${this.price}, Age Range: ${this.ageRange}, Rating: ${this.rating}`;
  }
}

const toys = [
  new Toy('images/car.jpg', 'Sport Car', 8.99, '5-8', '4 stars'),
  new Toy('images/doll.jpg', 'Pink Doll', 20.99, '5-6', '4 stars'),
  new Toy('images/robot.jpg', 'Red Robot', 35.99, '5-8', '2 stars'),
  new Toy('images/bike.jpg', 'Bike', 24.99, '4-9', '3 stars'),
  new Toy('images/ball.jpg', 'Soccer Ball', 13.99, '2-5', '3 stars'),
  new Toy('images/scooter.jpeg', 'Razer', 22.99, '6-10', '4 stars'),
];

function displayToys() {
  const toyContainer = document.getElementById('toy-container');

  toys.forEach((toy) => {
    const toyItem = document.createElement('div');
    toyItem.classList.add('toy-item');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('container');

    const image = document.createElement('img');
    image.src = toy.imagePath;
    image.classList.add('image');

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const details = document.createElement('p');

    const nameElement = document.createElement('h3');
    const priceElement = document.createElement('p');
    const ageRangeElement = document.createElement('p');
    const ratingElement = document.createElement('p');
    details.classList.add('text');

    nameElement.innerHTML = toy.name;
    priceElement.innerHTML = `Price: $${toy.price}`;
    ageRangeElement.innerHTML = `Age Range: ${toy.ageRange}`;
    ratingElement.innerHTML = `Rating: ${toy.rating}`;

    details.append(nameElement, priceElement, ageRangeElement, ratingElement);
    overlay.append(details);
    imageContainer.append(image, overlay);
    toyItem.append(imageContainer);
    toyContainer.append(toyItem);

    imageContainer.addEventListener('mouseover', () => {
      overlay.style.opacity = 1;
    });

    imageContainer.addEventListener('mouseout', () => {
      overlay.style.opacity = 0;
    });
  });
}

window.onload = () => {
  displayToys();
};
