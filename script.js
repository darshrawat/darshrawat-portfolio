// 
// BERRY HIGH-FIDELITY RECREATION - INTERACTIVITY
// 

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SIMPLE REVEAL ANIMATION
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    const revealTargets = document.querySelectorAll('.hero-content, .hero-visual, .green-bubble-card, .skills-section, .thanks-footer');
    revealTargets.forEach(target => {
        target.style.opacity = "0";
        target.style.transform = "translateY(20px)";
        target.style.transition = "all 0.6s ease-out";
        observer.observe(target);
    });

    // 2. SMOOTH SCROLLING FOR ALL ANCHORS
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

    // 3. HOVER DEPTH FOR SOFTWARE BOXES
    const softwareBoxes = document.querySelectorAll('.software-box');
    softwareBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.boxShadow = "10px 10px 0px var(--berry-purple)";
        });
        box.addEventListener('mouseleave', () => {
            box.style.boxShadow = "none";
        });
    });

});
