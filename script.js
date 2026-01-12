// --- DOM Elements ---
const themeToggleBtn = document.getElementById('theme-toggle');
const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const htmlElement = document.documentElement;

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = mobileMenuBtn.querySelector('svg'); // Select the SVG inside the button

// --- 1. Dark Mode Logic (Keep Existing) ---
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    updateIcons('dark');
} else {
    htmlElement.classList.remove('dark');
    updateIcons('light');
}

function toggleTheme() {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateIcons('light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateIcons('dark');
    }
}

function updateIcons(theme) {
    if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        if (mobileThemeToggleBtn) mobileThemeToggleBtn.textContent = '☀️';
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        if (mobileThemeToggleBtn) mobileThemeToggleBtn.textContent = '◑';
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);
if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


// --- 2. IMPROVED Mobile Menu Animation ---

mobileMenuBtn.addEventListener('click', () => {
    // 1. Toggle the 'open' class for the slide/fade effect
    mobileMenu.classList.toggle('open');

    // 2. Animate the Hamburger Icon (Rotate)
    mobileMenuBtn.classList.toggle('rotate-90');

    // 3. Toggle CSS 'hidden' class with a slight delay if closing
    if (mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('hidden');
    } else {
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 400); // Wait for animation to finish
    }
});

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuBtn.classList.remove('rotate-90');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 400);
    });
});


// --- 3. NEW: Scroll Reveal Animation (Intersection Observer) ---

const observerOptions = {
    root: null,           // viewport
    rootMargin: '0px',    // no margin
    threshold: 0.1        // trigger when 10% of element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'active' class to trigger CSS transition
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements with the 'reveal' class
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => observer.observe(el));