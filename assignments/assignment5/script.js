const showGhost = () => {
    document.getElementById("ghost").classList.remove("hide");
}

const hideGhost = () => {
    document.getElementById("ghost").classList.add("hide"); 
}

const makeMove = () => {
    document.getElementById("emoji").classList.add("moving");
}
const addComment = () => {
    const product = document.getElementById("product").value;
    const comment = document.getElementById("comment").value;
    const rate = document.getElementById("rate").value;
    const username = document.getElementById("username").value;

    // Create a formatted message
    const message = `Product Name: ${product}\nComment: ${comment}\nRating: ${rate}\nUser Name: ${username}`;


window.onload = () => {
    document.getElementById("button-show").onclick = showGhost;
    document.getElementById("button-hide").onclick = hideGhost;
    document.getElementById("button-move").onclick = makeMove;
}
