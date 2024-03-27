function changeNavBar(){
    var navbar = document.getElementById('navbar');
    var logo = document.getElementById('logo');
    var navlinks = document.getElementById('nav-links');

    var scrollVal = window.scrollY;

    if(scrollVal < 180){
        navbar.classList.remove('navi-on-scroll');  
    }
    else{
        navbar.classList.add('navi-on-scroll');
    }
    console.log(scrollVal)
    
}

window.addEventListener('scroll', changeNavBar);