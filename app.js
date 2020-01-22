/*
PLAYGHROUND SETTINGS
*/
const BASE_UNIT = 20;
const RIGHT_BORDER = 1280;
const BOTTOM_BORDER = 720;
const PLAYGROUND_REFRESH = 250;

/*
SNAKE SETTINGS
*/
let positionHeadLeft = 640;
let positionHeadTop = 360;
let moveDirection = "DOWN";

let nextMoveLeft = positionHeadLeft;
let nextMoveTop = positionHeadTop + BASE_UNIT;

let positionFoodLeft = 820;
let positionFoodTop = 500;

// x, y, id
let snakeBody = [];
snakeBody.push([640, 340, 0]);
snakeBody.push([640, 320, 1]);
snakeBody.push([640, 300, 2]);

/*
OTHER VARIABLES
*/
let playgroundRefresh;

/*
FUNCTIONS
*/

function startGame() {
    document.getElementById("playground").style.width = RIGHT_BORDER.toString() + "px";
    document.getElementById("playground").style.height = BOTTOM_BORDER.toString() + "px";

    for(let i = 0; i !== snakeBody.length; ++i) {
        let s = document.createElement("div");
        s.setAttribute("id", snakeBody[i][2].toString());
        s.setAttribute("class", "snakeBody");
        s.style.left = snakeBody[i][0].toString() + "px";
        s.style.top = snakeBody[i][1].toString() + "px";
        document.body.appendChild(s);
    }

    document.getElementById("snakeFood").style.left = positionFoodLeft.toString() + "px";
    document.getElementById("snakeFood").style.top = positionFoodTop.toString() + "px";  

    document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";
    document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

    playgroundRefresh = setInterval(moveSnake, PLAYGROUND_REFRESH)
}

function nextMove() {
    if((nextMoveLeft < 0) || (nextMoveLeft === RIGHT_BORDER) || (nextMoveTop <= 0) || (nextMoveTop > BOTTOM_BORDER)) {
        return false;
    }
    else if(positionHeadLeft === positionFoodLeft && positionHeadTop === positionFoodTop) {
        eatFood();
        return true;
    }
    return true;
}

function endOfGame() {
    if(confirm("*** Game over! ***\nStart a new game?")) {
        document.location.reload(true);
    }
    else clearInterval(playgroundRefresh);
}

function eatFood() {
    snakeBody.push([positionFoodLeft, positionFoodTop, snakeBody.length]);
    let s = document.createElement("div");
    s.setAttribute("id", (snakeBody.length-1).toString());
    s.setAttribute("class", "snakeBody");
    document.body.appendChild(s);

    positionFoodLeft = Math.floor(Math.random() * (RIGHT_BORDER/BASE_UNIT))*BASE_UNIT;
    positionFoodTop = Math.floor(Math.random() * (BOTTOM_BORDER/BASE_UNIT))*BASE_UNIT;

    document.getElementById("snakeFood").style.left = positionFoodLeft + "px";
    document.getElementById("snakeFood").style.top = positionFoodTop + "px"; 
}

function drawSnakeBody() {
    for(let x = 0; x !== snakeBody.length; ++x) {
        let sID = x;
        document.getElementById(sID).style.left = snakeBody[x][0].toString() + "px";
    }
    for(let x = 0; x !== snakeBody.length; ++x) {
        let sID = x;
        document.getElementById(sID).style.top = snakeBody[x][1].toString() + "px";
    }
}

function moveSnake() {
    switch(moveDirection) {
        case "LEFT":
            nextMoveLeft -= BASE_UNIT;

            if(nextMove()) {
                for(let x = snakeBody.length; x !== 0; --x) {
                    for(let y = 0; y !== 2; ++y) {
                        if(x === 1 && y === 0) {
                            snakeBody[x-1][y] = positionHeadLeft;
                        }
                        else if (x === 1 && y === 1) {
                            snakeBody[x-1][y] = positionHeadTop;
                        }
                        else snakeBody[x-1][y] = snakeBody[x-2][y];
                    }
                }

                positionHeadLeft -= BASE_UNIT;
                document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";

                drawSnakeBody();
            }
            else endOfGame();
            break;

        case "RIGHT":
            nextMoveLeft += BASE_UNIT;
            
            if(nextMove()) {
                for(let x = snakeBody.length; x !== 0; --x) {
                    for(let y = 0; y !== 2; ++y) {
                        if(x === 1 && y === 0) {
                            snakeBody[x-1][y] = positionHeadLeft;
                        }
                        else if (x === 1 && y === 1) {
                            snakeBody[x-1][y] = positionHeadTop;
                        }
                        else snakeBody[x-1][y] = snakeBody[x-2][y];
                    }
                }

                positionHeadLeft += BASE_UNIT;
                document.getElementById("snakeHead").style.left = positionHeadLeft.toString() + "px";

                drawSnakeBody();
            }
            else endOfGame();
            break;

        case "UP":
            nextMoveTop -= BASE_UNIT;

            if(nextMove()) {
                for(let x = snakeBody.length; x !== 0; --x) {
                    for(let y = 0; y !== 2; ++y) {
                        if(x === 1 && y === 0) {
                            snakeBody[x-1][y] = positionHeadLeft;
                        }
                        else if (x === 1 && y === 1) {
                            snakeBody[x-1][y] = positionHeadTop;
                        }
                        else snakeBody[x-1][y] = snakeBody[x-2][y];
                    }
                }

                positionHeadTop -= BASE_UNIT;
                document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

                drawSnakeBody();
            }
            else endOfGame();
            break;

        case "DOWN":
            nextMoveTop += BASE_UNIT;

            if(nextMove()) {
                for(let x = snakeBody.length; x !== 0; --x) {
                    for(let y = 0; y !== 2; ++y) {
                        if(x === 1 && y === 0) {
                            snakeBody[x-1][y] = positionHeadLeft;
                        }
                        else if (x === 1 && y === 1) {
                            snakeBody[x-1][y] = positionHeadTop;
                        }
                        else snakeBody[x-1][y] = snakeBody[x-2][y];
                    }
                }

                positionHeadTop += BASE_UNIT;
                document.getElementById("snakeHead").style.top = positionHeadTop.toString() + "px";

                drawSnakeBody();
            }
            else endOfGame();
            break;
    }
}

let event = document.getElementById("playground");

document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            // LEFT key, forbidden to move RIGHT
            if(moveDirection === "RIGHT") {
                break;
            }
            else moveDirection = "LEFT";
            break;
        case 38:
            // UP key, forbidden to move DOWN
            if(moveDirection === "DOWN") {
                break;
            }
            else moveDirection = "UP";
            break;
        case 39:
            // RIGHT key, forbidden to move LEFT
            if(moveDirection === "LEFT") {
                break;
            }
            else moveDirection = "RIGHT";
            break;
        case 40:
            // DOWN key, forbidden to move UP
            if(moveDirection === "UP") {
                break;
            }
            else moveDirection = "DOWN";
            break;
        }
    };