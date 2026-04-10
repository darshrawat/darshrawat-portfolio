// 
// PREMIUM DARK EDITORIAL - INTERACTIVITY
// 

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. REVEAL ANIMATION (INTERSECTION OBSERVER)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. HERO PARALLAX (Scroll Based)
    const heroBg = document.querySelector('.hero-bg-media img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.2) {
            heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.4}px)`;
        }
    });

    // 3. MOUSE DEPTH FOR CASE STUDIES
    const caseStudies = document.querySelectorAll('.case-study');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        caseStudies.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (y > rect.top && y < rect.bottom) {
                const img = card.querySelector('img');
                const xMove = (window.innerWidth / 2 - x) / 100;
                const yMove = (window.innerHeight / 2 - y) / 100;
                
                if (img) {
                    img.style.transform = `scale(1.05) translate(${xMove}px, ${yMove}px)`;
                }
            }
        });
    });

    // 4. SMOOTH SCROLL FOR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. MINI PIXEL SPARKLE GENERATOR (Subtle)
    function createSparkle() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '2px';
        sparkle.style.height = '2px';
        sparkle.style.background = Math.random() > 0.5 ? '#ADFF2F' : '#6D28D9';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.zIndex = '5';
        sparkle.style.boxShadow = '0 0 10px ' + sparkle.style.background;
        
        hero.appendChild(sparkle);
        
        const anim = sparkle.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1.5)' },
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 2000, easing: 'ease-in-out' });

        anim.onfinish = () => sparkle.remove();
    }

    setInterval(createSparkle, 1000);

});
