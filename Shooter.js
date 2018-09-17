import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("floor.png");

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleBoundryContact() {
        // Delete spell when it leaves display area
        game.removeSprite(this);
    }
}

class Wizard extends Sprite {
    constructor() {
        super();
        this.name = "Wizard";
        this.setImage("marcusSheet.png");
        this.height = 35;
        this.width = 35;
        this.x = this.width;
        this.y = this.y;
        this.speedWhenWalking = 100;
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("down", 6, 8);
    }

    handleRightArrowKey() {
        this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }
    handleLeftArrowKey() {
        this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }
    handleGameLoop() {
        this.x = Math.max(0, this.x);
        this.x = Math.min(750, this.x);
        // Keep Marcus in the display area
        this.speed = 0;
    }
    handleSpacebar() {
        let now = game.getTime();
        // get the number of seconds since game start
        // if the current time is 2 or more seconds greater than the previous spellCastTime
        if (now - this.spellCastTime >= 4) {
            //reset the timer
            this.spellCastTime = now;
            let spell = new Spell;
            spell.x = this.x;
            spell.y = this.height + this.height;
            spell.name = "A Ball Sent by Bob";
            spell.setImage("ball.png");
            spell.angle = 0;
            this.playAnimation("down");
        }
    }
}




let bob = new Wizard;

class Creeper extends Sprite {
    constructor() {
        super();
        this.name = "The Creeper";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = game.displayHeight - 2 * this.width;
        this.angle = 0;
        this.speed = 100;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
        this.playAnimation("right");
    }
    handleGameLoop() {
        if (this.x >= game.displayWidth - this.width) {
            this.x = game.displayWidth - this.width;
            this.angle = 180;
            this.playAnimation("left");
        }
        if (this.x <= 0) {
            this.x = 0;
            this.angle = 0;
            this.playAnimation("right");
        }
    }
}

let George = new Creeper;
