class Particle {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.init();
    }

    init() {
        const size = Math.random() * 4 + 2;
        this.element.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        this.container.appendChild(this.element);
        this.update();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > 100) this.speedX *= -1;
        if (this.y < 0 || this.y > 100) this.speedY *= -1;

        this.element.style.transform = `translate(${this.x}%, ${this.y}%)`;
        requestAnimationFrame(() => this.update());
    }
}

function initializeParticles() {
    const container = document.querySelector('.particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        new Particle(container);
    }
}

function initializeAnimations() {
    const animation = document.querySelector('.profile-animation');
    const profileImg = document.querySelector('.profile-img');
    
    // Background animation
    function animateBackground() {
        const colors = ['#5f5cf2', '#87ceeb', '#e6e6fa'];
        let currentIndex = 0;
        
        setInterval(() => {
            animation.style.background = `
                radial-gradient(circle at center,
                ${colors[currentIndex]} 0%,
                transparent 70%)
            `;
            currentIndex = (currentIndex + 1) % colors.length;
        }, 2000);
    }

    // Floating animation
    function animateFloat() {
        let time = 0;
        
        function update() {
            time += 0.05;
            const yOffset = Math.sin(time) * 5;
            profileImg.style.transform = `translateY(${yOffset}px)`;
            requestAnimationFrame(update);
        }
        
        update();
    }

    animateBackground();
    animateFloat();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeAnimations();
});