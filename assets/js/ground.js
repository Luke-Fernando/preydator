export default class Ground {

    spritesheet;
    width;
    height;

    constructor(ctx, width, height) {
        this.spritesheet = new Image();
        this.spritesheet.src = "/assets/sprites/exterior.png";
        this.#generateGround(ctx, width, height);
    }

    #generateGround(ctx, width, height) {
        const sprites = {
            grass: {
                1: { x: 212, y: 628, width: 9, height: 7 },
                2: { x: 162, y: 610, width: 13, height: 11 },
                3: { x: 228, y: 548, width: 7, height: 6 },
                4: { x: 162, y: 757, width: 11, height: 7 },
            },
            well: { x: 1, y: 498, width: 35, height: 41 },
        }
    }
}