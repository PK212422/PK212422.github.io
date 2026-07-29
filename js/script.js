// Reserved for Phase 10 — Animations & Polish

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