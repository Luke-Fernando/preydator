import Prey from "./prey.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function resizeCanvas() {
    window.addEventListener("resize", () => {
        setCanvasSize();
    });
}

function init() {
    setCanvasSize();
    resizeCanvas();
}
let prey = new Prey(ctx);

init();