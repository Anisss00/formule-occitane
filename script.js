const pageBackgrounds = {
    'index.html': ['assets/bg1.jpg', 'assets/bg2.jpg'],
    'produits.html': ['assets/bg3.jpg', 'assets/bg4.jpg'],
    'processus.html': ['assets/bg5.jpg', 'assets/bg6.jpg'],
    'contact.html': ['assets/bg7.jpg', 'assets/bg8.jpg']
};

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const backgroundImages = pageBackgrounds[currentPage] || pageBackgrounds['index.html'];

let currentImageIndex = 0;
let bgLayers = [];
const bgContainer = document.getElementById('bgContainer');

for (let i = 0; i < 2; i++) {
    const layer = document.createElement('div');
    layer.className = 'bg-layer';
    bgContainer.appendChild(layer);
    bgLayers.push(layer);
}

bgLayers[0].style.backgroundImage = `url(${backgroundImages[0]})`;
bgLayers[0].classList.add('active');

function preloadImages() {
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

function alternateBackground() {
    const nextImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    const currentLayer = bgLayers[currentImageIndex];
    const nextLayer = bgLayers[nextImageIndex];
    
    nextLayer.style.backgroundImage = `url(${backgroundImages[nextImageIndex]})`;
    
    nextLayer.classList.add('active');
    
    setTimeout(() => {
        currentLayer.classList.remove('active');
        currentImageIndex = nextImageIndex;
    }, 2000);
}

setInterval(alternateBackground, 5000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons rapidement.');
        this.reset();
    });
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('produit-card')) {
                const cards = document.querySelectorAll('.produit-card');
                const cardIndex = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, cardIndex * 100);
            } else if (entry.target.classList.contains('etape')) {
                const etapes = document.querySelectorAll('.etape');
                const etapeIndex = Array.from(etapes).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, etapeIndex * 150);
            } else if (entry.target.classList.contains('intro-card')) {
                const cards = document.querySelectorAll('.intro-card');
                const cardIndex = Array.from(cards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, cardIndex * 100);
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in').forEach(el => {
    observer.observe(el);
});