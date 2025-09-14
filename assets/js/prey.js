export default class Prey {

    constructor(ctx) {
        this.ctx = ctx;
        this.spritesheet = new Image();
        this.idle = {
            src: "/assets/sprites/prey/idle.png",
            frames: 6,
            front: 0,
            back: 1,
            left: 2,
            right: 3
        }
        this.walk = {
            src: "/assets/sprites/prey/walk.png",
            frames: 8,
            front: 0,
            back: 1,
            left: 2,
            right: 3
        }
        this.run = {
            src: "/assets/sprites/prey/run.png",
            frames: 8,
            front: 0,
            back: 1,
            left: 2,
            right: 3
        }
        this.death = {
            src: "/assets/sprites/prey/death.png",
            frames: 10,
            front: 0,
            back: 1,
            left: 2,
            right: 3
        }
        this.x = 100;
        this.y = 100;
        this.#animateMovement(this.run, this.run.right);
    }

    #animate(framesTotal, sizeMultiplier, row) {
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.oImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        let baseWidth = 64;
        let baseHeight = 64;
        let currentFrame = 0;
        this.ctx.drawImage(this.spritesheet, 0, row, baseWidth, baseHeight, this.x, this.y, baseWidth * sizeMultiplier, baseHeight * sizeMultiplier);
        let interval = setInterval(() => {
            this.ctx.clearRect(this.x, this.y, baseWidth * sizeMultiplier, baseHeight * sizeMultiplier);
            this.ctx.drawImage(
                this.spritesheet,
                currentFrame * baseWidth,
                row * baseHeight,
                baseWidth,
                baseHeight,
                this.x,
                this.y,
                baseWidth * sizeMultiplier,
                baseHeight * sizeMultiplier
            );
            currentFrame++;
            if (currentFrame >= framesTotal) {
                currentFrame = 0;
            }
            this.x += 10;
            this.y += 1;
        }, 100);
    }

    #animateMovement(movement, direction) {
        this.spritesheet.src = movement.src;
        this.spritesheet.onload = () => {
            this.#animate(movement.frames, 2.5, direction);
        };
    }

}