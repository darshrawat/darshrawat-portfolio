document.addEventListener('DOMContentLoaded', () => {
  /* =========================================
     DATE & YEAR
     ========================================= */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =========================================
     DARK/LIGHT THEME TOGGLE
     ========================================= */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme in localStorage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      body.classList.replace('light-mode', 'dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.replace('dark-mode', 'light-mode');
      localStorage.setItem('theme', 'light');
    }
  });

  /* =========================================
     MOBILE MENU TOGGLE
     ========================================= */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('nav-open');
  });

  // Close mobile menu when a link is clicked
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('nav-open');
    });
  });

  /* =========================================
     STICKY NAVBAR ON SCROLL
     ========================================= */
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // init on load

  /* =========================================
     ACTIVE NAV LINK UPDATING
     ========================================= */
  const sections = document.querySelectorAll('section');
  
  const highlightNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);

  /* =========================================
     SCROLL REVEAL ANIMATIONS (Intersection Observer)
     ========================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        // Stop observing once animated to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
