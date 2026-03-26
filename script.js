// Live Stats Animation
let onlinePlayers = 247;
let discordMembers = 1256;
let activeServers = 89;

const onlineElement = document.getElementById('onlinePlayers');
const discordElement = document.getElementById('discordMembers');
const serversElement = document.getElementById('activeServers');

function updateLiveStats() {
    // Simulate realistic changes
    onlinePlayers += Math.floor(Math.random() * 11) - 5;
    discordMembers += Math.floor(Math.random() * 21) - 10;
    activeServers += Math.floor(Math.random() * 5) - 2;
    
    // Keep within realistic ranges
    if (onlinePlayers < 100) onlinePlayers = 100;
    if (onlinePlayers > 500) onlinePlayers = 500;
    if (discordMembers < 800) discordMembers = 800;
    if (discordMembers > 2000) discordMembers = 2000;
    if (activeServers < 50) activeServers = 50;
    if (activeServers > 150) activeServers = 150;
    
    onlineElement.textContent = onlinePlayers;
    discordElement.textContent = discordMembers;
    serversElement.textContent = activeServers;
}

// Update stats every 8 seconds
setInterval(updateLiveStats, 8000);

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active class
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Add scroll event to update active nav link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect for crystal cards
document.querySelectorAll('.crystal-card, .pricing-card, .showcase-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Typing animation for hero text
const riftText = document.querySelector('.rift-text');
if (riftText) {
    const text = riftText.textContent;
    riftText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            riftText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after page load
    setTimeout(typeWriter, 500);
}

// Add floating animation to crystals
const floatingCrystals = document.querySelectorAll('.floating-crystal i, .card-icon i');
floatingCrystals.forEach(crystal => {
    crystal.style.animation = 'float 3s ease-in-out infinite, crystalGlow 2s ease-in-out infinite';
});

// Console welcome message
console.log('%c✨ RIFTCLOUD DEVELOPMENT ✨', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cCrystal PVP Experts | Custom Servers & Plugins', 'color: #ff66ff; font-size: 14px;');
console.log('%cJoin us: https://discord.gg/rCzR5X9KR6', 'color: #5865F2; font-size: 12px;');