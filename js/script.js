// ================= ANTI-COPY & ANTI-SCRAPING SUITE (Production-Ready) =================
// Each protection can be individually toggled via config object at the top

// ---------- PROTECTION CONFIG (Toggle features here) ----------
const PROTECTION_CONFIG = {
  // DISABLE BROWSER INTERACTIONS
  disableRightClick: true,              // Disable right-click context menu
  rightClickMessage: true,              // Show custom message instead of browser menu
  rightClickMessageText: '© 2026 Er. Puneet Kumar Chaturvedi. Unauthorized reproduction prohibited.',
  
  disableTextSelection: true,           // Disable text selection globally
  allowSelectionInForm: true,          // Allow selection in form fields
  allowSelectionInContact: true,       // Allow selection in contact info
  
  disableKeyboardShortcuts: true,      // Disable Ctrl+U, Ctrl+Shift+I, F12, etc.
  disableCopy: true,                   // Disable copy/cut/paste outside forms
  disableDragDrop: true,               // Disable drag-and-drop and image dragging
  disableImageRightClick: true,        // Prevent image context menu
  disableImageDrag: true,              // Prevent image dragging to save
  
  // ADVANCED PROTECTIONS
  antiFraming: true,                   // Prevent embedding in iframes
  disablePrinting: true,               // Disable printing (Ctrl+P, print dialog)
  printWarning: true,                  // Show warning instead of blocking silently
  
  // DYNAMIC WATERMARK
  enableWatermark: true,               // Dynamic copyright watermark overlay
  watermarkOpacity: 0.08,              // 0.05-0.15 recommended for visibility
  watermarkRotation: -45,              // Degrees of rotation
  
  // DEVTOOLS DETECTION
  enableDevToolsDetection: true,       // Detect when DevTools is opened
  devToolsWarning: false,              // Show warning (true) or redirect (false)
  devToolsRedirectURL: '/',            // URL to redirect to if DevTools detected
};

// ================= 1. ANTI-FRAMING (X-Frame-Options alternative) =================
(function () {
  if (!PROTECTION_CONFIG.antiFraming) return;
  
  if (window.self !== window.top) {
    // Being framed - redirect top-level window
    try {
      window.top.location = window.location;
    } catch (e) {
      // If blocked, at least prevent interaction
      document.documentElement.style.display = 'none';
    }
  }
})();

// ================= 2. DISABLE RIGHT-CLICK =================
(function () {
  if (!PROTECTION_CONFIG.disableRightClick) return;
  
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    
    if (PROTECTION_CONFIG.rightClickMessage) {
      // Show custom alert instead of context menu
      var message = PROTECTION_CONFIG.rightClickMessageText;
      alert(message);
    }
    return false;
  }, { capture: true, passive: false });
})();

// ================= 3. DISABLE TEXT SELECTION (with exceptions) =================
(function () {
  if (!PROTECTION_CONFIG.disableTextSelection) return;
  
  // Selectors that ALLOW selection
  var allowSelectionSelectors = [];
  
  if (PROTECTION_CONFIG.allowSelectionInForm) {
    allowSelectionSelectors.push(
      'input[type="text"]',
      'input[type="email"]',
      'input[type="tel"]',
      'textarea',
      '.form-control'
    );
  }
  
  if (PROTECTION_CONFIG.allowSelectionInContact) {
    // Allow selection in contact info (email, phone, social)
    allowSelectionSelectors.push(
      '.contact-value',    // Email, phone, links in contact section
      '.facts-value',      // Values in about facts card
      'a[href^="mailto"]', // Email links
      'a[href^="tel"]'     // Phone links
    );
  }
  
  // Disable selection on body
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  document.body.style.msUserSelect = 'none';
  document.body.style.MozUserSelect = 'none';
  
  // Re-enable selection for allowed elements
  if (allowSelectionSelectors.length > 0) {
    var selector = allowSelectionSelectors.join(', ');
    var style = document.createElement('style');
    style.textContent = selector + ' { user-select: text !important; -webkit-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; }';
    document.head.appendChild(style);
  }
  
  // Disable text selection via mouse
  document.addEventListener('selectstart', function (e) {
    var target = e.target;
    var allowed = allowSelectionSelectors.some(function (sel) {
      return target.matches(sel) || target.closest(sel);
    });
    if (!allowed) {
      e.preventDefault();
    }
  }, { capture: true });
  
})();

// ================= 4. DISABLE KEYBOARD SHORTCUTS =================
(function () {
  if (!PROTECTION_CONFIG.disableKeyboardShortcuts) return;
  
  document.addEventListener('keydown', function (e) {
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    
    // F12 (DevTools)
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+P (Print)
    if (PROTECTION_CONFIG.disablePrinting && e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+A (Select All) - prevent mass selection
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }
  }, { capture: true, passive: false });
})();

// ================= 5. DISABLE COPY, CUT, PASTE (outside form fields) =================
(function () {
  if (!PROTECTION_CONFIG.disableCopy) return;
  
  var formSelectors = [
    'input', 'textarea',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="tel"]',
    '.form-control'
  ];
  
  ['copy', 'cut', 'paste'].forEach(function (eventType) {
    document.addEventListener(eventType, function (e) {
      var target = e.target;
      
      // Allow copy/cut/paste in form fields
      var isFormField = formSelectors.some(function (sel) {
        return target.matches(sel) || target.closest(sel);
      });
      
      if (!isFormField) {
        e.preventDefault();
        return false;
      }
    }, { capture: true, passive: false });
  });
})();

