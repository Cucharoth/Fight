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

  function combat(){
    document.addEventListener('keypress', (e) => {
        if (e.key == 'n'){
            if (hero.isAlive()) {
                hero.attack(enemy);
                setEnemyCurrentHp((enemy.health / enemy.maxhealth) * 100)
                console.log(hero.status());
                console.log(enemy.status());
                if (!enemy.isAlive()) alert("GAME OVER");
              } else {
                console.log(`${hero.name} died!`);
                alert("GAME OVER")
              }
        } else if (e.key == 'x') {
            if (enemy.isAlive()) {
                enemy.attack(hero);
                setHeroCurrentHp((hero.health / hero.maxhealth) * 100)
                console.log(hero.status());
                console.log(enemy.status());
                if (!hero.isAlive()) alert("GAME OVER");
              } else {
                console.log(`${enemy.name} died!`);
                alert("GAME OVER")
              }
        }
    })
  }
  
  //Función para combatir
  function fight(firstCharacter, secondCharacter) {
    console.log("Empieza el combate!");
    console.log(hero.status());
    console.log(enemy.status());
    

  
      //Primer personaje ataca si esta vivo
      

      console.log(`${(hero.health / hero.maxhealth) + 100}`);
      //setCurrentHp((hero.health / hero.maxhealth) + 100);
      
  }

 

  function setHeroCurrentHp(hp){
    hpDiv = document.getElementById("heroHp").style.width = hp + "%";
  }

  function setEnemyCurrentHp(hp){
    hpDiv = document.getElementById("enemyHp").style.width = hp + "%";
  }
  


  //Creación de personajes
  const heroHp = Math.floor(Math.random() * 101);
  const heroDmg = Math.floor(Math.random() * 6);
  const enemyHp = Math.floor(Math.random() * 101);
  const enemyDmg = Math.floor(Math.random() * 6);
  const hero = new Character("Heroe", heroHp, heroDmg);
  const enemy = new Character("Limo", enemyHp, enemyDmg);
  
  //Comenzar combate
  //fight(hero, enemy);
  combat();

