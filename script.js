// Smooth scroll functionality
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on nav links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});
// Word Rotator
document.addEventListener('DOMContentLoaded', function() {
    const words = document.querySelectorAll('.rotator-word');
    if (words.length === 0) return;

    let currentIndex = 0;
    
    setInterval(() => {
        const currentWord = words[currentIndex];
        const nextIndex = (currentIndex + 1) % words.length;
        const nextWord = words[nextIndex];

        // Animate out current
        currentWord.classList.remove('active');
        currentWord.classList.add('exit');

        // Prepare next word to enter from bottom
        nextWord.style.transition = 'none';
        nextWord.classList.remove('exit');
        nextWord.classList.remove('active');
        
        // Force reflow to apply the instant position change
        void nextWord.offsetWidth;
        
        // Restore transition and animate in
        nextWord.style.transition = '';
        nextWord.classList.add('active');

        currentIndex = nextIndex;
    }, 2400);
});
