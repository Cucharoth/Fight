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
    firepowerimage.setAttribute("src", "Fight/img/powerup/powerup-damage.png");
    firepowerimage.style.width = "50px";
    firepowerimage.style.height = "50px";

    powerUp.appendChild(firepowerimage);

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
    activateFire(character);
    character.aditionalDamage += damage;
    console.log(character.aditionalDamage);
    setTimeout(() => {
        character.aditionalDamage -= damage;
        deactivateFire(character);
    }, 5000);
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