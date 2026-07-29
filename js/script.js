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
    '.contact-card, .message-card, .facts-card, .about-lead, .about-body, .about-signature'
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
    '#about, #education, #experience, #research, #projects, #skills, #contact'
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
