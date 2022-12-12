
const blockSize = 25
const rows = 20
const cols = 20
var board
var context
let gameOver = false
let score = 0

var velocityX = 0
var velocityY = 0

let snakeX = 10 * blockSize
let snakeY = 10 * blockSize

let foodX = 5 * blockSize
let foodY = 5 * blockSize

let snakeBody = []

window.onload = function() {
    board = document.getElementById('board')
    board.width = cols * blockSize
    board.height = rows * blockSize
    context = board.getContext('2d')

    document.addEventListener('keyup', changeDirection)
    
    setInterval(update, 1000/10);
}

function randomFood() {
    foodX = Math.floor(Math.random() * rows) * blockSize
    foodY = Math.floor(Math.random() * cols) * blockSize
}

function update() {
    if(gameOver) return
    context.fillStyle = 'black'
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = 'red'
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        score++
        document.getElementById('score').innerText = score
        randomFood()
    }

    for(let i = snakeBody.length - 1; i > 0 ; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = 'lime'
    snakeX += velocityX * blockSize
    snakeY += velocityY * blockSize
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    for(let i = 0; i < snakeBody.length; i++) {
        context.fillStyle = 'lime'
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    if(snakeX < 0 || snakeY < 0 || snakeX >= rows * blockSize || snakeY >= cols * blockSize) {
        gameOver = true
        alert('game over')
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if(e.code === 'ArrowUp' && velocityY !== 1 ) {
        velocityX = 0
        velocityY = -1
    } else if(e.code === 'ArrowDown' && velocityY !== -1) {
        velocityX = 0
        velocityY = 1
    } else if(e.code === 'ArrowRight' && velocityX !== -1) {
        velocityX = 1
        velocityY = 0
    } else if(e.code === 'ArrowLeft' && velocityX !== 1) {
        velocityX = -1
        velocityY = 0
    }
}
