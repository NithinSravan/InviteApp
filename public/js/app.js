//sticky header
window.onscroll = function () { myFunction() };

let header = document.getElementById("navbar");
let sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
