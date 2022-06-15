const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
let boardBackground = "yellowgreen"
const characterSpeed = 20
const scoreConatainer = document.querySelector("#score")
const btnComeca = document.querySelector("#btnComeca")
const menu = document.querySelector("#menu")
const btnEu = document.querySelector("#btnSobreMim")
const sobreMim = document.querySelector("#sobreMim")
const btnsobre = document.querySelector("#btnSobre")
const sobre = document.querySelector("#sobre")
let br = new Image()
br.src = "br.png"
let igor = new Image()
igor.src = "igor.jpg"
let boxYDirection = 1
let boxXDirection = 1
let boxSpeed = 3.5;
let score = 0
let vivo = true
let character = {
    width: 125,
    height: 125,
    x: gameWidth / 2,
    y: gameHeight / 2
}
let box = {
    width: 100,
    height: 100,
    x: 0,
    y: Math.random()*400 + 100
}

window.addEventListener("keydown", changeDirection)

btnComeca.addEventListener("click", startGame)
btnEu.addEventListener("click", mostraEU)
btnsobre.addEventListener("click", mostraSobre)

function startGame() {
    menu.style.display = "none"
    nextTick()
}



function nextTick() {
    intervalID = setTimeout(() => {
        drawBoard()
        drawCharacter()
        moveBox()
        drawBox()
        checkCollision()
        increaseSpeed()
        checkWin()
        if(vivo == true){
        nextTick()
        }else{
            
        }
    }, 10);
}

function drawCharacter() {
    ctx.drawImage(igor, character.x, character.y, character.width, character.height)
}

function drawBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    scoreConatainer.innerHTML = score
}


function moveBox() {
    box.y += (boxSpeed * boxYDirection);
    box.x += (boxSpeed * boxXDirection);
    if (box.x >= gameWidth - box.width) {
        boxXDirection = -1
        score += 1
    } else if (box.y >= gameHeight - box.height) {
        boxYDirection = -1
        score += 1
    } else if (box.y <= 0) {
        boxYDirection = 1
        score += 1
    } else if (box.x <= 0) {
        boxXDirection = 1
        score += 1
    }


}

function drawBox() {
    ctx.drawImage(br, box.x, box.y, box.width, box.height)
}

function checkCollision() {
    if (box.y + box.height >= character.y && box.y - character.height <= character.y) {
        if (character.x >= box.x - character.width && character.x <= box.x + box.width) {
            setTimeout(() => {
                alert("seu score é " + score)
                document.location.reload()
                vivo = false
            }, 10)
        }

    }
}

function increaseSpeed() {
    if (score == 15) {
        boxSpeed = 4
        boardBackground = "yellow"
    } else if (score == 40) {
        boxSpeed = 5
        boardBackground = "crimson"
    } else if (score == 70) {
        boxSpeed = 6.5
        boardBackground = "black"
    }
}

function checkWin() {
    if (score >= 100) {
        alert("Voce ganhou, Parabens!")
    }
}

function mostraEU() {
    sobreMim.classList.toggle("show")
}
function mostraSobre() {
    sobre.classList.toggle("show")
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const characterLeft = 65;
    const characterRight = 68;
    const characterUp = 87;
    const characterDown = 83;


    switch (keyPressed) {
        case (characterLeft):
            if (character.x > 0) {
                character.x -= characterSpeed
            }
            break;
        case (characterRight):
            if (character.x < gameWidth - character.height) {
                character.x += characterSpeed
            }
            break;
        case (characterUp):
            if (character.y > 0) {
                character.y -= characterSpeed
            }
            break;
        case (characterDown):
            if (character.y < gameHeight - character.height) {
                character.y += characterSpeed
            }
            break;
    }

}

