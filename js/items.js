export function addRandomPowerUp(){
const powerUps = ["power-up-health", "power-up-damage"];
    const randomPowerUp = powerUps[Math.floor(Math.random() * powerUps.length)];
    addPowerUp(randomPowerUp);
}
function addPowerUp(classPowerUp) {
    let idColiseum = "battleground";
    const coliseum = document.getElementById(idColiseum);
    const heightColiseum = coliseum.offsetHeight;
    const widthColiseum = coliseum.offsetWidth;

    const powerUp = document.createElement("div");
    powerUp.setAttribute("class", "power-up");
    powerUp.classList.add(classPowerUp);
    powerUp.style.height = "50px";
    powerUp.style.width = "50px";


    var powerUpImage = document.createElement("img");


    switch (classPowerUp) {
        case "power-up-health":{
            powerUpImage.setAttribute("src", "../img/powerup/powerup-health.png");
            break;
        }
        case "power-up-damage":{
            powerUpImage.setAttribute("src", "../img/powerup/powerup-damage.png");
            break;
        }
    }



    powerUpImage.style.width = "50px";
    powerUpImage.style.height = "50px";

    powerUp.appendChild(powerUpImage);

    //get random position

    let randomX = Math.floor(Math.random() * (heightColiseum - 50));
    let randomY = Math.floor(Math.random() * (widthColiseum - 50));

    powerUp.style.top = randomX + "px";
    powerUp.style.left = randomY + "px";

    coliseum.appendChild(powerUp);
}
//TODO: cucha: creo que es mejor si le punes un if para ver si es nulo o no el power up antes de que siga, si es nulo que no haga nada
export function distanceAtPowerUp() {
    try {
        const powerUp = document.getElementsByClassName("power-up")[0];
        const xPowerUp = powerUp.offsetLeft;
        const yPowerUp = powerUp.offsetTop;

        const range = 50;

        if (xPowerUp - range <= hero.x && hero.x <= xPowerUp + range) {
            if (yPowerUp - range <= hero.y && hero.y <= yPowerUp + range) {

                usePowerUp(hero);
            }
        }
        if (
            xPowerUp - range <= enemy.x + enemy.sprite.width &&
            enemy.x + enemy.sprite.width <= xPowerUp + range
        ) {
            if (yPowerUp - range <= enemy.y && enemy.y <= yPowerUp + range) {

                usePowerUp(enemy);
            }
        }
    } catch (error) {
        console.log("No power-up found");
    }
}

function usePowerUp(character) {
    const powerUpBuffDuration = 5000; // in milisegundos
    const classPowerUp = document.getElementsByClassName("power-up")[0].classList[1];
    switch (classPowerUp) {
        case "power-up-health": {
            character.health += 20;
            break;
        }
        case "power-up-damage": {
            character.aditionalDamage += 5;
            activateFire(character);
            //reset stats
            setTimeout(() => {
                character.aditionalDamage -= 5;
                deactivateFire()
            },powerUpBuffDuration);
            break;
        }
    }
    const powerUp = document.getElementsByClassName("power-up")[0];
    powerUp.remove();
    setTimeout(() => addRandomPowerUp(), 5000);

}

function activateFire(character) {
    if (character.name === "Heroe") {
        heroHpContainer.style.setProperty("--hidden", "visible");
    } else {
        enemyHpContainer.style.setProperty("--hidden", "visible");
    }
}

function deactivateFire(character) {
    if (character.name === "Heroe") {
        heroHpContainer.style.setProperty("--hidden", "hidden");
    } else {
        enemyHpContainer.style.setProperty("--hidden", "hidden");
    }
}

const heroHpContainer = document.getElementById("heroHpContainer");
const enemyHpContainer = document.getElementById("enemyHpContainer");