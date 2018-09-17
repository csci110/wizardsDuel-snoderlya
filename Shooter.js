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
    handleCollision(otherSprite) {
        // Compare images so Stranger's spells don't destroy each other.
        if (this.getImage() !== otherSprite.getImage()) {
            // Adjust mostly blank spell image to vertical center.
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                new Fireball(otherSprite);
            }
        }
        return false;
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
        let spell = new Spell;
        spell.x = this.x;
        spell.y = this.height + this.height;
        spell.name = "A Ball Sent by Bob";
        spell.setImage("ball.png");
        spell.angle = 270;
        this.playAnimation("down");
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
        this.defineAnimation("up", 0, 2)
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
        if (Math.random() < 0.01) {
            let ball = new Spell;
            ball.name = "A ball thrown by the Creeper";
            ball.x = this.x;
            ball.y = this.y - this.height;
            ball.setImage("ball.png");
            ball.angle = 90;
            this.playAnimation("up");
        }
    }
}



let George = new Creeper;

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "A ball of fire";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 1, 16);
        this.playAnimation("explode");
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(George)) {
            game.end("Congratulations!\n\n  Bob has won Dodgeball against the George");
        }
        if (!game.isActiveSprite(bob)) {
            game.end("Congratulations!\n\n George has won Dodge ball against Bob");
        }

    }
}
