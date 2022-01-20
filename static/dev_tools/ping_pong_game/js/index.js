//variable declaration
let colors = ["#ff2a2a", "#d225ff", "#2591ff", "#7aff25", "#3125ff", "#ff2595"];
let color_picker_r =colors[ Math.round(6 * Math.random())];
let color_picker_l = colors[ Math.round(6 * Math.random())];
let color_picker_ball = colors[ Math.round(6 * Math.random())];
let choice = [1, -1];
let score = 0;
let speed = 5;
let playing = false;
let lastPaintTime = 0;
let velocity = {x:choice[Math.round(Math.random())], y:choice[Math.round(Math.random())]};
let cur_location = {x: 30, y: 4 + Math.round(30 * Math.random())};
let board = document.getElementById('board');
let no_of_bat = 4;
let bat_r_location = {x: 0, y: 17}
let bat_l_location = {x: 60, y: 17}
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
    if ((ctime - lastPaintTime)/ 1000 < 1/speed) {
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
    if(multiplayer){
        if(e === 'r')
            score_disp.innerHTML = "Player 2 Wins!!";
        if(e === 'l')
            score_disp.innerHTML = "Player 1 Wins!!";
    }
    else{
        score_disp.innerHTML = "Score: "+score;
    }
    game_over.classList.add('active');
}

//restart
function restart() {
    score = 0;
    game_over.classList.toggle('active');
    velocity = {x:choice[Math.round(Math.random())], y:choice[Math.round(Math.random())]};
    cur_location = {x: 30, y: 4 + Math.round(30 * Math.random())};
    speed = 5;
    playing = true;
    clearInterval(speed_inc);
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
    if(location.y === 0){
        return('t');
    }
    else if(location.y === 36){
        return('b');
    }
    else{
        return('n');
    }
}

//to bounce the ball
function is_bounce(location) {
    for (let i = 0; i < no_of_bat; i++) {
        if (location.x === 1 && location.y === bat_r_location.y+i) {
            color_picker_l = colors[ Math.round(6 * Math.random())];
            color_picker_ball = color_picker_r;
            return('r');
        }
        if(location.x === 59 && location.y === bat_l_location.y+i){
            color_picker_r =colors[ Math.round(6 * Math.random())];
            color_picker_ball = color_picker_l;
            return('l');
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

    //creating the bats
    spawn_bats();

    //reflecting the ball
    if(is_reflect(cur_location) === 't'){
        velocity.y = 1;
    }
    if(is_reflect(cur_location) === 'b'){
        velocity.y = -1;
    }

    //bouncing the ball
    if(is_bounce(cur_location) === 'r'){
        velocity.x = 1;
    }
    if(is_bounce(cur_location) === 'l'){
        velocity.x = -1;
    }

    // move bats
    if(bat_r_up){
        if (bat_r_location.y > 1) {
            bat_r_location.y -= 1;
        }
    }
    if(bat_r_down){
        if (bat_r_location.y < 33) {
            bat_r_location.y += 1;
        }
    }
    if(bat_l_up){
        if (bat_l_location.y > 1) {
            bat_l_location.y -= 1;
        }
    }
    if(bat_l_down){
        if (bat_l_location.y < 33) {
            bat_l_location.y += 1;
        }
    }

    // singleplayer mode 
    if(multiplayer === false){
        if(cur_location.y-bat_l_location.y > 1){
            bat_l_location.y += 1;
        }
        else if(cur_location.y - bat_l_location.y < 1){
            bat_l_location.y -= 1;
        }
        else{
            bat_l_location.y += velocity.y;
        }
    }

    // Game over
    if(cur_location.x === 0){
        gameover('r');
    }
    if(cur_location.x === 60){
        gameover('l');
    }
    
}

// faster timer
let lastPaintTime2 = 0;
window.requestAnimationFrame(branch);
function branch(ctime2) {
    window.requestAnimationFrame(branch);
    if ((ctime2 - lastPaintTime2)/ 1000 < 0.5/speed) {
        return;
    }
    lastPaintTime2 = ctime2;
    board.innerHTML = "";
    spawn_ball();
    spawn_bats();
    if(bat_r_up){
        if (bat_r_location.y > 1) {
            bat_r_location.y -= 1;
        }
    }
    if(bat_r_down){
        if (bat_r_location.y < 33) {
            bat_r_location.y += 1;
        }
    }
    if(bat_l_up){
        if (bat_l_location.y > 1) {
            bat_l_location.y -= 1;
        }
    }
    if(bat_l_down){
        if (bat_l_location.y < 33) {
            bat_l_location.y += 1;
        }
    }
}

//speed increaser
function Interval() {
    let speed_inc = setInterval(() => {
        speed += 0.5;
    }, 5000);
}

// Buttons functions 
play_pause.addEventListener('click', ()=>{
    if(playing === true){
        playing = false;
        play_pause.innerHTML = "Play";
        clearInterval(speed_inc);
    }
    else{
        playing = true;
        play_pause.innerHTML = "Pause";
        Interval()
        
    }
    control_panel.style.display = "none";
})

game_restart.addEventListener('click', ()=>{
    restart();
});

function clicked(e) {
    if(e === 1){
        bat_r_up = true;
        bat_r_down = false;
    }
    if(e === 2){
        bat_r_up = false;
        bat_r_down = true;
    }
    
    if(e === -1){
        bat_l_up = true;
        bat_l_down = false;
    }
    if(e === -2){
        bat_l_up = false;
        bat_l_down = true;
    }

}
function not_clicked(e) {
    if(e === 1){
        bat_r_up = false;
    }
    if(e === 2){
        bat_r_down = false;
    }
    if(e === -1){
        bat_l_up = false;
    }
    if(e === -2){
        bat_l_down = false;
    }
}


//multiplayer
is_multiplayer.addEventListener('click', ()=>{
    if(multiplayer === false){
        multiplayer = true;
        player_1.innerHTML = "Player 1";
        player_2.innerHTML = "Player 2";
        blocker.style.display = "none";
        is_multiplayer.innerHTML = "Single Player";
    }
    else{
        multiplayer = false;
        player_1.innerHTML = "Player";
        player_2.innerHTML = "Bot";
        blocker.style.display = "block";
        is_multiplayer.innerHTML = "Multi Player";
        
    }
});

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