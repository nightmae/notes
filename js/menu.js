const hamB = document.querySelector('#hamburger');
const sideB = document.querySelector('#sidebar');
const h2 = document.querySelector('h2');

let isSidebarOpen = false;

hamB.addEventListener('click', function() {
    isSidebarOpen = !isSidebarOpen;

    if(isSidebarOpen) {
        sideB.style.width = '300px';
        h2.style.visibility = 'visible';
    } else {
        sideB.style.width = '10%';
        h2.style.visibility = 'hidden';
    }
});