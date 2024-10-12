const blockSize = 25;
const rows = 20;
const cols = 20;
let board, context;
let sX, sY;
let vX, vY;
let snakeBody;
let fX, fY;
let gameOver = false;
let score = 0;
let speed = 100; 
let intervalId;

window.onload = function() {
    initGame();
};

function initGame() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    
    restartGame();
}

function update() {
    if (gameOver) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle = "red";
    context.fillRect(fX, fY, blockSize, blockSize);
    
    if (sX === fX && sY === fY) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        snakeBody.push([fX, fY]);
        placef();
        increaseDifficulty();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [sX, sY];
    }

    context.fillStyle = "lime";
    sX += vX * blockSize;
    sY += vY * blockSize;
    context.fillRect(sX, sY, blockSize, blockSize);
    
    for (let segment of snakeBody) {
        context.fillRect(segment[0], segment[1], blockSize, blockSize);
    }

    if (sX < 0 || sX >= cols * blockSize || sY < 0 || sY >= rows * blockSize || snakeBody.some(segment => segment[0] === sX && segment[1] === sY)) {
        gameOver = true;
        document.getElementById("restartButton").style.display = "inline";
        alert("TaTa Bye Bye ! Your score: " + score);
    }
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && vY !== 1) {
        vX = 0; vY = -1;
    } else if (e.code === "ArrowDown" && vY !== -1) {
        vX = 0; vY = 1;
    } else if (e.code === "ArrowLeft" && vX !== 1) {
        vX = -1; vY = 0;
    } else if (e.code === "ArrowRight" && vX !== -1) {
        vX = 1; vY = 0;
    }
}

function placef() {
    fX = Math.floor(Math.random() * cols) * blockSize;
    fY = Math.floor(Math.random() * rows) * blockSize;
}

function increaseDifficulty() {
    speed = Math.max(50, speed * 0.95);
    clearInterval(intervalId);
    intervalId = setInterval(update, speed);
}

function restartGame() {
    sX = blockSize * 5;
    sY = blockSize * 5;
    vX = 0;
    vY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("restartButton").style.display = "none";
    
    placef();
    clearInterval(intervalId);
    intervalId = setInterval(update, speed);
}
