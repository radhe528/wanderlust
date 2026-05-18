const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide the menu
    navLinks.classList.toggle('active');
    
    // Optional: Add an animation to the burger icon
    burger.classList.toggle('toggle');
});
