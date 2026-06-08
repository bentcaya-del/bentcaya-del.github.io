/* ─── LOADER ─── */
window.addEventListener('load', () => {
  let count = 0;
  const countEl = document.querySelector('.loader-count');
  const interval = setInterval(() => {
    count += Math.floor(Math.random() * 12) + 4;
    if (count >= 100) {
      count = 100;
      clearInterval(interval);
      setTimeout(() => {
        const loader = document.getElementById('loader');
        loader?.classList.add('hide');
        setTimeout(() => loader?.remove(), 700);
      }, 300);
    }
    if (countEl) countEl.textContent = count + '%';
  }, 60);
});

/* ─── CURSOR ─── */
const cursorEl = document.getElementById('cursor');
const ringEl = document.getElementById('cursor-ring');
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorEl) { cursorEl.style.left = mouseX + 'px'; cursorEl.style.top = mouseY + 'px'; }
});

(function animateRing(){
  ringX += (mouseX - ringX) * 0.13;
  ringY += (mouseY - ringY) * 0.13;
  if (ringEl) { ringEl.style.left = ringX + 'px'; ringEl.style.top = ringY + 'px'; }
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorEl?.classList.add('hover'); ringEl?.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursorEl?.classList.remove('hover'); ringEl?.classList.remove('hover'); });
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

/* ─── NAV ACTIVE LINK ─── */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--menthe)';
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── NAV SHADOW ON SCROLL ─── */
const navEl = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (!navEl) return;
  navEl.style.borderBottomColor = window.scrollY > 40 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
});
