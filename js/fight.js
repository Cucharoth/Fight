//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
    constructor(name, health, damage, sprite) {
        //Atributos
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
        this.sprite = sprite;
        this.x =
            window
                .getComputedStyle(imageHero, null)
                .getPropertyValue("left")
                .substring(0, 2) - 0;
        this.y =
            window
                .getComputedStyle(imageHero, null)
                .getPropertyValue("top")
                .substring(0, 2) - 0;
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
    document.addEventListener("keypress", keyPressHandler);
}

function keyPressHandler(e) {
    heroMovement(e);
    //TODO enemyMovement(e);

    checkCollision();
    updateScreen();
    statusCheck();
}

function checkCollision() {
    console.log(hero.x + hero.y);
}

function heroMovement(e) {
    switch (e.key) {
        case "w":
            if (hero.y > 0) {
                hero.y -= 10;
                hero.sprite.style.top = `${hero.y}px`;
            }
            return;
        case "a":
            if (hero.x > 0) {
                hero.x -= 10;
                hero.sprite.style.left = `${hero.x}px`;
            }
            return;
        case "s":
            if (
                hero.y <
                windowDimensions.height -
                    hero.sprite.getBoundingClientRect().height
            ) {
                hero.y += 10;
                hero.sprite.style.top = `${hero.y}px`;
            }
            return;
        case "d":
            if (
                hero.x <
                windowDimensions.width -
                    hero.sprite.getBoundingClientRect().width
            ) {
                hero.x += 10;
                hero.sprite.style.left = `${hero.x}px`;
            }
            return;
    }
}

function statusCheck() {
    if (!enemy.isAlive()) {
        document.removeEventListener("keypress", keyPressHandler);
        document.getElementById("img-enemy").src = "img/defeated-slime.png";
        setTimeout(() => {
            if (!alert("GAME OVER \nEnemy died!")) window.location.reload();
        }, 1000);
    }
    if (!hero.isAlive()) {
        document.removeEventListener("keypress", keyPressHandler);
        document.getElementById("img-hero").src = "img/Defeated-Knight.jpg";
        setTimeout(() => {
            if (!alert("GAME OVER \nHero died!")) window.location.reload();
        }, 1000);
    }
}

function setHeroCurrentHp(hp) {
    hpDiv = document.getElementById("heroHp").style.width = hp + "%";
}

function setEnemyCurrentHp(hp) {
    hpDiv = document.getElementById("enemyHp").style.width = hp + "%";
}

function updateScreen() {
    document.getElementById("currentHeroHp").innerHTML = hero.health;
    document.getElementById("currentEnemyHp").innerHTML = enemy.health;
    document.getElementById("currentHeroDmg").innerHTML = hero.damage;
    document.getElementById("currentEnemyDmg").innerHTML = enemy.damage;
}

//Creación de personajes
const heroHp = Math.floor(Math.random() * 101 + 10);
const heroDmg = Math.floor(Math.random() * 6 + 1);
const enemyHp = Math.floor(Math.random() * 101 + 10);
const enemyDmg = Math.floor(Math.random() * 6 + 1);
const imageHero = document.getElementById("img-hero");
const imageEnemy = document.getElementById("img-enemy");
const hero = new Character("Heroe", heroHp, heroDmg, imageHero);
const enemy = new Character("Limo", enemyHp, enemyDmg, imageEnemy);
const windowDimensions = document
    .getElementById("battleground")
    .getBoundingClientRect();


//Comenzar combate
updateScreen();
combat();

