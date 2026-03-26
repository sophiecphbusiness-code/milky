// Dynamisk USP-sektion til Milky
const milkyUSPData = [
  {
    img: 'Brown and White Playful Bubble Tea Logo.svg',
    title: 'Hjemmelavet is',
    text: 'Vi laver vores is fra bunden i butikken – altid frisk, cremet og med de bedste råvarer. Det giver en milkshake, du ikke finder andre steder!'
  },
  {
    img: 'Skærmbillede 2026-03-25 kl. 15.59.11.png',
    title: 'Kreative smage',
    text: 'Vores menu byder på alt fra klassiske favoritter til vilde limited editions. Der er altid noget nyt at prøve!'
  },
  {
    img: 'JPEG-billede-40C2-AEFA-B7-0.jpeg',
    title: 'Kærlighed i hver kop',
    text: 'Vi elsker milkshakes – og det kan smages! Hver eneste shake laves med passion og et smil.'
  }
];

function renderMilkyUSP() {
  const uspSection = document.createElement('section');
  uspSection.className = 'milky-usp-dynamic';
  uspSection.innerHTML = `
    <h2 class="milky-usp-heading">Hvorfor vælge Milky?</h2>
    <div class="milky-usp-row">
      ${milkyUSPData.map(item => `
        <div class="milky-usp-col">
          <img src="${item.img}" alt="${item.title}" class="milky-usp-img">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      `).join('')}
    </div>
  `;
  // Indsæt lige under første .marquee-container
  const firstMarquee = document.querySelector('.marquee-container');
  if (firstMarquee && firstMarquee.parentNode) {
    firstMarquee.parentNode.insertBefore(uspSection, firstMarquee.nextSibling);
  }
}

document.addEventListener('DOMContentLoaded', renderMilkyUSP);