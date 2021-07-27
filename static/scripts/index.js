let head1 = document.getElementById('head-1');
let head2 = document.getElementById('head-2');
function toggle_cl11() {
    // alert('working');
    document.querySelector('.head-1').classList.add('active');
    document.querySelector('.head-2').classList.remove('active');
    document.querySelector('#c11').classList.remove('active');
}
function toggle_cl12() {
    // alert('working');
    document.querySelector('.head-1').classList.remove('active');
    document.querySelector('.head-2').classList.add('active');
    document.querySelector('#c11').classList.add('active');
}