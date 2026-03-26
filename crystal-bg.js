// Crystal PVP Animated Background
const canvas = document.getElementById('crystal-canvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// Crystal Particles
let particles = [];
const PARTICLE_COUNT = 200;

class CrystalParticle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 60%)`; // Cyan to Purple range
        this.alpha = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Wrap around edges
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        
        // Draw diamond/crystal shape
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI * 2) / 4;
            const x1 = Math.cos(angle) * this.size;
            const y1 = Math.sin(angle) * this.size;
            const x2 = Math.cos(angle + Math.PI / 4) * (this.size * 0.6);
            const y2 = Math.sin(angle + Math.PI / 4) * (this.size * 0.6);
            
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            
            ctx.lineTo(x2, y2);
        }
        
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.restore();
    }
}

// Floating Orbs (Crystal Energy)
let orbs = [];
const ORB_COUNT = 8;

class CrystalOrb {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 60 + 40;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.color = `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, 0.05)`;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulse = 0;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
        
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
    }
    
    draw() {
        ctx.beginPath();
        const pulseRadius = this.radius + Math.sin(this.pulse) * 10;
        ctx.arc(this.x, this.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, 0.03)`;
        ctx.fill();
    }
}

// Lightning effects (crystal energy arcs)
let lightning = [];
let lastLightningTime = 0;

function createLightning() {
    if (Date.now() - lastLightningTime > 3000) {
        lightning.push({
            x1: Math.random() * width,
            y1: Math.random() * height,
            x2: Math.random() * width,
            y2: Math.random() * height,
            life: 1,
            maxLife: 20
        });
        lastLightningTime = Date.now();
    }
    
    for (let i = 0; i < lightning.length; i++) {
        const l = lightning[i];
        l.life--;
        if (l.life <= 0) {
            lightning.splice(i, 1);
            i--;
        }
    }
}

function drawLightning() {
    for (const l of lightning) {
        const alpha = l.life / l.maxLife;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        
        // Create jagged line
        let x = l.x1;
        let y = l.y1;
        const steps = 10;
        const dx = (l.x2 - l.x1) / steps;
        const dy = (l.y2 - l.y1) / steps;
        
        ctx.moveTo(x, y);
        for (let i = 0; i <= steps; i++) {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            x = l.x1 + dx * i + offsetX;
            y = l.y1 + dy * i + offsetY;
            ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        x = l.x1;
        y = l.y1;
        ctx.moveTo(x, y);
        for (let i = 0; i <= steps; i++) {
            const offsetX = (Math.random() - 0.5) * 15;
            const offsetY = (Math.random() - 0.5) * 15;
            x = l.x1 + dx * i + offsetX;
            y = l.y1 + dy * i + offsetY;
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 102, 255, ${alpha * 0.6})`;
        ctx.stroke();
    }
    ctx.shadowBlur = 0;
}

// Initialize
function init() {
    particles = [];
    orbs = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new CrystalParticle());
    }
    for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push(new CrystalOrb());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.5, '#1a0a2a');
    gradient.addColorStop(1, '#0a0a2a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw orbs
    orbs.forEach(orb => {
        orb.update();
        orb.draw();
    });
    
    // Draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connecting lines between nearby crystals
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                const opacity = (1 - distance / 100) * 0.15;
                ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                ctx.stroke();
            }
        }
    }
    
    // Create and draw lightning
    createLightning();
    drawLightning();
    
    requestAnimationFrame(animate);
}

// Handle resize
function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    init();
}

window.addEventListener('resize', handleResize);
init();
animate();