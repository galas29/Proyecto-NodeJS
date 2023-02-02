
/*  ==============  accion para que muestre el menu lateral  */

let menu = document.getElementById('menu');
let menu_bar = document.getElementById('menu_bar');

menu_bar.addEventListener('click', function(){
    menu.classList.toggle('show-menu')
})