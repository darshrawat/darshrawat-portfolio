document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     SMOOTH SCROLLING FOR NAV LINKS
     ========================================= */
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Custom smooth scroll animation (Guaranteed to work regardless of OS settings or CSS bugs)
          const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 50;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime = null;

          function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / 600, 1); // 600ms duration
            
            // easeOutQuart easing function for very smooth stop
            const ease = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < 600) {
              requestAnimationFrame(animation);
            }
          }
          
          requestAnimationFrame(animation);

          // Element Highlighting Logic
          let elementsToFlash = [targetSection];
          
          // If Resume is clicked, make BOTH Education and Skills columns flash
          if (targetId === '#resume') {
             const skillsColumn = document.querySelector('.right-col');
             if (skillsColumn) {
               elementsToFlash.push(skillsColumn);
             }
          }

          // Apply flash animation to the elements
          elementsToFlash.forEach(el => {
            el.classList.remove('section-flash-highlight');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('section-flash-highlight');
            
            setTimeout(() => {
              el.classList.remove('section-flash-highlight');
            }, 800);
          });
          
          // Optionally push state to keep URL updated without jumping
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  /* =========================================
     ACTIVE NAV LINK UPDATING ON SCROLL
     ========================================= */
  // Find all sections that are targeted by nav items
  const sections = Array.from(navItems)
    .map(item => {
      const targetId = item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        return document.querySelector(targetId);
      }
      return null;
    })
    .filter(section => section !== null);
  
  const highlightNavLink = () => {
    let currentId = '';
    
    // Find the section that is currently most visible or at the top
    const scrollPosition = window.scrollY + 150; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });
    }
  };

  // Add scroll event listener for updating active link
  window.addEventListener('scroll', highlightNavLink);
  // Initial call
  highlightNavLink();

  /* =========================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
