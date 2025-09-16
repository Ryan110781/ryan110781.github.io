// --- STARFIELD CANVAS ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    createStars(130);
});

// Generate stars
function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.3 + 0.3,
            speed: Math.random() * 0.2 + 0.07
        });
    }
}
createStars(130);

// Animate stars
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = 0.7;
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#00fff7";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00fff7";
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
    ctx.restore();
    requestAnimationFrame(animateStars);
}
animateStars();

// --- CAROUSEL LOGIC ---
const carousel = document.getElementById('carousel');
const items = Array.from(carousel.getElementsByClassName('carousel-item'));
let current = 0;
const total = items.length;

function showItem(idx) {
    items.forEach((item, i) => {
        item.style.transform = `translateX(${(i-idx)*100}%)`;
    });
}
showItem(current);

document.getElementById('prev').onclick = () => {
    current = (current - 1 + total) % total;
    showItem(current);
};
document.getElementById('next').onclick = () => {
    current = (current + 1) % total;
    showItem(current);
};

// Auto-scroll
setInterval(() => {
    current = (current + 1) % total;
    showItem(current);
}, 3500);

// Swipe support (touch)
let startX = null;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
        current = (current - 1 + total) % total;
        showItem(current);
    } else if (startX - endX > 50) {
        current = (current + 1) % total;
        showItem(current);
    }
    startX = null;
});
