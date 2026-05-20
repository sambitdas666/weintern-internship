(function() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav-links');
  
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      if (nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.backgroundColor = '#0A1628';
        nav.style.padding = '1.5rem';
        nav.style.zIndex = '99';
        nav.style.borderBottom = '1px solid #2563EB';
        
        const ul = nav.querySelector('ul');
        if (ul) {
          ul.style.flexDirection = 'column';
          ul.style.alignItems = 'center';
          ul.style.gap = '1rem';
        }
      }
    });
  }

  const backBtn = document.getElementById('backBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });
  
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const ctaBtns = document.querySelectorAll('#applyNowMainBtn, #startLearningBtn, #joinWeInternBtn');
  
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Limited seats available! Submit your application and get early access for free. Our team will reach out within 24 hours.');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      if (targetId === '#apply-cta' && this.id !== 'applyNowMainBtn') {
        // allow smooth scroll for internal navigation
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else if (targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav) {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.position = '';
      nav.style.width = '';
      nav.style.backgroundColor = '';
      nav.style.padding = '';
      nav.style.zIndex = '';
      nav.style.borderBottom = '';
      
      const ul = nav.querySelector('ul');
      if (ul) {
        ul.style.flexDirection = '';
        ul.style.alignItems = '';
        ul.style.gap = '';
      }
    }
  });
})();