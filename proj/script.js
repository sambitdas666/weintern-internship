document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.main-nav');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex' || window.getComputedStyle(navMenu).display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.backgroundColor = '#0A1628';
        navMenu.style.padding = '1.5rem';
        navMenu.style.zIndex = '99';
        navMenu.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        const ul = navMenu.querySelector('ul');
        if (ul) ul.style.flexDirection = 'column';
        if (ul) ul.style.gap = '1rem';
      }
    });
  }


  const backBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  });
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const applyButtons = document.querySelectorAll('.cta-btn, #applyNowMainBtn, .btn-track-apply, .btn-cta-large');
  applyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === '#cta' || btn.id === 'applyNowMainBtn' || btn.classList.contains('btn-track-apply')) {
        e.preventDefault();
        alert('🎉 Thank you for your interest! The WeIntern application form will open soon. Meanwhile, check out our tracks!');
        const ctaSection = document.getElementById('cta');
        if (ctaSection) ctaSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu) {
      navMenu.style.display = '';
      navMenu.style.position = '';
      navMenu.style.width = '';
      navMenu.style.backgroundColor = '';
      navMenu.style.padding = '';
      const ul = navMenu.querySelector('ul');
      if (ul) ul.style.flexDirection = '';
    }
  });
});