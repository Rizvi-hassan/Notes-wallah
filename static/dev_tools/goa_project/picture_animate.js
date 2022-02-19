let pic = 1;
let all = [" Goa is the paradise of South Asia ", " Goa is where my heart belongs ", " When life hits you with boredom, Escape to Goa! ", " Goa defines thrill in the most astonishing ways... ", " Goa is calling, and you must go... "]
let item = 0;

let head = document.querySelector('.header');
setInterval(() => {
    head.style.background = 'url(\'img/goa_' + pic + '.png\') no-repeat center/cover';
    pic += 1
    if (pic === 6) { pic = 1 }
}, 3000)


let flag = true;
let pipe = document.getElementById('pipe');
setInterval(() => {
    if (flag) { pipe.innerHTML = ""; flag = false; }
    else { pipe.innerHTML = "|"; flag = true; }
}, 300)


let text = all[item];
let str = "";
let inc = 1;
let i = 0;
function typeWriter() {
    if (i < text.length && inc === 1){
        str += text.charAt(i);
        typing.innerHTML = str;
        i += inc;
        setTimeout(typeWriter, 100)
    }
    else if (i === text.length){
        inc = -1;
        i += inc;
        str.slice(0, -1);
        setTimeout(typeWriter, 3000)
    }
    else if(i > 0 && inc === -1){
        str = str.slice(0, -1);
        typing.innerHTML = str;
        i += inc;
        setTimeout(typeWriter, 100)
    }
    else if (i === 0){
        inc = 1;
        i += inc;
        item = (item === all.length-1)? 0 : item+1 ;
        text = all[item];
        setTimeout(typeWriter, 100)
    }

}

setTimeout(typeWriter, 15000)

function Scroll_by(y) {
    window.scrollTo({
        top: y*window.innerHeight,
        left: 0, 
        behavior: "smooth"
    })
}