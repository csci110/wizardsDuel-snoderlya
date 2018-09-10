import { game, Sprite } from "./sgc/sgc.js";

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

game.setBackground("floor.png");

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.height = 48;
        this.width = 48;
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down",6, 8);
        this.playAnimation("down");
        this.speedWhenWalking = 100;
        this.defineAnimation("up", 6, 8);
        this.playAnimation("up");
        this.defineAnimation("right", 3, 5);
    }
    handleDownArrowKey() {
            this.playAnimation("down");
            this.speed =this.speedWhenWalking;
            this.angle = 270;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(552, this.y);
        // Keep Marcus in the display area
        this.speed = 0;
    }
    handleSpacebar() {
        let spell = new Spell;
        spell.x = this.width; // this se3ts the position of the spell object equal to
        spell.y = this.y; // the position of any object created from the PlayerWizard
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.angle = 0;
        this.playAnimation("right");
    }
}

let marcus = new PlayerWizard;

class NonPlayerWizard extends Sprite{
    constructor() {
        super();
        this.name = "The mysterious stranger";
        this.setImage("stangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 6, 8 );
        this.defineAnimation("left", 9, 11);
        this.playAnimation("down");
    }
}

let stranger = new NonPlayerWizard;