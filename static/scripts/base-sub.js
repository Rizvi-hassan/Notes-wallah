function toggle_cl12() {
    document.getElementById('inner-2').style.transform = "translateX(-100%)";
    document.getElementById('inner-3').style.transform = "translateX(-100%)";

    document.getElementById('line12').style.transform = "translateX(0%)";
    document.getElementById('line11').style.transform = "translateX(-101%)";
}

function toggle_cl11() {
    document.getElementById('inner-2').style.transform = "translateX(0%)";
    document.getElementById('inner-3').style.transform = "translateX(0%)";

    document.getElementById('line11').style.transform = "translateX(0%)";
    document.getElementById('line12').style.transform = "translateX(-101%)";

}