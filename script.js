document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    const cursorText = document.getElementById('cursor-text');
    const backgroundContainer = document.querySelector('.background-hearts');

    // Messages for cursor
    const messages = [
        "WAAH, you Sure?!",
        "Really?",
        "Pagal hain Kya?",
        "Nice Try!",
        "No Escape!",
        "Think Again!",
        "Don't do this!",
        "I will cry...",
        "Just say Yes!",
        "Look at the other button!"
    ];

    // Floating Hearts Generation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // 3-6s
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        backgroundContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHeart, 300);

    // Cursor Follower & Message Cycler
    document.addEventListener('mousemove', (e) => {
        cursorText.style.left = e.clientX + 'px';
        cursorText.style.top = e.clientY + 'px';
    });

    // Change message every time mouse moves significantly or on a timer? 
    // Let's change it based on distance moved or just randomly every few seconds
    // Initial message
    cursorText.textContent = messages[0];
    cursorText.style.opacity = '1';

    // Change message cycler
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        if (cursorText) {
            cursorText.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }
    }, 2000);

    // "No" Button Interaction
    // User requested "No option to intact where it is" and "Hovering over NO option should be disabled"
    noBtn.style.cursor = 'not-allowed';
    // Remove evasion logic entirely

    // Hide cursor text when hovering Yes button
    yesBtn.addEventListener('mouseenter', () => {
        cursorText.style.opacity = '0';
    });
    yesBtn.addEventListener('mouseleave', () => {
        cursorText.style.opacity = '1';
    });

    // "Yes" Button Click
    yesBtn.addEventListener('click', () => {
        // Confetti
        var duration = 5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Show Modal
        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        // Show Corner Buttons
        document.getElementById('corner-buttons').classList.remove('hidden');

        // Stop cursor messages and hide it
        clearInterval(messageInterval);
        cursorText.style.display = 'none';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    });
});
