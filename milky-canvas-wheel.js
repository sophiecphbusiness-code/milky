// Spin the Wheel
const milkyPrizes = [
  { label: '10% rabat', color: '#a80050' },
  { label: 'Gratis topping', color: '#f3c6e6' },
  { label: '15% rabat', color: '#a80050' },
  { label: '2 for 1', color: '#f3c6e6' },
  { label: '20% limited', color: '#a80050' },
  { label: 'Prøv igen', color: '#f3c6e6' }
];

function drawWheel(ctx, prizes, angle) {
  const size = 320;
  const cx = size / 2, cy = size / 2, r = size / 2 - 10;
  const n = prizes.length;
  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < n; i++) {
    const start = angle + (i * 2 * Math.PI / n);
    const end = angle + ((i + 1) * 2 * Math.PI / n);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = prizes[i].color;
    ctx.fill();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + (end - start) / 2);
    ctx.textAlign = 'right';
    ctx.font = 'bold 1.1rem Chewy, Arial, sans-serif';
    ctx.fillStyle = '#222';
    ctx.fillText(prizes[i].label, r - 18, 8);
    ctx.restore();
  }
}

function renderMilkyWheelCanvas() {
  const section = document.createElement('section');
  section.className = 'milky-canvas-wheel-section';
  section.innerHTML = `
    <h2 class="milky-wheel-heading">Spin the Wheel & Vind Rabat!</h2>
    <div class="milky-canvas-wheel-wrap">
      <canvas width="320" height="320" class="milky-canvas-wheel"></canvas>
      <div class="milky-canvas-arrow">▼</div>
    </div>
    <button class="milky-canvas-spin" style="background:#ff7eb9;color:#fff;border:none;padding:0.9em 2.2em;font-size:1.2em;border-radius:2em;box-shadow:0 2px 10px #f3c6e6;cursor:pointer;transition:background 0.2s;">Spin!</button>
  `;
  // Find den sidste .marquee-container (nederste rullende tekst)
  const marquees = document.querySelectorAll('.marquee-container');
  const lastMarquee = marquees[marquees.length - 1];
  if (lastMarquee && lastMarquee.parentNode) {
    lastMarquee.parentNode.insertBefore(section, lastMarquee.nextSibling);
  }

  const canvas = section.querySelector('.milky-canvas-wheel');
  const ctx = canvas.getContext('2d');
  let angle = 0;
  drawWheel(ctx, milkyPrizes, angle);

  const spinBtn = section.querySelector('.milky-canvas-spin');
  let spinning = false;

  spinBtn.addEventListener('click', () => {
    if (spinning) return;
    spinning = true;
    let spinAngle = Math.random() * 2 * Math.PI + 8 * 2 * Math.PI;
    let start = angle;
    let startTime = null;
    function animateWheel(ts) {
      if (!startTime) startTime = ts;
      let elapsed = ts - startTime;
      let progress = Math.min(elapsed / 2200, 1);
      angle = start + (spinAngle - start) * easeOutCubic(progress);
      drawWheel(ctx, milkyPrizes, angle);
      if (progress < 1) {
        requestAnimationFrame(animateWheel);
      } else {
        // Find vinder
        let n = milkyPrizes.length;
        let winIdx = n - Math.floor(((angle % (2 * Math.PI)) / (2 * Math.PI)) * n) - 1;
        if (winIdx < 0) winIdx += n;
        spinning = false;
      }
    }
    requestAnimationFrame(animateWheel);
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

document.addEventListener('DOMContentLoaded', renderMilkyWheelCanvas);