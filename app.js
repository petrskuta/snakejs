// Class Food with coordinates, functions to create and eat food
class Food {
    constructor () {
        this.positionX = 0;
        this.positionY = 0;
    }

    create(borderX, borderY, baseUnit) {
        // Generate random coordinate in the interval of <0, border>
        this.positionX = Math.floor(Math.random() * (borderX/baseUnit))*baseUnit;
        this.positionY = Math.floor(Math.random() * (borderY/baseUnit))*baseUnit;

        if(checkSnakeBody(this.positionX, this.positionY)) {
            this.create(borderX, borderY, baseUnit);
        }
        else {
            document.getElementById("snakeFood").style.left = this.positionX + "px";
            document.getElementById("snakeFood").style.top = this.positionY + "px"; 
        }
    }
}

// Snake
class Snake {
    constructor () {
        // Columns [x, y, id]
        this.body = [ [640, 340, 0], [640, 320, 1], [640, 300, 2] ];
        this.moveDirection = "DOWN";
    }

    // Drawing snake's body according to coordinates stored in the main array
    drawBody() {
        for(let x = 0; x !== this.body.length; ++x) {
            let sID = x;
            document.getElementById(sID).style.left = this.body[x][0].toString() + "px";
        }
        for(let x = 0; x !== this.body.length; ++x) {
            let sID = x;
            document.getElementById(sID).style.top = this.body[x][1].toString() + "px";
        }
    }

    // Pushing snake's coordinates through whole array
    pushCoordinates(positionX, positionY) {
        for (let x = this.body.length; x !== 0; --x) {
            for (let y = 0; y !== 2; ++y) {
                if (x === 1 && y === 0) {
                    this.body[x - 1][y] = positionX;
                }
                else if (x === 1 && y === 1) {
                    this.body[x - 1][y] = positionY;
                }
                else
                    this.body[x - 1][y] = this.body[x - 2][y];
            }
        }
    }

    // Transfering food coordinates into snakes's body and creating one new unit
    eat(foodX, foodY) {
        this.body.push([foodX, foodY, this.body.length]);
        let s = document.createElement("div");
        s.setAttribute("id", (this.body.length-1).toString());
        s.setAttribute("class", "snakeBody");
        document.body.appendChild(s);
    }
}

// PLAYGHROUND SETTINGS
const BASE_UNIT = 20;
const RIGHT_BORDER = 1280;
const BOTTOM_BORDER = 720;
const PLAYGROUND_REFRESH = 250;

// SNAKE SETTINGS
let positionHeadLeft = 640;
let positionHeadTop = 360;

// OTHER VARIABLES
let playgroundRefresh;
let food = new Food();
let snake = new Snake();

// FUNCTIONS
function startGame() {
    document.getElementById("playground").style.width = RIGHT_BORDER.toString() + "px";
    document.getElementById("playground").style.height = BOTTOM_BORDER.toString() + "px";

    for(let i = 0; i !== snake.body.length; ++i) {
        let s = document.createElement("div");
        s.setAttribute("id", snake.body[i][2].toString());
        s.setAttribute("class", "snakeBody");
        s.style.left = snake.body[i][0].toString() + "px";
        s.style.top = snake.body[i][1].toString() + "px";
        document.body.appendChild(s);
    }

    food.create(RIGHT_BORDER, BOTTOM_BORDER, BASE_UNIT, false, snake.body);

    document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";
    document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

    playgroundRefresh = setInterval(moveSnake, PLAYGROUND_REFRESH)
}

// Checking given coordinates against snake's body (not head)
function checkSnakeBody(positionX, positionY) {
    for(let i = 0; i !== snake.body.length; ++i) {
        if(positionX === snake.body[i][0] && positionY === snake.body[i][1]) {
            return true;
        }
    }
    return false;
}

// Next move cannot be on the position of snake body nor playground border
function nextMove(nextMoveLeft, nextMoveTop) {
    if((nextMoveLeft < 0) || (nextMoveLeft === RIGHT_BORDER) || (nextMoveTop < 0) || (nextMoveTop === BOTTOM_BORDER)) {
        return false;
    }
    else if(checkSnakeBody(nextMoveLeft, nextMoveTop)) {
        return false;
    }
    else if(positionHeadLeft === food.positionX && positionHeadTop === food.positionY) {
        snake.eat(food.positionX, food.positionY);
        food.create(RIGHT_BORDER, BOTTOM_BORDER, BASE_UNIT);
        return true;
    }
    return true;
}

// Dialog with possibility to restart (reload) the game
function endOfGame() {
    if(confirm(`*** Game over! ***\n** You scored ${snake.body.length-3} points! **\n* Start a new game? *`)) {
        document.location.reload(true);
    }
    else clearInterval(playgroundRefresh);
}

// Main function that handles the snake's move
function moveSnake() {
    switch(snake.moveDirection) {
        case "LEFT":
            if(nextMove(positionHeadLeft - BASE_UNIT, positionHeadTop)) {
                snake.pushCoordinates(positionHeadLeft, positionHeadTop);

                positionHeadLeft -= BASE_UNIT;
                document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";

                snake.drawBody();
            }
            else endOfGame();
            break;

        case "RIGHT":            
            if(nextMove(positionHeadLeft + BASE_UNIT, positionHeadTop)) {
                snake.pushCoordinates(positionHeadLeft, positionHeadTop);

                positionHeadLeft += BASE_UNIT;
                document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";

                snake.drawBody();
            }
            else endOfGame();
            break;

        case "UP":
            if(nextMove(positionHeadLeft, positionHeadTop - BASE_UNIT)) {
                snake.pushCoordinates(positionHeadLeft, positionHeadTop);

                positionHeadTop -= BASE_UNIT;
                document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

                snake.drawBody();
            }
            else endOfGame();
            break;

        case "DOWN":
            if(nextMove(positionHeadLeft, positionHeadTop + BASE_UNIT)) {
                snake.pushCoordinates(positionHeadLeft, positionHeadTop);

                positionHeadTop += BASE_UNIT;
                document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

                snake.drawBody();
            }
            else endOfGame();
            break;
    }
}

// Handling pressed key
let event = document.getElementById("playground");

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            // LEFT key, forbidden to move RIGHT
            if(snake.moveDirection === "RIGHT") {
                break;
            }
            else snake.moveDirection = "LEFT";
            break;
        case 38:
            // UP key, forbidden to move DOWN
            if(snake.moveDirection === "DOWN") {
                break;
            }
            else snake.moveDirection = "UP";
            break;
        case 39:
            // RIGHT key, forbidden to move LEFT
            if(snake.moveDirection === "LEFT") {
                break;
            }
            else snake.moveDirection = "RIGHT";
            break;
        case 40:
            // DOWN key, forbidden to move UP
            if(snake.moveDirection === "UP") {
                break;
            }
            else snake.moveDirection = "DOWN";
            break;
        }
    };