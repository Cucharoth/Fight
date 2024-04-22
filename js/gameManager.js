function addPowerUp() {
    var idColiseum = "coliseum"
    const coliseum = document.getElementById(idColiseum);
    const heightColiseum = coliseum.offsetHeight;
    const widthColiseum = coliseum.offsetWidth;


    const powerUp = document.createElement("div");
    powerUp.setAttribute("class", "power-up");
    //powerUp.setAttribute("class", "power-up-damage");
    powerUp.style.height = "50px";
    powerUp.style.width = "50px";


    var firepowerimage = document.createElement("img");
    firepowerimage.setAttribute("src", "../img/powerup/powerup-damage.png");
    firepowerimage.style.width = "50px";
    firepowerimage.style.height = "50px";

    powerUp.appendChild(firepowerimage);


    //get random position

    let randomX = Math.floor(Math.random() * (heightColiseum - 50));
    let randomY = Math.floor(Math.random() * (widthColiseum  - 50));

    powerUp.style.top = randomX + "px";
    powerUp.style.left = randomY + "px";

    coliseum.appendChild(powerUp);


}
addPowerUp();