let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    console.log('Menu icon clicked'); // Debugging: Log when menu icon is clicked
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    console.log('Page scrolled'); // Debugging: Log when page is scrolled

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            console.log('Section in view:', id); // Debugging: Log section in view
            navLinks.forEach(link => {
                link.classList.remove('active');
                let selectedLink = document.querySelector(`header nav a[href*='${id}']`);
                if (selectedLink) {
                    console.log('Adding active class to:', id); // Debugging: Log active link
                    selectedLink.classList.add('active');
                }
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    console.log('Sticky class toggled'); // Debugging: Log when sticky class is toggled

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
   // reset: true,
    distance: '80px', 
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Youtuber', 'B.Tech Student'], 
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
});

