import { game, Sprite } from "./sgc/sgc.js";

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
        this.defineAnimation("up", 6, 8)
        this.playAnimation("up")
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
        this.y = Math.max(0, this.y);
        this.y = Math.min(552, this.y);
        // Keep Marcus in the display area
        this.speed = 0
    }
}

let marcus = new PlayerWizard;
