/* =============================================
   BEAST PORTFOLIO - UPGRADED SCRIPT
   ============================================= */

/* --- Particles.js --- */
if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
        particles: {
            number: { value: 70, density: { enable: true, value_area: 800 } },
            color: { value: ["#00f2fe", "#BD00FF", "#ff007a"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 140, color: "#00f2fe", opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.2, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 200, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

/* --- Scroll Progress Bar --- */
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    scrollBar.style.width = pct + '%';
});

/* --- Custom Cursor --- */
const cursor = document.querySelector('.cursor');
const tubeCanvas = document.getElementById('tube-canvas');
const ctx = tubeCanvas ? tubeCanvas.getContext('2d') : null;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

let tubeNodes = [];
const NUM_NODES = 40;
if (tubeCanvas) {
    tubeCanvas.width = window.innerWidth;
    tubeCanvas.height = window.innerHeight;
    for (let i = 0; i < NUM_NODES; i++) {
        tubeNodes.push({ x: mouseX, y: mouseY });
    }
    window.addEventListener('resize', () => {
        tubeCanvas.width = window.innerWidth;
        tubeCanvas.height = window.innerHeight;
    });
}

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

let isHovering = false;
let currentPrimary = '#00f2fe';
let currentSecondary = '#BD00FF';

function animateCursor() {
    // Main cursor lerp
    cursorX += (mouseX - cursorX) * 0.8;
    cursorY += (mouseY - cursorY) * 0.8;
    if (cursor) cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;

    // Tube canvas lerp
    if (ctx && tubeNodes.length > 0) {
        ctx.clearRect(0, 0, tubeCanvas.width, tubeCanvas.height);
        
        // Node 0 follows mouse tightly
        tubeNodes[0].x += (mouseX - tubeNodes[0].x) * 0.7;
        tubeNodes[0].y += (mouseY - tubeNodes[0].y) * 0.7;
        
        // Remaining nodes follow previous node with tight elasticity
        for (let i = 1; i < NUM_NODES; i++) {
            tubeNodes[i].x += (tubeNodes[i - 1].x - tubeNodes[i].x) * 0.5;
            tubeNodes[i].y += (tubeNodes[i - 1].y - tubeNodes[i].y) * 0.5;
        }

        if (!isHovering) {
            for (let i = 0; i < NUM_NODES; i++) {
                let progress = 1 - (i / (NUM_NODES - 1)); 
                
                ctx.beginPath();
                // Draw overlapping filled circles instead of lines. 
                // This guarantees perfect smoothness and creates a beautiful dotted trail if moved very fast.
                let radius = 6 * Math.pow(progress, 1.5); 
                if (radius > 0.1) {
                    ctx.arc(tubeNodes[i].x, tubeNodes[i].y, radius, 0, Math.PI * 2);
                    
                    ctx.fillStyle = currentPrimary;
                    ctx.shadowBlur = 12 * progress;
                    ctx.shadowColor = currentPrimary;
                    ctx.globalAlpha = progress * 0.9;
                    
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
        }
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-tags span, .project-card, .social-icon, .info-item, .cert-card, .hamburger, .service-card, .theme-toggle').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(cursor) cursor.classList.add('hover');
        isHovering = true;
    });
    el.addEventListener('mouseleave', () => {
        if(cursor) cursor.classList.remove('hover');
        isHovering = false;
    });
});

/* --- Typewriter Effect --- */
const phrases = [
    "Full Stack Developer",
    "Cybersecurity Enthusiast",
    "Rajasthan Police Cyber Cell Intern",
    "OSINT Researcher",
    "AI & Automation Builder"
];
let pi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing-el');

function typeWrite() {
    if (!typingEl) return;
    const current = phrases[pi];
    if (!deleting) {
        typingEl.textContent = current.substring(0, ci + 1);
        ci++;
        if (ci === current.length) { deleting = true; setTimeout(typeWrite, 1800); return; }
    } else {
        typingEl.textContent = current.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeWrite, deleting ? 45 : 90);
}
typeWrite();

/* --- Mobile Navigation --- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

/* --- Scroll Reveal --- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || 0);
        setTimeout(() => el.classList.add('revealed'), delay);
        obs.unobserve(el);
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
revealEls.forEach(el => revealObs.observe(el));

/* --- Counter Animation --- */
const counters = document.querySelectorAll('.stat-num');
let counted = false;
const counterObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 50));
            const timer = setInterval(() => {
                count += step;
                if (count >= target) { counter.textContent = target; clearInterval(timer); }
                else counter.textContent = count;
            }, 35);
        });
    }
}, { threshold: 0.5 });
if (counters.length) counterObs.observe(counters[0].closest('.hero-stats'));

/* --- 3D Tilt Effect --- */
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2, cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
});

/* --- Ripple Effect on Buttons --- */
document.querySelectorAll('.btn').forEach(btn => {
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', e => {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/* --- Magnetic Button Effect --- */
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
    });
});

/* --- Navbar Scroll Effect --- */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav .nav-content');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(3,0,20,0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        nav.style.borderColor = 'rgba(0,242,254,0.2)';
    } else {
        nav.style.background = 'rgba(3,0,20,0.6)';
        nav.style.boxShadow = 'none';
        nav.style.borderColor = 'var(--glass-border)';
    }
});

/* --- Contact Form with Formspree --- */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');

if (form) {
    form.addEventListener('submit', async e => {
        e.preventDefault();
        submitText.textContent = 'Sending...';
        submitBtn.disabled = true;
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            if (res.ok) {
                status.textContent = '✅ Message sent! I\'ll reply within 24 hours.';
                status.className = 'form-status success';
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch {
            status.textContent = '❌ Something went wrong. Email me directly!';
            status.className = 'form-status error';
        } finally {
            submitText.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

/* --- Active Nav Link on Scroll --- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links li a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
    });
    navLinkEls.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text-main)' : '';
        a.style.background = a.getAttribute('href') === '#' + current ? 'rgba(0,242,254,0.15)' : '';
    });
});

/* --- Theme Toggle Logic --- */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
    // Update cached colors for cursor performance
    setTimeout(() => {
        currentPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00f2fe';
        currentSecondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() || '#BD00FF';
    }, 50);
}

/* --- Robot Companion Logic --- */
const robotCompanion = document.getElementById('robot-companion');
let robotTimeout;
let currentRobotX = -100;

document.addEventListener('click', (e) => {
    if (!robotCompanion) return;
    
    // Ignore clicks on navbar items if necessary, but it's fun to have it everywhere
    const targetX = e.pageX;
    const targetY = e.pageY;

    robotCompanion.style.opacity = '1';
    
    // Flip robot based on movement direction
    if (targetX < currentRobotX) {
        robotCompanion.style.transform = 'translate(-50%, -100%) scaleX(-1)';
    } else {
        robotCompanion.style.transform = 'translate(-50%, -100%) scaleX(1)';
    }

    // Move robot (offset so it stands on the click point)
    robotCompanion.style.left = `${targetX + 15}px`;
    robotCompanion.style.top = `${targetY}px`;
    currentRobotX = targetX;

    // Start walking animation
    robotCompanion.classList.remove('robot-tapping');
    robotCompanion.classList.add('robot-walking');

    clearTimeout(robotTimeout);
    
    // Stop walking and tap after transition finishes (600ms matching CSS)
    robotTimeout = setTimeout(() => {
        robotCompanion.classList.remove('robot-walking');
        robotCompanion.classList.add('robot-tapping');
        
        // Let it rest for a bit then fade out
        setTimeout(() => {
            robotCompanion.style.opacity = '0';
        }, 2500);
    }, 600);
});
