import Character from "../js/character.js";
import * as Constants from "../js/constants.js";
import { heroMovement, enemyMovement } from "./movement.js";
export {tryAttack};
import {addPowerUp, distanceAtPowerUp} from "./items.js";
export { hero, enemy};
//main game loop
function combat() {
    // alert(`COMIENZA EL COMBATE! \n
    // ${hero.status()}, Attack: ${hero.damage}\n
    // ${enemy.status()}, Attack: ${enemy.damage}`);

    if (characterCollision()) {
        //TODO: PONER LA MAGIA AQUÍ
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
    console.log(keyPressed); //todo remove
}

// calcula la distancia entre distintos objetos
function distanceCheck() {
    distanceBetweenCharacters();
    distanceAtPowerUp();
}

function distanceBetweenCharacters() {
    charactersDistance = Math.sqrt(
        Math.pow(enemy.posXCentered - hero.posXCentered, 2) +
            Math.pow(enemy.posYCentered - hero.posYCentered, 2));
    if (charactersDistance < hero.sprite.width / 2 + enemy.sprite.width / 2 + 50) {
        atMeleeRange = true
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
            if (!alert("GAME OVER \nEnemy died!")) window.location.reload();
        }, 1000);
        return true;
    }
    if (!hero.isAlive()) {
        document.removeEventListener("keypress", keyPressHandler);
        document.getElementById("img-hero").src = "img/Defeated-Knight.jpg";
        setTimeout(() => {
            if (!alert("GAME OVER \nHero died!")) window.location.reload();
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
    if (atMeleeRange && !hero.justGotHit) hero.sprite.style.borderColor = Constants.DANGER_COLOR;
    else if (!hero.justGotHit) hero.sprite.style.borderColor = Constants.SAFE_COLOR; 

    if (atMeleeRange && !enemy.justGotHit) enemy.sprite.style.borderColor = Constants.DANGER_COLOR;
    else if (!enemy.justGotHit) enemy.sprite.style.borderColor = Constants.SAFE_COLOR;
}

function updateScreen() {
    setSpriteBorderColor();
    setHeroCurrentHp(hero.health);
    setEnemyCurrentHp(enemy.health);
    document.getElementById("currentHeroHp").innerHTML = hero.health;
    document.getElementById("currentEnemyHp").innerHTML = enemy.health;
    document.getElementById("currentHeroDmg").innerHTML = hero.damage + hero.aditionalDamage;
    document.getElementById("currentEnemyDmg").innerHTML = enemy.damage + enemy.aditionalDamage;
}

//Creación de personajes
const heroHp = 100; //Math.floor(Math.random() * 101 + 10);
const heroDmg = Math.floor(Math.random() * 10 + 5);
const enemyHp = 100; //Math.floor(Math.random() * 101 + 10);
const enemyDmg = Math.floor(Math.random() * 10 + 5);
const imageHero = document.getElementById("img-hero");
const imageEnemy = document.getElementById("img-enemy");
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
const hero = new Character(
    "Heroe",
    heroHp,
    heroDmg,
    imageHero,
    heroXPos,
    heroYPos,
    10
);
const enemy = new Character(
    "Limo",
    enemyHp,
    enemyDmg,
    imageEnemy,
    enemyXPos,
    enemyYPos,
    10
);

//setup
document.addEventListener("keyup", keyPressHandler);
document.addEventListener("keydown", keyPressHandler);
const keyPressed = new Map();
var charactersDistance = 0;
var collision = false;
export var atMeleeRange = false;
var attackCap = 0;
export var swing = document.getElementById("swing");

addPowerUp();

//Comenzar combate
updateScreen();
combat();

