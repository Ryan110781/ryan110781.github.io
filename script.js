// Carousel logic
const carousel = document.getElementById('carousel');
const items = Array.from(carousel.getElementsByClassName('carousel-item'));
let current = 0;
const total = items.length;

// Set initial positions
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

// Swipe support
let startX = null;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) { // swipe right
        current = (current - 1 + total) % total;
        showItem(current);
    } else if (startX - endX > 50) { // swipe left
        current = (current + 1) % total;
        showItem(current);
    }
    startX = null;
});