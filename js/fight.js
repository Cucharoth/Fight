//Ejercicio de practica Javascript

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
    }
    //Verifica si el personaje esta vivo
    isAlive() {
        return this.health > 0;
    }

    //Ataca a otro personaje seleccionado
    attack(target) {
        console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
        target.health -= this.damage;
    }

    //Retorna la información actual del personaje
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

function combat() {
    // alert(`COMIENZA EL COMBATE! \n
    // ${hero.status()}, Attack: ${hero.damage}\n
    // ${enemy.status()}, Attack: ${enemy.damage}`);

    if (characterCollision()) {
        //TODO: PONER LA MAGIA AQUÍ
        //console.log("COLLISION!!!1");

        if (!collision) {
            cap = 60;
        }
        collision = true;
    }
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

    updateScreen();
}

// si la distancia entre ambos centros es menor a la suma de sus radios, colisionan.
function characterCollision() {
    let heroXPosCentered = hero.x + hero.sprite.width / 2;
    let heroYPosCentered =
        windowDimensions.height - hero.y - hero.sprite.height / 2;
    let enemyXPosCentered =
        enemy.x + enemy.sprite.width + enemy.sprite.width / 2;
    let enemyYPosCentered =
        windowDimensions.height - enemy.y - enemy.sprite.height / 2;
    if (
        Math.sqrt(
            Math.pow(enemyXPosCentered - heroXPosCentered, 2) +
                Math.pow(enemyYPosCentered - heroYPosCentered, 2)
        ) <=
        hero.sprite.width / 2 + enemy.sprite.width / 2
    ) {
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
                if (collision) {
                    doAtack(enemy, hero);
                }
                return;
        }
    });
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
                if (collision) {
                    doAtack(hero, enemy);
                }
                return;
        }
    });
}
var cap = 0;
function doAtack(characterAtk, characterDef) {
    cap += 1;
    if (cap >= 60) {
        console.log("does atack");

        characterAtk.attack(characterDef);
        cap = 0;
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

function updateScreen() {
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
const windowDimensions = document
    .getElementById("battleground")
    .getBoundingClientRect();
document.addEventListener("keyup", keyPressHandler);
document.addEventListener("keydown", keyPressHandler);
const keyPressed = new Map();
var collision = false;
//Comenzar combate
updateScreen();
combat();

