import {hero, enemy} from "./fight.js";


export function addPowerUp() {
    var idColiseum = "battleground";
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

export function distanceAtPowerUp() {
    try {


        const powerUp = document.getElementsByClassName("power-up")[0];
        const xPowerUp = powerUp.offsetLeft;
        const yPowerUp = powerUp.offsetTop;

        const range = 50;

        if (xPowerUp - range <= hero.x && hero.x <= xPowerUp + range) {
            if (yPowerUp - range <= hero.y && hero.y <= yPowerUp + range) {

                addDamage(hero, 10);
                powerUp.remove();
                setTimeout(() => addPowerUp(), 5000);
            }
        }
        if (xPowerUp - range <= enemy.x && enemy.x <= xPowerUp + range) {
            if (yPowerUp - range <= enemy.y && enemy.y <= yPowerUp + range) {

                addDamage(enemy, 10);
                powerUp.remove();
                setTimeout(() => addPowerUp(), 5000);
            }
        }
    } catch (error) {
        console.log("No power-up found");
    }
}
function addDamage(character, damage) {
    character.aditionalDamage += damage;
    console.log(character.aditionalDamage);
    setTimeout(() => {
        character.aditionalDamage -= damage;
    }, 5000);
}