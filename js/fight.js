import Character from "../js/character.js";
import * as Constants from "../js/constants.js";
import { heroMovement, enemyMovement } from "./movement.js";
import { addRandomPowerUp, distanceAtPowerUp } from "./items.js";
import { activateSoundBtn, playMainTheme } from "./audioHandler.js";
export { tryAttack };

//main game loop
function combat() {
    if (characterCollision()) {
        //TODO: PONER LA MAGIA AQUÍ, la magia when
    }
    distanceCheck();
    heroMovement(hero, enemy, keyPressed);
    enemyMovement(enemy, hero, keyPressed);
    updateScreen();
    if (characterDeadCheck()) {
    } else {
        window.requestAnimationFrame(combat);
    }
}

// se usa un map para registrar cada tecla presionada y realizar el movimiento analizando el map
function keyPressHandler(e) {
    e.preventDefault();
    if (e.type === "keydown") {
        keyPressed.set(e.code, true);
    } else {
        keyPressed.delete(e.code);
    }
}

// calcula la distancia entre distintos objetos
function distanceCheck() {
    distanceBetweenCharacters();
    distanceAtPowerUp();
}

function distanceBetweenCharacters() {
    charactersDistance = Math.sqrt(
        Math.pow(enemy.posXCentered - hero.posXCentered, 2) +
            Math.pow(enemy.posYCentered - hero.posYCentered, 2)
    );
    if (
        charactersDistance <
        hero.sprite.width / 2 + enemy.sprite.width / 2 + 50
    ) {
        atMeleeRange = true;
    } else atMeleeRange = false;
}

// si la distancia entre ambos centros es menor a la suma de sus radios, colisionan.
function characterCollision() {
    if (charactersDistance <= hero.sprite.width / 2 + enemy.sprite.width / 2) {
        if (!collision) {
            attackCap = 40;
        }
        collision = true;
        return true;
    } else {
        collision = false;
    }
}

function blockKeyDedaultMovement(e) {
    e.preventDefault();
}

function tryAttack(characterAtk, characterDef) {
    attackCap += 1;
    if (attackCap >= 40) {
        characterAtk.attack(characterDef, swing, atMeleeRange);
        attackCap = 0;
    }
}

function characterDeadCheck() {
    if (!enemy.isAlive()) {
        document.removeEventListener("keypress", keyPressHandler);
        document.getElementById("img-enemy").src = "img/defeated-slime.png";
        setTimeout(() => {
            alert("GAME OVER \nEnemy died!");
            console.log("after alert");
            setInitialValues();
            initialSetup();
            window.requestAnimationFrame(combat);
            //window.location.reload();
        }, 1000);
        return true;
    }
    if (!hero.isAlive()) {
        document.removeEventListener("keypress", keyPressHandler);
        document.getElementById("img-hero").src = "img/Defeated-Knight.jpg";
        setTimeout(() => {
            if (!alert("GAME OVER \nHero died!")) {
            }
            setInitialValues();
            initialSetup();
            window.requestAnimationFrame(combat);
            //window.location.reload();
        }, 1000);
        return true;
    }
    return false;
}

function setHeroCurrentHp(hp) {
    document.getElementById("heroHp").style.width = hp + "%";
}

function setEnemyCurrentHp(hp) {
    document.getElementById("enemyHp").style.width = hp + "%";
}

function setSpriteBorderColor() {
    if (atMeleeRange && !hero.justGotHit)
        hero.sprite.style.borderColor = Constants.DANGER_COLOR;
    else if (!hero.justGotHit)
        hero.sprite.style.borderColor = Constants.SAFE_COLOR;

    if (atMeleeRange && !enemy.justGotHit)
        enemy.sprite.style.borderColor = Constants.DANGER_COLOR;
    else if (!enemy.justGotHit)
        enemy.sprite.style.borderColor = Constants.SAFE_COLOR;
}

function updateScreen() {
    setSpriteBorderColor();
    setHeroCurrentHp(hero.health);
    setEnemyCurrentHp(enemy.health);
    document.getElementById("currentHeroHp").innerHTML = hero.health;
    document.getElementById("currentEnemyHp").innerHTML = enemy.health;
    document.getElementById("currentHeroDmg").innerHTML =
        hero.damage + hero.aditionalDamage;
    document.getElementById("currentEnemyDmg").innerHTML =
        enemy.damage + enemy.aditionalDamage;
}

function setInitialValues() {
    globalThis.heroHp = 100; //Math.floor(Math.random() * 101 + 10);
    const heroDmg = Math.floor(Math.random() * 10 + 5);
    const enemyHp = 100; //Math.floor(Math.random() * 101 + 10);
    const enemyDmg = Math.floor(Math.random() * 10 + 5);
    const imageHero = document.getElementById("img-hero");
    const imageEnemy = document.getElementById("img-enemy");
    imageHero.src = "img/knight.jpg";
    imageEnemy.src = "img/slime.jpg";
    imageHero.style.left = "450px";
    imageHero.style.top = "120px";
    imageEnemy.style.left = "600px";
    imageEnemy.style.top = "120px";
    const heroXPos =
        window
            .getComputedStyle(imageHero, null)
            .getPropertyValue("left")
            .substring(0, 3) - 0;
    const heroYPos =
        window
            .getComputedStyle(imageHero, null)
            .getPropertyValue("top")
            .substring(0, 3) - 0;
    const enemyXPos =
        window
            .getComputedStyle(imageEnemy, null)
            .getPropertyValue("left")
            .substring(0, 3) - 0;
    const enemyYPos =
        window
            .getComputedStyle(imageEnemy, null)
            .getPropertyValue("top")
            .substring(0, 3) - 0;
    globalThis.hero = new Character(
        "Heroe",
        heroHp,
        heroDmg,
        imageHero,
        heroXPos,
        heroYPos,
        5
    );
    globalThis.enemy = new Character(
        "Limo",
        enemyHp,
        enemyDmg,
        imageEnemy,
        enemyXPos,
        enemyYPos,
        5
    );
}

function initialSetup() {
    document.addEventListener("keyup", keyPressHandler);
    document.addEventListener("keydown", keyPressHandler);
    globalThis.keyPressed = new Map();
    globalThis.charactersDistance = 0;
    globalThis.collision = false;
    globalThis.atMeleeRange = false;
    globalThis.attackCap = 0;
    globalThis.swing = document.getElementById("swing");
    // alert(`COMIENZA EL COMBATE! \n
    // ${hero.status()}, Attack: ${hero.damage}\n
    // ${enemy.status()}, Attack: ${enemy.damage}`);
}

//setup

activateSoundBtn();
setInitialValues();
addRandomPowerUp();

//Comenzar combate

initialSetup();
updateScreen();
combat();

