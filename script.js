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

// for theme changing

const colorPicker = document.getElementById('colorPicker');


colorPicker.addEventListener('input', function() {

    const selectedColor = colorPicker.value;

  
    document.documentElement.style.setProperty('--main-color', selectedColor);

   
    document.documentElement.style.setProperty('--bg-color', adjustColor(selectedColor, -50)); // Darker background
    document.documentElement.style.setProperty('--second-bg-color', adjustColor(selectedColor, -30)); // Slightly lighter background
    document.documentElement.style.setProperty('--text-color', getTextColor(selectedColor)); // Contrasting text color
    document.documentElement.style.setProperty('--border-color', adjustColor(selectedColor, -20)); // Border color
});

// Function to adjust color brightness
function adjustColor(color, amount) {
    let colorHex = color.substring(1); // Remove the '#' character
    let r = parseInt(colorHex.substring(0, 2), 16);
    let g = parseInt(colorHex.substring(2, 4), 16);
    let b = parseInt(colorHex.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Function to calculate text color based on contrast
function getTextColor(color) {
    let colorHex = color.substring(1);
    let r = parseInt(colorHex.substring(0, 2), 16);
    let g = parseInt(colorHex.substring(2, 4), 16);
    let b = parseInt(colorHex.substring(4, 6), 16);

    // Calculate brightness using a weighted formula
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // If brightness is below a certain threshold, return light color (white), else dark color (black)
    return brightness < 128 ? '#fff' : '#000';
}

