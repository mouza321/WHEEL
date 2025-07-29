const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');

const segments = [
    'جرب تانى ',
    'قسيمة شراء',
    'خصم 5%',
    'جرب تانى ',
];

const colors = [
    'rgba(77 ,77 ,79,1)',
    'rgba(196, 156, 108, 1)',
    'rgba(255 ,204, 177,1)',
    'rgba(176 ,176 ,180,1)',
];

const wheelRadius = wheel.width / 2;
const centerX = wheel.width / 2;
const centerY = wheel.height / 2;
const segmentAngle = (2 * Math.PI) / segments.length;

let currentAngle = 0;
let spinning = false;

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        const startAngle = currentAngle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(segments[i], wheelRadius - 10, 10);
        ctx.restore();
    }
}

function spin() {
    if (spinning) return;
    spinning = true;
    spinButton.disabled = true;
    resultDiv.textContent = '';

    // Random spin duration and final angle
    const spins = Math.floor(Math.random() * 3) + 4; // 4 to 6 spins
    const randomSegment = Math.floor(Math.random() * segments.length);
    const finalAngle = (2 * Math.PI * spins) + (randomSegment * segmentAngle) + segmentAngle / 2;

    const duration = 4000; // 4 seconds
    const start = performance.now();

    function animate(time) {
        const elapsed = time - start;
        if (elapsed < duration) {
            // Ease out rotation
            const easeOut = 1 - Math.pow(1 - elapsed / duration, 3);
            currentAngle = easeOut * finalAngle;
            draw();
            requestAnimationFrame(animate);
        } else {
            currentAngle = finalAngle;
            draw();
            spinning = false;
            spinButton.disabled = false;
            const winningIndex = randomSegment;
            resultDiv.textContent = `الفائز: ${segments[winningIndex]}`;
        }
    }

    requestAnimationFrame(animate);
}

function draw() {
    ctx.clearRect(0, 0, wheel.width, wheel.height);
    drawWheel();
    // Draw pointer
    ctx.fillStyle = '#d35400';
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY - wheelRadius + 10);
    ctx.lineTo(centerX + 15, centerY - wheelRadius + 10);
    ctx.lineTo(centerX, centerY - wheelRadius - 20);
    ctx.closePath();
    ctx.fill();
}

spinButton.addEventListener('click', spin);

draw();
