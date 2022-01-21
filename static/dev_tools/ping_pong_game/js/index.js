//variable declaration
const startGame = new Audio('audio/start.wav');
const gameOver = new Audio('audio/end.wav');
const hit = new Audio('audio/hit.wav');
let colors = ["#ff2a2a", "#d225ff", "#2591ff", "#7aff25", "#3125ff", "#ff2595"];
let color_picker_r = colors[Math.round(6 * Math.random())];
let color_picker_l = colors[Math.round(6 * Math.random())];
let color_picker_ball = colors[Math.round(6 * Math.random())];
let choice = [1, -1];
let score = 0;
let speed = 5;
let playing = false;
let lastPaintTime = 0;
let velocity = { x: choice[Math.round(Math.random())], y: choice[Math.round(Math.random())] };
let cur_location = { x: 30, y: 4 + Math.round(30 * Math.random()) };
let board = document.getElementById('board');
let no_of_bat = 5;
let bat_r_location = { x: 0, y: 17 }
let bat_l_location = { x: 60, y: 17 }
let bat_r_up = false;
let bat_r_down = false;
let bat_l_up = false;
let bat_l_down = false;
let multiplayer = false;
let highscoreval = 0;


//Engine start
window.requestAnimationFrame(main);
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    if (playing) {
        gameEngine();

    }

}

//game over
function gameover(e) {
    playing = false;
    gameOver.play();
    if (multiplayer) {
        if (e === 'r')
            score_disp.innerHTML = "Player 2 Wins!!";
        if (e === 'l')
            score_disp.innerHTML = "Player 1 Wins!!";
    }
    else {
        score_disp.innerHTML = "Score: " + score;
    }
    game_over.classList.add('active');
}

//restart
function restart() {
    startGame.play();
    score = 0;
    game_over.classList.toggle('active');
    velocity = { x: choice[Math.round(Math.random())], y: choice[Math.round(Math.random())] };
    cur_location = { x: 30, y: 4 + Math.round(30 * Math.random()) };
    speed = 5;
    playing = true;
    Interval();
}

//to spawn the ball
function spawn_ball() {
    let ball = document.createElement('div');
    ball.style.gridRowStart = cur_location.y;
    ball.style.gridColumnStart = cur_location.x;
    ball.style.background = color_picker_ball;
    ball.classList.add('ball');
    board.appendChild(ball);

}

function spawn_bats() {
    for (let i = 0; i < no_of_bat; i++) {
        let bat_r = document.createElement('div');
        bat_r.style.gridRowStart = bat_r_location.y + i;
        bat_r.style.gridColumnStart = bat_r_location.x;
        bat_r.style.background = color_picker_r;
        bat_r.classList.add('bat');
        board.appendChild(bat_r);
    }
    for (let i = 0; i < no_of_bat; i++) {
        let bat_l = document.createElement('div');
        bat_l.style.gridRowStart = bat_l_location.y + i;
        bat_l.style.gridColumnStart = bat_l_location.x;
        bat_l.style.background = color_picker_l;
        bat_l.classList.add('bat');
        board.appendChild(bat_l);
    }
}


//to reflect the ball
function is_reflect(location) {
    if (location.y === 0) {
        return ('t');
    }
    else if (location.y === 36) {
        return ('b');
    }
    else {
        return ('n');
    }
}

//to bounce the ball
function is_bounce(location) {
    for (let i = 0; i < no_of_bat; i++) {
        if (location.x === 1 && location.y === bat_r_location.y + i) {
            color_picker_l = colors[Math.round(6 * Math.random())];
            color_picker_ball = color_picker_r;
            return ('r');
        }
        if (location.x === 59 && location.y === bat_l_location.y + i) {
            color_picker_r = colors[Math.round(6 * Math.random())];
            color_picker_ball = color_picker_l;
            return ('l');
        }
    }
}

// Actual Game Engine starts here
function gameEngine() {
    //clening the board
    board.innerHTML = "";

    // creating the ball
    spawn_ball();

    // moving the ball
    cur_location.x += velocity.x;
    cur_location.y += velocity.y;
    score += 1;
    if (score > highscoreval) {
        highscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(highscoreval));
        high_score.innerHTML = "High Score: " + highscoreval;
        high_score_1.innerHTML = "High Score: " + highscoreval;
    }
    pause_score.innerHTML = "Score: " + score;
    pause_hscore.innerHTML = "High Score: " + highscoreval;

    //creating the bats
    spawn_bats();

    //reflecting the ball
    if (is_reflect(cur_location) === 't') {
        hit.play();
        velocity.y = 1;
    }
    if (is_reflect(cur_location) === 'b') {
        hit.play();
        velocity.y = -1;
    }

    //bouncing the ball
    if (is_bounce(cur_location) === 'r') {
        hit.play();
        velocity.x = 1;
    }
    if (is_bounce(cur_location) === 'l') {
        hit.play();
        velocity.x = -1;
    }

    // move bats
    // if(bat_r_up === true){
    //     if (bat_r_location.y > 1) {
    //         bat_r_location.y -= 1;
    //         console.log('working')
    //     }
    // }
    // if(bat_r_down === true){
    //     if (bat_r_location.y < 33) {
    //         bat_r_location.y += 1;

    //     }
    // }
    // if(multiplayer === true){
    //     if(bat_l_up === true){
    //         if (bat_l_location.y > 1) {
    //             bat_l_location.y -= 1;

    //         }
    //     }
    //     if(bat_l_down === true){
    //         if (bat_l_location.y < 33) {
    //             bat_l_location.y += 1;

    //         }
    //     }
    // }

    // singleplayer mode 
    if (multiplayer === false) {
        bat_l_location.y = cur_location.y - 2;
    }

    // Game over
    if (cur_location.x === 0) {
        gameover('r');
    }
    if (cur_location.x === 60) {
        gameover('l');
    }

}

