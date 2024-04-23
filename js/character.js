import * as Constans from "../js/constants.js";
import { atMeleeRange } from "../js/fight.js";

//Objeto base para los personajes
export default class Character {
    constructor(name, health, damage, sprite, x, y, speed) {
        //Atributosff
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
        this.sprite.style.borderColor = Constans.DMG_COLOR;
        this.justGotHit = true;
        setTimeout(() => {
            if (atMeleeRange) {
                this.sprite.style.borderColor = Constans.DANGER_COLOR;
                this.justGotHit = false;
            } else this.sprite.style.borderColor = Constans.SAFE_COLOR;;
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
            Constans.windowDimensions.height -
            target.posYCentered -
            this.sprite.height / 3 +
            "px";
        setTimeout(() => {
            swing.style.display = "none";
        }, 300);
    }
}