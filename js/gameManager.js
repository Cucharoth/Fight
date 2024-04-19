function addPowerUp() {
    var idColiseum = "coliseum"
    const coliseum = document.getElementById(idColiseum);
    const heightColiseum = coliseum.offsetHeight;
    const widthColiseum = coliseum.offsetWidth;
    const powerUp = document.createElement("div");
    powerUp.setAttribute("class", "power-up");

    //get random position
    let randomX = Math.floor(Math.random() * heightColiseum);
    let randomY = Math.floor(Math.random() * widthColiseum);


    powerUp.style.top = randomX + "px";
    powerUp.style.left = randomY + "px";

    coliseum.appendChild(powerUp);


}
addPowerUp();