const showGhost = () => {
    document.getElementById("ghost").classList.remove("hide");
}

const hideGhost = () => {
    document.getElementById("ghost").classList.add("hide"); 
}

const makeMove = () => {
    document.getElementById("emoji").classList.add("moving");
}


window.onload = () => {
    document.getElementById("button-show").onclick = showGhost;
    document.getElementById("button-hide").onclick = hideGhost;
    document.getElementById("button-move").onclick = makeMove;
}
