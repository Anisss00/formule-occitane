// SCRIPT.JS - La Formule Occitane

// Système de transitions d'images amélioré avec triple buffering
const backgroundImages = [
    'assets/bg1.jpg',
    'assets/bg2.jpg',
    'assets/bg3.jpg',
    'assets/bg4.jpg',
    'assets/bg5.jpg',
    'assets/bg6.jpg'
];

let currentImageIndex = 0;
let bgLayers = [];
const bgContainer = document.getElementById('bgContainer');

// Créer 3 couches pour des transitions fluides
for (let i = 0; i < 3; i++) {
    const layer = document.createElement('div');
    layer.className = 'bg-layer';
    bgContainer.appendChild(layer);
    bgLayers.push(layer);
}

// Activer la première image
bgLayers[0].style.backgroundImage = `url(${backgroundImages[0]})`;
bgLayers[0].classList.add('active');

let nextLayerIndex = 1;
let isTransitioning = false;

function updateBackground() {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const targetIndex = Math.min(Math.floor(scrollPercent * backgroundImages.length), backgroundImages.length - 1);
    
    if (targetIndex !== currentImageIndex && !isTransitioning) {
        isTransitioning = true;
        
        // Préparer la couche suivante
        const nextLayer = bgLayers[nextLayerIndex];
        nextLayer.style.backgroundImage = `url(${backgroundImages[targetIndex]})`;
        
        // Attendre que l'image soit chargée
        const img = new Image();
        img.onload = () => {
            // Transition vers la nouvelle image
            requestAnimationFrame(() => {
                nextLayer.classList.add('active');
                
                // Désactiver l'ancienne couche après la transition
                setTimeout(() => {
                    bgLayers.forEach((layer, index) => {
                        if (index !== nextLayerIndex) {
                            layer.classList.remove('active');
                        }
                    });
                    
                    currentImageIndex = targetIndex;
                    nextLayerIndex = (nextLayerIndex + 1) % 3;
                    isTransitioning = false;
                }, 1500);
            });
        };
        img.src = backgroundImages[targetIndex];
    }
}

// Précharger toutes les images
function preloadImages() {
    backgroundImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Système de scroll optimisé avec requestAnimationFrame
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateBackground();
            ticking = false;
        });
        ticking = true;
    }
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Gestion du formulaire
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons rapidement.');
        this.reset();
    });
}

// Animation au scroll
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

// Observer tous les éléments animés
document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in').forEach(el => {
    observer.observe(el);
});