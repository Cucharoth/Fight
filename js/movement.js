import * as Constants from "../js/constants.js";
import { tryAttack, atMeleeRange } from "./fight.js";
export { enemyMovement, heroMovement };

function enemyMovement(enemy, hero, keyPressed) {
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
                    Constants.windowDimensions.height -
                        enemy.sprite.getBoundingClientRect().height
                ) {
                    enemy.y += 2;
                    enemy.sprite.style.top = `${enemy.y}px`;
                }
                return;
            case "ArrowRight":
                if (
                    enemy.x <
                    Constants.windowDimensions.width -
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
        Constants.windowDimensions.height - enemy.y - enemy.sprite.height / 2;
}

function heroMovement(hero, enemy, keyPressed) {
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
                    Constants.windowDimensions.height -
                        hero.sprite.getBoundingClientRect().height
                ) {
                    hero.y += hero.speed;
                    hero.sprite.style.top = `${hero.y}px`;
                }
                return;
            case "KeyD":
                if (
                    hero.x <
                    Constants.windowDimensions.width -
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
        Constants.windowDimensions.height - hero.y - hero.sprite.height / 2;
}