// =============================================
// EMAILJS CONFIGURATION
// Steps:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (e.g., Gmail) and note your SERVICE_ID
// 3. Create an Email Template and note your TEMPLATE_ID
//    Template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy your Public Key from Account > API Keys
// 5. Replace the placeholders below with your actual values
// =============================================
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "abc123XYZ"
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz456"

emailjs.init(EMAILJS_PUBLIC_KEY);

// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1800);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  document.getElementById("scrollTop").classList.toggle("visible", window.scrollY > 400);
  updateActiveNav();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});
document.querySelectorAll(".mob-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

// ===== ACTIVE NAV =====
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  let current    = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
  });
}

// ===== TYPEWRITER =====
const roles = [
  "Backend Developer",
  "Django Enthusiast",
  "REST API Builder",
  "Python Developer",
  "Full-Stack Developer"
];
let ri = 0, ci = 0, deleting = false;
const tw = document.getElementById("typewriter");

function type() {
  const word = roles[ri];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 60 : 100;
  if (!deleting && ci > word.length) { delay = 1800; deleting = true; }
  else if (deleting && ci < 0)       { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 300; }
  setTimeout(type, delay);
}
setTimeout(type, 2000);

// ===== PARTICLE CANVAS =====
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  const ctx    = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function Particle() {
    this.x    = Math.random() * canvas.width;
    this.y    = Math.random() * canvas.height;
    this.r    = Math.random() * 1.5 + 0.5;
    this.vx   = (Math.random() - 0.5) * 0.4;
    this.vy   = (Math.random() - 0.5) * 0.4;
    this.a    = Math.random() * 0.5 + 0.1;
  }
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${p.a})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${0.12 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el     = e.target;
      const target = +el.dataset.target;
      const step   = Math.ceil(target / 40);
      let current  = 0;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-num").forEach(el => counterObserver.observe(el));

// ===== PROJECT CARD 3D TILT =====
document.querySelectorAll(".proj-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    card.style.transform = `perspective(600px) rotateY(${x/25}deg) rotateX(${-y/25}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===== SCROLL TO TOP =====
document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== CONTACT FORM (EmailJS) =====
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const btn     = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const btnLoad = document.getElementById("btnLoad");
  const status  = document.getElementById("formStatus");

  // Show loading
  btnText.style.display = "none";
  btnLoad.style.display = "inline-flex";
  btn.disabled = true;
  status.className = "form-status";
  status.textContent = "";

  const params = {
    from_name:  this.from_name.value.trim(),
    from_email: this.from_email.value.trim(),
    subject:    this.subject.value.trim() || "Portfolio Contact",
    message:    this.message.value.trim(),
    reply_to:   this.from_email.value.trim()
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    status.textContent = "✅ Message sent! I'll get back to you soon.";
    status.className   = "form-status success";
    this.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    status.textContent = "❌ Something went wrong. Please email me directly at raihanshariffworkspace@gmail.com";
    status.className   = "form-status error";
  } finally {
    btnText.style.display = "inline-flex";
    btnLoad.style.display = "none";
    btn.disabled = false;
  }
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
