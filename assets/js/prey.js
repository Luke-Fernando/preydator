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
        this.x = 0;
        this.y = 0;
        this.#run(this.run.right);
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
        let worker = setInterval(() => {
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
        }, 100);
        return worker;
    }

    #animateMovement(movement, direction) {
        this.spritesheet.src = movement.src;
        this.spritesheet.onload = () => {
            let worker = this.#animate(movement.frames, 2.5, direction);
            return worker;
        };
    }

    #run(direction) {
        let worker = setInterval(() => {
            let speed = 10;
            let index = {};
            let runAnimateWorker;
            let idleAnimateWorker
            if (direction == 0) {
                index = { x: this.x, y: this.y += speed };
            } else if (direction == 1) {
                index = { x: this.x, y: this.y -= speed };
            } else if (direction == 2) {
                index = { x: this.x -= speed, y: this.y };
            } else if (direction == 3) {
                index = { x: this.x += speed, y: this.y };
            }
            if (this.#checkObstacles(index)) {
                this.x = index.x;
                this.y = index.y;
                clearInterval(idleAnimateWorker);
                clearInterval(runAnimateWorker);
                runAnimateWorker = this.#animateMovement(this.run, direction);
            } else {
                clearInterval(worker);
                clearInterval(runAnimateWorker);
                clearInterval(idleAnimateWorker);
                idleAnimateWorker = this.#animateMovement(this.idle, direction);
            }
        }, 100);
    }

    #checkObstacles(index) {
        return this.#checkBorder(index);
    }

    #checkBorder(index) {
        let width = window.innerWidth;
        let height = window.innerHeight;

        if ((this.x + index.x) >= 0 && (this.x + index.x) <= width && (this.y + index.y) >= 0 && (this.y + index.y) <= height) {
            return true;
        } else {
            return false;
        }
    }

}