let count = 0
let tim = 5
let message = document.getElementsByClassName('message');
let inter = setInterval(() =>{
    if (tim === 1){
        if (count === 0) {
            intro.style.display = 'none';
        }
        else if (count === 1) {
            achno.style.display = 'none';
        }
        else if (count === 2){
            cer.style.display = 'none';
        }
        tim = 6;
        count += 1;
    }
    tim -= 1
    message[count].innerHTML = 'Next page in '+tim+' seconds...';
}, 1000);

setTimeout(() =>{
    clearInterval(inter);
    document.querySelector('.first').style.display = 'none';
}, 15000);