// faster timer
let lastPaintTime2 = 0;
window.requestAnimationFrame(branch);
function branch(ctime2) {
    window.requestAnimationFrame(branch);
    if ((ctime2 - lastPaintTime2) / 1000 < 0.5 / speed) {
        return;
    }
    lastPaintTime2 = ctime2;
    board.innerHTML = "";
    spawn_ball();
    spawn_bats();
    if (bat_r_up === true) {
        if (bat_r_location.y > 1) {
            bat_r_location.y -= 1;
        }
    }
    if (bat_r_down === true) {
        if (bat_r_location.y < 33) {
            bat_r_location.y += 1;

        }
    }
    if (multiplayer === true) {
        if (bat_l_up === true) {
            if (bat_l_location.y > 1) {
                bat_l_location.y -= 1;

            }
        }
        if (bat_l_down === true) {
            if (bat_l_location.y < 33) {
                bat_l_location.y += 1;

            }
        }
    }

}

//speed increaser
function Interval() {
    let speed_inc = setInterval(() => {
        speed += 0.5;
    }, 5000);
}

function playPause() {
    if (playing === true) {
        playing = false;
        play_pause.innerHTML = "Play";
        pause_logo.classList.replace('fa-pause', 'fa-play');
    }
    else {
        playing = true;
        Interval()
        play_pause.innerHTML = "Pause";
        startGame.play();
        control_panel.style.display = "none";
        pause_logo.classList.replace('fa-play', 'fa-pause');

    }
}

// Buttons functions 
play_pause.addEventListener('click', () => {
    playPause();
})
pause_logo.addEventListener('click', () => {
    playPause();
})

game_restart.addEventListener('click', () => {
    restart();
});

function clicked(e) {
    if (e === 1) {
        if (bat_r_location.y > 1) {
            bat_r_up = true;
            bat_r_down = false;
        }
    }
    if (e === 2) {
        if (bat_r_location.y < 32) {
            bat_r_up = false;
            bat_r_down = true;
        }
    }
    if (e === -1) {
        if (bat_l_location.y > 1) {
            bat_l_up = true;
            bat_l_down = false;
        }
    }
    if (e === -2) {
        if (bat_l_location.y < 32) {
            bat_l_down = true;
            bat_l_up = false;
        }
    }
}

function notClicked(e) {
    if (e === 1) {
        bat_r_up = false
    }
    if (e === 2) {
        bat_r_down = false
    }
    if (e === -1) {
        bat_l_up = false
    }
    if (e === -2) {
        bat_l_down = false
    }
}

function run_multiplayer() {
    if (multiplayer === false) {
        multiplayer = true;
        player_1.innerHTML = "Player 1";
        player_2.innerHTML = "Player 2";
        blocker.style.display = "none";
        is_multiplayer.innerHTML = "Single Player";
        player_logo.classList.replace('fa-user', 'fa-users');

    }
    else {
        multiplayer = false;
        player_1.innerHTML = "Player";
        player_2.innerHTML = "Bot";
        blocker.style.display = "block";
        is_multiplayer.innerHTML = "Multi Player";
        player_logo.classList.replace('fa-users', 'fa-user');

    }

}

//multiplayer
is_multiplayer.addEventListener('click', run_multiplayer);
player_logo.addEventListener('click', run_multiplayer);

let highscore = localStorage.getItem('highscore');
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem('highscore', JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    high_score.innerHTML = "High Score: " + highscoreval;
    high_score_1.innerHTML = "High Score: " + highscoreval;
}


if ("ontouchstart" in document.documentElement) {

    r_go_up.addEventListener('touchstart', () => {
        clicked(1);
    });
    r_go_down.addEventListener('touchstart', () => {
        clicked(2);
    });
    l_go_up.addEventListener('touchstart', () => {
        clicked(-1);
    });
    l_go_down.addEventListener('touchstart', () => {
        clicked(-2);
    });

    r_go_up.addEventListener('touchend', () => {
        notClicked(1);
    });
    r_go_down.addEventListener('touchend', () => {
        notClicked(2);
    });
    l_go_up.addEventListener('touchend', () => {
        notClicked(-1);
    });
    l_go_down.addEventListener('touchend', () => {
        notClicked(-2);
    });
}
else {

    r_go_up.addEventListener('mousedown', () => {
        clicked(1);
    });
    r_go_down.addEventListener('mousedown', () => {
        clicked(2);
    });
    l_go_up.addEventListener('mousedown', () => {
        clicked(-1);
    });
    l_go_down.addEventListener('mousedown', () => {
        clicked(-2);
    });

    r_go_up.addEventListener('mouseup', () => {
        notClicked(1);
    });
    r_go_down.addEventListener('mouseup', () => {
        notClicked(2);
    });
    l_go_up.addEventListener('mouseup', () => {
        notClicked(-1);
    });
    l_go_down.addEventListener('mouseup', () => {
        notClicked(-2);
    });
}




window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            clicked(-1);
            break;

        case "ArrowDown":
            clicked(-2);
            break;

        case "w":
            clicked(1);
            break;

        case "s":
            clicked(2);
            break;

        default:
            break;
    }
});
window.addEventListener('keyup', e => {
    switch (e.key) {
        case "ArrowUp":
            notClicked(-1);
            break;

        case "ArrowDown":
            notClicked(-2);
            break;

        case "w":
            notClicked(1);
            break;

        case "s":
            notClicked(2);
            break;

        default:
            break;
    }
});

