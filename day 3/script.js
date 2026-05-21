// Initialize AOS Scroll Reveal
AOS.init({
  duration: 700,
  once: true,
  offset: 30
});

// ========== STICKY NAVIGATION (changes appearance on scroll) ==========
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  const backBtn = document.getElementById('backBtn');
  if (window.scrollY > 400) {
    backBtn.classList.add('show');
  } else {
    backBtn.classList.remove('show');
  }
});

// ========== SMOOTH SCROLL for all navigation links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === "#" || targetId === "") return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== BACK TO TOP BUTTON ==========
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== MOBILE HAMBURGER MENU ==========
const toggleBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
let isMenuOpen = false;

function closeMobileMenu() {
  if (navMenu) {
    navMenu.style.display = '';
    navMenu.style.position = '';
    navMenu.style.backgroundColor = '';
    navMenu.style.padding = '';
    navMenu.style.zIndex = '';
    navMenu.style.borderBottom = '';
    const ul = navMenu.querySelector('ul');
    if (ul) {
      ul.style.flexDirection = '';
      ul.style.alignItems = '';
      ul.style.gap = '';
    }
    isMenuOpen = false;
  }
}

function openMobileMenu() {
  if (navMenu) {
    navMenu.style.display = 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position = 'absolute';
    navMenu.style.top = '70px';
    navMenu.style.left = '0';
    navMenu.style.width = '100%';
    navMenu.style.backgroundColor = '#0A1628';
    navMenu.style.padding = '1.5rem';
    navMenu.style.zIndex = '999';
    navMenu.style.borderBottom = '2px solid #2563EB';
    const ul = navMenu.querySelector('ul');
    if (ul) {
      ul.style.flexDirection = 'column';
      ul.style.alignItems = 'center';
      ul.style.gap = '1rem';
    }
    isMenuOpen = true;
  }
}

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Close menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });
}

// Close menu on window resize if screen becomes desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    closeMobileMenu();
  }
});

// ========== CONTACT FORM VALIDATION ==========
const form = document.getElementById('applicationForm');
const nameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const domainSelect = document.getElementById('domain');
const messageTA = document.getElementById('message');
const nameErr = document.getElementById('nameError');
const emailErr = document.getElementById('emailError');
const domainErr = document.getElementById('domainError');
const messageErr = document.getElementById('messageError');
const statusDiv = document.getElementById('formStatusMessage');

// Email validation regex
function validateEmail(email) {
  return /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email);
}

// Show success message
function showSuccessState() {
  statusDiv.innerHTML = `
    <div class="success-message">
      <i class="fas fa-check-circle fa-lg"></i>
      ✅ Thank you for applying! Our team will reach out within 48 hours. Welcome to WeIntern 🚀
    </div>
  `;
  form.reset();
  
  // Auto-hide success message after 5 seconds
  setTimeout(() => {
    if (statusDiv.innerHTML.includes('Thank you')) {
      statusDiv.innerHTML = '';
    }
  }, 5000);
}

// Show error message
function showErrorState(message) {
  statusDiv.innerHTML = `
    <div class="error-message" style="background:#fee2e2; padding:0.8rem; border-radius:20px; margin-bottom:1rem;">
      <i class="fas fa-exclamation-triangle"></i> ${message}
    </div>
  `;
  setTimeout(() => {
    if (statusDiv.innerHTML.includes('error')) {
      statusDiv.innerHTML = '';
    }
  }, 3000);
}

// Form submit handler
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Name validation
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      nameErr.innerText = '❌ Full name is required.';
      isValid = false;
    } else if (nameVal.length < 2) {
      nameErr.innerText = '❌ Minimum 2 characters required.';
      isValid = false;
    } else if (nameVal.length > 60) {
      nameErr.innerText = '❌ Maximum 60 characters allowed.';
      isValid = false;
    } else {
      nameErr.innerText = '';
    }
    
    // Email validation
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      emailErr.innerText = '❌ Email address is required.';
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      emailErr.innerText = '❌ Enter a valid email (e.g., name@domain.com).';
      isValid = false;
    } else {
      emailErr.innerText = '';
    }
    
    // Domain validation
    if (!domainSelect.value) {
      domainErr.innerText = '❌ Please select a domain track.';
      isValid = false;
    } else {
      domainErr.innerText = '';
    }
    
    // Message validation (10-300 characters)
    const msgVal = messageTA.value.trim();
    if (!msgVal) {
      messageErr.innerText = '❌ Message is required.';
      isValid = false;
    } else if (msgVal.length < 10) {
      messageErr.innerText = '❌ Message must be at least 10 characters.';
      isValid = false;
    } else if (msgVal.length > 300) {
      messageErr.innerText = '❌ Maximum 300 characters allowed.';
      isValid = false;
    } else {
      messageErr.innerText = '';
    }
    
    // If valid, show success and log data
    if (isValid) {
      showSuccessState();
      console.log('Application Submitted:', {
        name: nameVal,
        email: emailVal,
        domain: domainSelect.value,
        message: msgVal,
        timestamp: new Date().toISOString()
      });
    } else {
      showErrorState('Please fix the errors above before submitting.');
    }
  });
}

// Real-time validation for better UX
if (nameInput) {
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) nameErr.innerText = '';
  });
}

if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) emailErr.innerText = '';
  });
}

if (domainSelect) {
  domainSelect.addEventListener('change', () => {
    if (domainSelect.value) domainErr.innerText = '';
  });
}

if (messageTA) {
  messageTA.addEventListener('input', () => {
    const len = messageTA.value.trim().length;
    if (len >= 10 && len <= 300) messageErr.innerText = '';
  });
}

// ========== ADDITIONAL CTA BUTTONS HANDLING ==========
const applyNowBtns = document.querySelectorAll('#applyNowMainBtn, .btn-urgent');
applyNowBtns.forEach(btn => {
  if (btn && btn.id !== 'applyNowMainBtn') {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === '#contact-form-section') return;
      e.preventDefault();
      document.querySelector('#contact-form-section')?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

console.log('WeIntern — All features loaded: Sticky Nav, Smooth Scroll, Hamburger Menu, Form Validation, AOS');