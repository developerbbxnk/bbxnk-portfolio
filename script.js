const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }
}

function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = 'rgba(0, 119, 255, 0.4)';
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2); ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(0, 119, 255, ${1 - dist / 150 - 0.7})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
        }
    });
    requestAnimationFrame(draw);
}

const words = "Java & Skript Developer";
let charIdx = 0;
function type() {
    const el = document.getElementById('typewriter');
    if (el && charIdx < words.length) {
        el.textContent += words.charAt(charIdx);
        charIdx++;
        setTimeout(type, 100);
    }
}

function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
    });
}

window.addEventListener('resize', initCanvas);
window.addEventListener('scroll', reveal);
window.onload = () => { initCanvas(); draw(); type(); reveal(); };
