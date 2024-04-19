//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
    constructor(name, health, damage) {
        //Atributos
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
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
    if (e.key == "w") {
        console.log(e.key);
    } else if (e.key == "a") {
        console.log(e.key);
    } else if (e.key == "s") {
        console.log(e.key);
    } else if (e.key == "d") {
        console.log(e.key);
    }
    updateScreen();
    statusCheck();
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
const hero = new Character("Heroe", heroHp, heroDmg);
const enemy = new Character("Limo", enemyHp, enemyDmg);

//Comenzar combate
updateScreen();
combat();

