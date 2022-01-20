//Game constants and variables
let inputDir = { x: 1, y: 0 };
const foodSound = new Audio('fruit eat.wav');
const gameOverSound = new Audio('wall hit.mp3');
const moveSound = new Audio('take turn.wav');
const musicSound = new Audio('bgsong.mp3');
let playing = false;
let speed = 6;
let hiscoreval = 0;
let lastPaintTime = 0;
let score = 0
let snakeArr = [
    { x: 9, y: 9 }
]
let a = 1;
let b = 25;
food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

//Game Buttons
play_pause.addEventListener('click', () => {
    if (playing === false) {
        playing = true;
        play_pause.innerHTML = 'Pause';
    }
    else {
        playing = false;
        play_pause.innerHTML = 'Play';
    }
    moveSound.play();
});
restart.addEventListener('click', ()=>{
    gameover.classList.toggle('active');
    playing = true;
    inputDir = { x: 1, y: 0 };
    document.getElementById('score').innerHTML = "Score: 0" ;
    moveSound.play();
    play_pause.innerHTML = 'Pause';
});
restart_1.addEventListener('click', ()=>{
    playing = true;
    inputDir = { x: 1, y: 0 };
    score = 0;
    snakeArr = [{ x: 9, y: 9 }];
    document.getElementById('score').innerHTML = "Score: 0" ;
    play_pause.innerHTML = 'Pause';
    moveSound.play();
});

move_up.addEventListener('click', ()=>{
    inputDir.y = -1;
    inputDir.x = 0;
    moveSound.play();

});
move_down.addEventListener('click', ()=>{
    inputDir.y = 1;
    inputDir.x = 0;
    moveSound.play();

});
move_left.addEventListener('click', ()=>{
    inputDir.y = 0;
    inputDir.x = -1;
    moveSound.play();

});
move_right.addEventListener('click', ()=>{
    inputDir.y = 0;
    inputDir.x = 1;
    moveSound.play();

});
let swap_reversed = false;
swap_control.addEventListener('click', ()=>{
    if (swap_reversed){
        buttons_swap.style= "flex-direction: row";
        swap_reversed = false;
    }
    else{
        buttons_swap.style= "flex-direction: row-reverse";
        swap_reversed = true;

    }
});




//Game functions
window.requestAnimationFrame(main);
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime)
    if (playing) {
        gameEngine();
    }
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snakeArr[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into the wall
    if (snake[0].x > 25 || snake[0].x <= 0 || snake[0].y > 25 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {

    // Part 1: Updatring the snake array and Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        c_score.innerHTML = "Current Score: " + score;
        h_score.innerHTML = "High Score: " + hiscoreval;
        gameover.classList.add('active');
        snakeArr = [{ x: 9, y: 9 }];
        // musicSound.play();
        score = 0;
        playing = false;
        play_pause.innerHTML = 'Play';
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        score += 1;
        document.getElementById('score').innerHTML = "Score: " + score;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highscore.innerHTML = "High Score: " + hiscoreval;
        }
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2: Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
            if (inputDir.x === -1 && inputDir.y === 0) {
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if (inputDir.x === 0 && inputDir.y === 1) {
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if (inputDir.x === 0 && inputDir.y === -1) {
                snakeElement.style.transform = "rotate(270deg)";
            }
            else{
                snakeElement.style.transform = "rotate(0deg)";
            }
        }
        else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//Main logic starts here
let hiscore = localStorage.getItem('hiscore');
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscore', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    highscore.innerHTML = "High Score: " + hiscoreval;
}

window.addEventListener('keydown', e => {   // keyboard controls
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.y = 0;
            inputDir.x = -1;
            break;

        case "ArrowRight":
            inputDir.y = 0;
            inputDir.x = 1;
            break;

        default:
            break;
    }
});

musicSound.play();
let music = setInterval(() => {
    musicSound.play();
}, 1);



