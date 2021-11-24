function toggleMenu() {
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.toggle('active');
    toggle.classList.toggle('active');
}
function toggleMenuRev() {
    let navigation = document.querySelector('.navigation');
    let toggle = document.querySelector('.toggle');
    navigation.classList.remove('active');
    toggle.classList.remove('active');
}

window.addEventListener('load', function () {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(hide, 604)
})

function hide(){
    document.querySelector('.preloader').style.display = 'none';

}