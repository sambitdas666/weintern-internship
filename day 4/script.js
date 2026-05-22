// Initialize AOS Scroll Reveal
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-out-cubic'
});

// ========== STICKY NAVIGATION ==========
const header = document.getElementById('mainHeader');
const navMenu = document.getElementById('navMenu');
const toggleBtn = document.getElementById('mobileMenuBtn');
const overlay = document.getElementById('navOverlay');
let isMenuOpen = false;

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  
  if (isMenuOpen) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

function openMobileMenu() {
  if (navMenu) {
    navMenu.classList.add('mobile-open', 'active');
  }
  if (overlay) {
    overlay.style.display = 'block';
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
  }
  if (toggleBtn) {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  if (navMenu) {
    navMenu.classList.remove('active');
    setTimeout(() => {
      navMenu.classList.remove('mobile-open');
    }, 350);
  }
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }
  if (toggleBtn) {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
  document.body.style.overflow = '';
}

// Toggle button click
if (toggleBtn) {
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

// Close menu when clicking overlay
if (overlay) {
  overlay.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking nav links
if (navMenu) {
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMobileMenu();
      }
    });
  });
}

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen) {
    closeMobileMenu();
  }
});

// Close menu on window resize if screen becomes desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    closeMobileMenu();
  }
});

// Sticky header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    if (window.scrollY > 400) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
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
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== BACK TO TOP BUTTON ==========
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;
  const headerHeight = header.offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

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

// Clear input error state
function clearError(input, errorEl) {
  input.classList.remove('invalid');
  input.classList.add('valid');
  errorEl.innerHTML = '';
}

// Set input error state
function setError(input, errorEl, message) {
  input.classList.remove('valid');
  input.classList.add('invalid');
  errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
}

// Show success message
function showSuccessState() {
  statusDiv.innerHTML = `
    <div class="success-message">
      <i class="fas fa-check-circle"></i>
      <div>
        <strong>Application Submitted!</strong>
        <p style="margin: 0.3rem 0 0; font-size: 0.9rem;">Thank you for applying! Our team will reach out within 48 hours.</p>
      </div>
    </div>
  `;
  form.reset();
  
  // Clear validation states
  [nameInput, emailInput, domainSelect, messageTA].forEach(input => {
    input.classList.remove('valid', 'invalid');
  });
  
  // Auto-hide success message after 6 seconds
  setTimeout(() => {
    if (statusDiv.querySelector('.success-message')) {
      statusDiv.style.transition = 'opacity 0.3s ease';
      statusDiv.style.opacity = '0';
      setTimeout(() => {
        statusDiv.innerHTML = '';
        statusDiv.style.opacity = '1';
      }, 300);
    }
  }, 6000);
}

// Show error message
function showErrorState(message) {
  statusDiv.innerHTML = `
    <div class="error-message" style="background: linear-gradient(135deg, #fee2e2, #fecaca); padding: 1rem; border-radius: 16px; margin-bottom: 1rem; color: #dc2626;">
      <i class="fas fa-exclamation-triangle"></i> ${message}
    </div>
  `;
  setTimeout(() => {
    if (statusDiv.innerHTML.includes('error')) {
      statusDiv.innerHTML = '';
    }
  }, 4000);
}

// Form submit handler
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    
    // Name validation
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setError(nameInput, nameErr, 'Full name is required');
      isValid = false;
    } else if (nameVal.length < 2) {
      setError(nameInput, nameErr, 'Minimum 2 characters required');
      isValid = false;
    } else if (nameVal.length > 60) {
      setError(nameInput, nameErr, 'Maximum 60 characters allowed');
      isValid = false;
    } else {
      clearError(nameInput, nameErr);
    }
    
    // Email validation
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      setError(emailInput, emailErr, 'Email address is required');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setError(emailInput, emailErr, 'Enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput, emailErr);
    }
    
    // Domain validation
    if (!domainSelect.value) {
      setError(domainSelect, domainErr, 'Please select a domain track');
      isValid = false;
    } else {
      clearError(domainSelect, domainErr);
    }
    
    // Message validation (10-300 characters)
    const msgVal = messageTA.value.trim();
    if (!msgVal) {
      setError(messageTA, messageErr, 'Message is required');
      isValid = false;
    } else if (msgVal.length < 10) {
      setError(messageTA, messageErr, 'Message must be at least 10 characters');
      isValid = false;
    } else if (msgVal.length > 300) {
      setError(messageTA, messageErr, 'Maximum 300 characters allowed');
      isValid = false;
    } else {
      clearError(messageTA, messageErr);
    }
    
    // If valid, show success and log data
    if (isValid) {
      // Show loading state
      const submitBtn = form.querySelector('.btn-submit');
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      
      // Simulate submission delay
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
        
        showSuccessState();
        console.log('Application Submitted:', {
          name: nameVal,
          email: emailVal,
          domain: domainSelect.value,
          message: msgVal,
          timestamp: new Date().toISOString()
        });
      }, 1500);
    } else {
      showErrorState('Please fix the errors above before submitting.');
      
      // Focus first error field
      const firstError = form.querySelector('.invalid');
      if (firstError) {
        firstError.focus();
      }
    }
  });
}

// Real-time validation
if (nameInput) {
  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    if (val.length >= 2 && val.length <= 60) {
      clearError(nameInput, nameErr);
    }
  });
  
  nameInput.addEventListener('blur', () => {
    const val = nameInput.value.trim();
    if (val && val.length < 2) {
      setError(nameInput, nameErr, 'Minimum 2 characters required');
    }
  });
}

if (emailInput) {
  emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value.trim())) {
      clearError(emailInput, emailErr);
    }
  });
  
  emailInput.addEventListener('blur', () => {
    const val = emailInput.value.trim();
    if (val && !validateEmail(val)) {
      setError(emailInput, emailErr, 'Enter a valid email address');
    }
  });
}

if (domainSelect) {
  domainSelect.addEventListener('change', () => {
    if (domainSelect.value) {
      clearError(domainSelect, domainErr);
    }
  });
}

if (messageTA) {
  messageTA.addEventListener('input', () => {
    const len = messageTA.value.trim().length;
    if (len >= 10 && len <= 300) {
      clearError(messageTA, messageErr);
    }
  });
  
  messageTA.addEventListener('blur', () => {
    const len = messageTA.value.trim().length;
    if (len && len < 10) {
      setError(messageTA, messageErr, 'Message must be at least 10 characters');
    }
  });
}

// ========== ANIMATED COUNTER FOR STATS (if any) ==========
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// ========== CTA BUTTON RIPPLE EFFECT ==========
document.querySelectorAll('.btn-primary, .btn-urgent, .btn-submit').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%) scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rippleEffect {
        to {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.testimonial-card, .domain-card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(el);
});

// Add CSS for visible state
const animateStyle = document.createElement('style');
animateStyle.textContent = `
  .animate-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animateStyle);

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
  // Tab navigation enhancement
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ========== PREFERS REDUCED MOTION ==========
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  AOS.init({
    duration: 0,
    once: true,
    disable: true
  });
}

console.log('WeIntern v2.0 — Enhanced: Slide-in Nav, Ripple Effects, Intersection Observer, Improved Form UX');