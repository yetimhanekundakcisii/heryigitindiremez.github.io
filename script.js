const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
const particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function createParticle(x, y) {
    const size = Math.random() * 5 + 1;
    const speed = Math.random() * 5 + 1;
    const angle = Math.random() * 2 * Math.PI;
    const color = randomColor();
    particles.push({ x, y, size, speed, angle, color });
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.size *= 0.97;
        if (p.size < 0.5) particles.splice(i, 1);
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 5; i++) {
        createParticle(e.clientX, e.clientY);
    }
});

animate();
