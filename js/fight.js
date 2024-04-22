//Ejercicio de practica Javascript

//Constantes:
const SAFE_COLOR = "#00af1d";
const DMG_COLOR = "#b80000";
const DANGER_COLOR = "#dab901";

//Objeto base para los personajes
class Character {
    constructor(name, health, damage, sprite, x, y, speed) {
        //Atributos
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.posXCentered = 0;
        this.posYCentered = 0;
        this.justGotHit = false;
    }
    //Verifica si el personaje esta vivo
    isAlive() {
        return this.health > 0;
    }

    //Ataca a otro personaje seleccionado
    attack(target) {
        console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
        target.health -= this.damage;
        this.showSwing(target);
        target.receiveDmg();
        if (target.health < 0) {
            target.health = 0;
        }
    }

    receiveDmg() {
        this.sprite.style.borderColor = DMG_COLOR;
        this.justGotHit = true;
        setTimeout(() => {
            if (atMeleeRange) {
                this.sprite.style.borderColor = DANGER_COLOR;
                this.justGotHit = false;
            } else this.sprite.style.borderColor = SAFE_COLOR;;
        }, 300);
    }

    showSwing(target) {
        swing.style.display = "block";
        swing.style.left =
            target.posXCentered -
            this.sprite.width -
            target.sprite.width -
            target.sprite.width / 2 +
            "px";
        swing.style.top =
            windowDimensions.height -
            enemy.posYCentered -
            this.sprite.height / 3 +
            "px";
        setTimeout(() => {
            swing.style.display = "none";
        }, 300);
    }
}

//main game loop
function combat() {
    // alert(`COMIENZA EL COMBATE! \n
    // ${hero.status()}, Attack: ${hero.damage}\n
    // ${enemy.status()}, Attack: ${enemy.damage}`);

    if (characterCollision()) {
        //TODO: PONER LA MAGIA AQUÍ
        //console.log("COLLISION!!!1");

        
    }
    distanceCheck();
    heroMovement(keyPressed);
    enemyMovement(keyPressed);
    updateScreen();
    if (characterDeadCheck()) {
    } else {
        window.requestAnimationFrame(combat);
    }
    //setInterval(combat, 400);
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

function enemyMovement(keyPressed) {
    keyPressed.forEach((value, key) => {
        switch (key) {
            case "ArrowUp":
                if (enemy.y > 0) {
                    enemy.y -= 2;
                    enemy.sprite.style.top = `${enemy.y}px`;
                }
                return;
            case "ArrowLeft":
                if (enemy.x > 0 - enemy.sprite.width) {
                    enemy.x -= 2;
                    enemy.sprite.style.left = `${enemy.x}px`;
                }
                return;
            case "ArrowDown":
                if (
                    enemy.y <
                    windowDimensions.height -
                        enemy.sprite.getBoundingClientRect().height
                ) {
                    enemy.y += 2;
                    enemy.sprite.style.top = `${enemy.y}px`;
                }
                return;
            case "ArrowRight":
                if (
                    enemy.x <
                    windowDimensions.width -
                        enemy.sprite.getBoundingClientRect().width -
                        enemy.sprite.width
                ) {
                    enemy.x += 2;
                    enemy.sprite.style.left = `${enemy.x}px`;
                }
                return;
            case "ControlRight":
                if (atMeleeRange) {
                    tryAttack(enemy, hero);
                }
                return;
        }
    });
    enemy.posXCentered = enemy.x + enemy.sprite.width + enemy.sprite.width / 2;
    enemy.posYCentered =
        windowDimensions.height - enemy.y - enemy.sprite.height / 2;
}

function heroMovement(keyPressed) {
    keyPressed.forEach((value, key) => {
        switch (key) {
            case "KeyW":
                if (hero.y > 0) {
                    hero.y -= hero.speed;
                    hero.sprite.style.top = `${hero.y}px`;
                }
                return;
            case "KeyA":
                if (hero.x > 0) {
                    hero.x -= hero.speed;
                    hero.sprite.style.left = `${hero.x}px`;
                }
                return;
            case "KeyS":
                if (
                    hero.y <
                    windowDimensions.height -
                        hero.sprite.getBoundingClientRect().height
                ) {
                    hero.y += hero.speed;
                    hero.sprite.style.top = `${hero.y}px`;
                }
                return;
            case "KeyD":
                if (
                    hero.x <
                    windowDimensions.width -
                        hero.sprite.getBoundingClientRect().width
                ) {
                    hero.x += hero.speed;
                    hero.sprite.style.left = `${hero.x}px`;
                }
                return;
            case "KeyF":
                if (atMeleeRange) {
                    tryAttack(hero, enemy);
                }
                return;
        }
    });
    hero.posXCentered = hero.x + hero.sprite.width / 2;
    hero.posYCentered =
        windowDimensions.height - hero.y - hero.sprite.height / 2;
}

function tryAttack(characterAtk, characterDef) {
    attackCap += 1;
    if (attackCap >= 40) {
        characterAtk.attack(characterDef);
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
    hpDiv = document.getElementById("heroHp").style.width = hp + "%";
}

function setEnemyCurrentHp(hp) {
    hpDiv = document.getElementById("enemyHp").style.width = hp + "%";
}

function setSpriteBorderColor() {
    if (atMeleeRange && !hero.justGotHit) hero.sprite.style.borderColor = DANGER_COLOR;
    else if (!hero.justGotHit) hero.sprite.style.borderColor = SAFE_COLOR; 

    if (atMeleeRange && !enemy.justGotHit) enemy.sprite.style.borderColor = DANGER_COLOR;
    else if (!enemy.justGotHit) enemy.sprite.style.borderColor = SAFE_COLOR;
}

function updateScreen() {
    setSpriteBorderColor();
    setHeroCurrentHp(hero.health);
    setEnemyCurrentHp(enemy.health);
    document.getElementById("currentHeroHp").innerHTML = hero.health;
    document.getElementById("currentEnemyHp").innerHTML = enemy.health;
    document.getElementById("currentHeroDmg").innerHTML = hero.damage;
    document.getElementById("currentEnemyDmg").innerHTML = enemy.damage;
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
    1
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
const windowDimensions = document
    .getElementById("battleground")
    .getBoundingClientRect();
document.addEventListener("keyup", keyPressHandler);
document.addEventListener("keydown", keyPressHandler);
const keyPressed = new Map();
var charactersDistance = 0;
var collision = false;
var atMeleeRange = false;
var attackCap = 0;
var swing = document.getElementById("swing");
var currentBorderColor = SAFE_COLOR;

//Comenzar combate
updateScreen();
combat();

