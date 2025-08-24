

// Create Confetti
import participants from "./participants.js"

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    const colors = ['#f97316', '#8b5cf6', '#3b82f6', '#10b981', '#f43f5e', '#ec4899', '#34d399', '#fbbf24'];

    for (let i = 0; i < 300; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = Math.random() * -100 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const size = Math.random() * 10 + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';

        confettiContainer.appendChild(confetti);

        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 4000,
            easing: 'cubic-bezier(0.1, 0.3, 0.3, 1)'
        });

        animation.onfinish = () => confetti.remove();
    }
}

// Slot Machine Animation
function startSlotMachine() {
    const initialState = document.getElementById('initial-state');
    const slotContainer = document.getElementById('slot-machine-container');
    const slotNames = document.getElementById('slot-names');
    const spotlight = document.getElementById('spotlight');

    // Hide initial state, show slot machine
    initialState.classList.add('hidden');
    slotContainer.classList.remove('hidden');

    // Show spotlight
    setTimeout(() => {
        spotlight.classList.add('visible');
    }, 500);

    // Use real participants
    const allNames = [...participants];

    // Create slot machine names
    slotNames.innerHTML = allNames.map(name =>
        `<div class="slot-name">${name}</div>`
    ).join('');

    // Winner (pre-decided)
    const winnerName = "Manasvi Septa";

    // FIX: we know she is at index 332
    const winnerIndex = 332;

    // Slot + container height (adjust based on your CSS)
    const slotHeight = 120;
    const containerHeight = 360; // visible window height
    const offset = (containerHeight / 2) - (slotHeight / 2);

    // Calculate stopping point so winner is centered
    const targetPosition = (winnerIndex * slotHeight) - offset;

    let position = 0;
    let animationId;
    let startTime = Date.now();
    const totalDuration = 20000; // 10 seconds

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / totalDuration);

        // Ease-out effect for dramatic stop
        const easeOut = 1 - Math.pow(1 - progress, 3);
        position = easeOut * targetPosition;

        slotNames.style.transform = `translateY(-${position}px)`;
        
        if (progress >= 1) {
            cancelAnimationFrame(animationId);
            showWinner(); // show winner immediately
            return;
        }


        animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
}

// Show Winner with prize reveal
function showWinner() {
    const slotContainer = document.getElementById('slot-machine-container');
    const winnerResult = document.getElementById('winner-result');
    const winnerCard = document.getElementById('winner-card');

    slotContainer.classList.add('hidden');
    winnerResult.classList.remove('hidden');

    setTimeout(() => {
        winnerCard.classList.add('visible');
    }, 200);


    const prizeElements = document.querySelectorAll('.prize-reveal');
    prizeElements.forEach((el, index) => {
        el.classList.add('visible');
        if (index === prizeElements.length - 1) {
            createConfetti();
        }
    });
}

// Start the draw
document.getElementById('start-draw').addEventListener('click', startSlotMachine);
