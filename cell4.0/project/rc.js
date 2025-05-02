
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeColors() {
    document.body.style.backgroundColor = getRandomColor();
    document.getElementById("navi").style.backgroundColor = getRandomColor();
}

setInterval(changeColors, 2000);