// ================= 6. DISABLE DRAG AND DROP =================
(function () {
  if (!PROTECTION_CONFIG.disableDragDrop && !PROTECTION_CONFIG.disableImageDrag) return;
  
  if (PROTECTION_CONFIG.disableDragDrop) {
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
      return false;
    }, { passive: false });
    
    document.addEventListener('drop', function (e) {
      e.preventDefault();
      return false;
    }, { passive: false });
  }
  
  if (PROTECTION_CONFIG.disableImageDrag) {
    document.addEventListener('dragstart', function (e) {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    }, { capture: true, passive: false });
  }
})();

// ================= 7. DISABLE IMAGE CONTEXT MENU & RIGHT-CLICK =================
(function () {
  if (!PROTECTION_CONFIG.disableImageRightClick) return;
  
  var images = document.querySelectorAll('img');
  images.forEach(function (img) {
    img.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      return false;
    }, { passive: false });
  });
  
  // For dynamically added images
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function (node) {
          if (node.tagName === 'IMG') {
            node.addEventListener('contextmenu', function (e) {
              e.preventDefault();
              return false;
            }, { passive: false });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
})();

// ================= 8. DISABLE PRINTING =================
(function () {
  if (!PROTECTION_CONFIG.disablePrinting) return;
  
  // Disable Ctrl+P
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      if (PROTECTION_CONFIG.printWarning) {
        alert('Printing is disabled for this portfolio.');
      }
      return false;
    }
  }, { capture: true, passive: false });
  
  // Hide print button if any
  var style = document.createElement('style');
  style.textContent = '@media print { * { display: none !important; } body { background: white; } }';
  document.head.appendChild(style);
})();

// ================= 9. DYNAMIC COPYRIGHT WATERMARK =================
(function () {
  if (!PROTECTION_CONFIG.enableWatermark) return;
  
  var canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;
  
  var ctx = canvas.getContext('2d');
  ctx.font = 'bold 32px "Poppins", sans-serif';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((PROTECTION_CONFIG.watermarkRotation * Math.PI) / 180);
  ctx.fillText('© 2026 Puneet Kumar Chaturvedi', 0, 0);
  ctx.restore();
  
  var watermarkURL = canvas.toDataURL('image/png');
  
  var watermarkStyle = document.createElement('style');
  watermarkStyle.textContent = `
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('${watermarkURL}');
      background-repeat: repeat;
      background-attachment: fixed;
      pointer-events: none;
      opacity: ${PROTECTION_CONFIG.watermarkOpacity};
      z-index: 9998;
    }
  `;
  document.head.appendChild(watermarkStyle);
})();

// ================= 10. DEVTOOLS DETECTION =================
(function () {
  if (!PROTECTION_CONFIG.enableDevToolsDetection) return;
  
  var devToolsOpen = false;
  var lastCheckTime = 0;
  
  function detectDevTools() {
    var start = new Date().getTime();
    debugger; // eslint-disable-line no-debugger
    var end = new Date().getTime();
    
    if (end - start > 100) {
      devToolsOpen = true;
      return true;
    }
    return false;
  }
  
  // Check periodically (every 1 second)
  setInterval(function () {
    var now = new Date().getTime();
    if (now - lastCheckTime > 1000) {
      if (detectDevTools()) {
        if (devToolsOpen) {
          if (PROTECTION_CONFIG.devToolsWarning) {
            alert('Developer tools are not permitted on this site.');
          } else {
            window.location.href = PROTECTION_CONFIG.devToolsRedirectURL;
          }
        }
      }
      lastCheckTime = now;
    }
  }, 100);
})();

// ================= ANIMATIONS & POLISH (Phase 10) =================

// ---------- NAVBAR SCROLL STATE ----------
(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function toggleNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  toggleNavbar();
  window.addEventListener('scroll', toggleNavbar, { passive: true });
})();

// ---------- SCROLL REVEAL ----------
(function () {
  var targets = document.querySelectorAll(
    '.timeline-item, .pub-card, .conf-card, .project-card, .ngo-card, ' +
    '.contact-card, .message-card, .facts-card, .about-lead, .about-body, .about-signature, .lang-card'
  );

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();

// ---------- ACTIVE NAV LINK ON SCROLL ----------
(function () {
  var sections = document.querySelectorAll(
    '#about, #education, #experience, #research, #projects, #skills, #languages, #contact'
  );
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.charAt(0) === '#' && href.length > 1) {
      byId[href.substring(1)] = link;
    }
  });

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = byId[entry.target.id];
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { threshold: 0.35, rootMargin: '-90px 0px -40% 0px' });

  sections.forEach(function (sec) { navObserver.observe(sec); });
})();

// ---------- MOBILE MENU AUTO-CLOSE ----------
(function () {
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var collapseEl = document.getElementById('navbarNav');

  if (!navLinks.length || !collapseEl) return;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl.classList.contains('show') && window.bootstrap) {
        var instance = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        instance.hide();
      }
    });
  });
})();

// ---------- BACK TO TOP ----------
(function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggleBtn() {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  toggleBtn();
  window.addEventListener('scroll', toggleBtn, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ---------- CONTACT FORM (mailto) ----------
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var subject = document.getElementById('cf-subject').value.trim();
    var message = document.getElementById('cf-message').value.trim();

    var mailSubject = subject ? subject : 'Portfolio Inquiry from ' + name;

    var mailBody =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      message;

    var mailtoLink =
      'mailto:pkc78057@gmail.com' +
      '?subject=' + encodeURIComponent(mailSubject) +
      '&body=' + encodeURIComponent(mailBody);

    window.location.href = mailtoLink;
  });
});
