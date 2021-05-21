let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
let gameWidth = canvas.width = 1280;
let gameHeight = canvas.height = 720;

// Background image
let bgImgReady = false;
let bgImg = new Image();
bgImg.onload = () => bgImgReady = true;
bgImg.src = '/images/mars.jpg';

// Image of rocket
let rocketReady = false;
let rocketImg = new Image();
rocketImg.onload = () => {
    rocketReady = true;
}
rocketImg.src = "images/rocket.png";

// gameObjects
let rocket = {
    speed: 256,
    x: gameWidth * Math.random(),
    y: gameHeight * (Math.random() * 0.1)
}

// game keyboard Controls container
let keysDown = {};

addEventListener("keydown", event => {
	keysDown[event.keyCode] = true;
}, false);

addEventListener("keyup", event => {
	delete keysDown[event.keyCode];
}, false);

// update rocket position in the canvas
function update(modifier) {
    if (38 in keysDown) { // Player holding up
		rocket.y -= rocket.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		rocket.y += rocket.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		rocket.x -= rocket.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		rocket.x += rocket.speed * modifier;
	}
}

// permanent rocket fall function
function fall(speed) {
    return rocket.y = rocket.y + speed;
}

// render images
function render() {
    if (bgImgReady) {
        ctx.drawImage(bgImg, 0, 0, 1280, 720);
    }

    if (rocketReady) {
        ctx.drawImage(rocketImg, rocket.x, rocket.y, 120, 100);
    }
}

// don't let rocket to to through walls
function dontLetRocketToHide() {
    if (rocket.x <= -30) rocket.x = -30;
    if (rocket.x + 100 > gameWidth) rocket.x = gameWidth - 95;
    if (rocket.y <= 0) rocket.y = 0;
    if (rocket.y > gameHeight) rocket.y = 620;
}

// game loop
function gameLoop() {
    let now = Date.now();
    let delta = now - then;

    update(delta/1000);
    render();
    fall(0.2)
    dontLetRocketToHide();

    then = now;
    requestAnimationFrame(gameLoop);
}

let then = Date.now();
gameLoop();