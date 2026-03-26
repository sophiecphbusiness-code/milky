// --- FEATURED MILKSHAKES SLIDER ---
const featuredCards = [
	{
		img: '4.png',
		alt: "Raspberry Milkshake",
		name: "Raspberry",
		limited: false
	},
	{
		img: 'Brown and White Playful Chocolate Dessert Instagram Post-kopi 2.png',
		alt: "Strawberry Matcha",
		name: "Strawberry<br>Matcha",
		limited: true
	},
	{
		img: 'Brown and White Playful Chocolate Dessert Instagram Post-kopi.png',
		alt: "Sneakers Milkshake",
		name: "Sneakers",
		limited: false
	},
	{
		img: '1.png',
		alt: "Cookies & Chocolate Milkshake",
		name: "Cookies &<br>Chocolate",
		limited: false
	},
	{
		img: '2.png',
		alt: "Almond Caramel Milkshake",
		name: "Almond &<br>Caramel",
		limited: false
	},
	{
		img: 'Brown and White Playful Chocolate Dessert Instagram Post.png',
		alt: "Strawberry Milkshake",
		name: "Strawberry",
		limited: false
	}
];

let featuredIndex = 1; // always show the middle as main

function renderFeaturedSlider() {
	const cardsContainer = document.querySelector('.featured-cards');
	const dots = document.querySelectorAll('.slider-dots .dot');
	const title = document.querySelector('.featured-title');
	if (!cardsContainer) return;
	// Calculate indices for faded-left, main, faded-right
	const left = (featuredIndex + featuredCards.length - 1) % featuredCards.length;
	const main = featuredIndex;
	const right = (featuredIndex + 1) % featuredCards.length;

	// Skift overskrift hvis cookies- eller almond caramel-variant vises
	if (title) {
		const name = featuredCards[main].name.replace(/<br>/g, ' ').toLowerCase();
		if (name.includes('cookies')) {
			title.textContent = 'Cookies & Chocolate';
		} else if (name.includes('almond') && name.includes('caramel')) {
			title.textContent = 'Almond Caramel';
		} else if (/^strawberry\s*$/i.test(name.replace(/<br\s*\/>|<br>/gi, '').trim())) {
			title.textContent = 'Strawberry';
		} else if (/^raspberry\s*$/i.test(name.replace(/<br\s*\/>|<br>/gi, '').trim())) {
			title.textContent = 'Raspberry & White Chocolate';
		} else if (/^sneakers\s*$/i.test(name.replace(/<br\s*\/>|<br>/gi, '').trim())) {
			title.textContent = 'Sneakers';
		} else if (name.replace(/<br\s*\/>|<br>/gi, '').trim().toLowerCase() === 'strawberry matcha') {
			title.textContent = 'Strawberry Matcha';
		} else {
			title.textContent = 'Featured Milkshakes';
		}
	}

  // Build cards (no add-to-cart button)
  cardsContainer.innerHTML = `
    <div class="featured-card faded">
      <img src="${featuredCards[left].img}" alt="${featuredCards[left].alt}">
    </div>
    <div class="featured-card main">
      <img src="${featuredCards[main].img}" alt="${featuredCards[main].alt}">
    </div>
    <div class="featured-card faded">
      <img src="${featuredCards[right].img}" alt="${featuredCards[right].alt}">
    </div>
  `;


	// Dynamisk generér dots
	const dotsContainer = document.querySelector('.slider-dots');
	if (dotsContainer) {
		dotsContainer.innerHTML = '';
		for (let i = 0; i < featuredCards.length; i++) {
			const dot = document.createElement('span');
			dot.className = 'dot' + (i === main ? ' active' : '');
			dot.addEventListener('click', () => {
				featuredIndex = i;
				renderFeaturedSlider();
			});
			dotsContainer.appendChild(dot);
		}
	}
}

function featuredPrev() {
	featuredIndex = (featuredIndex + featuredCards.length - 1) % featuredCards.length;
	renderFeaturedSlider();
}
function featuredNext() {
	featuredIndex = (featuredIndex + 1) % featuredCards.length;
	renderFeaturedSlider();
}

// --- PRODUKT DATA TIL AUTOCOMPLETE ---
const produkter = [
  { navn: "Strawberry Dream", billede: "Brown and White Playful Chocolate Dessert Instagram Post.png" },
  { navn: "Raspberry", billede: "4.png" },
  { navn: "Strawberry Matcha", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 2.png" },
  { navn: "Sneakers", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi.png" },
  { navn: "Cookies & Chocolate", billede: "1.png" },
  { navn: "Almond Caramel", billede: "2.png" },
  { navn: "Salted Caramel Pretzel", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 3.svg" },
  { navn: "Peanut Butter Brownie", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 2.svg" },
  { navn: "Mango Tango", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi.svg" },
  { navn: "Blueberry Cheesecake", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 4.svg" },
  { navn: "Caramel Popcorn", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 6.svg" },
  { navn: "Lemon Cheesecake Swirl", billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 5.svg" }
];

// --- AUTOCOMPLETE SØGNING ---
window.forsideKurv = window.forsideKurv || [];

function opdaterForsideKurv() {
  let feedback = document.getElementById('forside-kurv-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.id = 'forside-kurv-feedback';
    document.body.appendChild(feedback);
  }
  feedback.textContent = 'Lagt i kurv!';
  feedback.classList.add('visible');
  setTimeout(() => feedback.classList.remove('visible'), 1200);
}

document.addEventListener('DOMContentLoaded', () => {
  const soegInput = document.getElementById('soegInput');
  if (!soegInput) return;
  const parent = soegInput.parentNode;
  if (window.getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }
  let dropdown = document.createElement('ul');
  dropdown.className = 'autocomplete-dropdown';
  dropdown.style.position = 'absolute';
  dropdown.style.left = '0';
  dropdown.style.top = '110%';
  dropdown.style.width = soegInput.offsetWidth + 'px';
  dropdown.style.maxWidth = soegInput.offsetWidth + 'px';
  dropdown.style.display = 'none';
  dropdown.style.listStyle = 'none';
  dropdown.style.margin = '0';
  dropdown.style.padding = '0';
  parent.appendChild(dropdown);

  let currentIdx = -1;
  let matches = [];

  function renderDropdown() {
    dropdown.innerHTML = '';
    if (matches.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Ingen produkter matcher';
      li.style.padding = '0.5em 1em';
      li.style.color = '#a80050';
      dropdown.appendChild(li);
      currentIdx = -1;
      return;
    }
    matches.forEach((p, idx) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '0.7em';
      li.style.padding = '0.35em 0.7em';
      li.style.cursor = 'pointer';
      li.style.fontSize = '0.98em';
      li.style.background = idx === currentIdx ? '#ffe6f0' : 'transparent';
      li.innerHTML = `<img src="${p.billede}" alt="${p.navn}" style="width:24px;height:24px;border-radius:5px;object-fit:cover;"> <span>${p.navn}</span> <button class='autocomplete-lig-i-kurv' style='margin-left:auto;background:#a80050;color:#fff;border:none;border-radius:1em;padding:0.15em 0.7em;font-size:0.93em;cursor:pointer;'>Læg i kurv</button>`;
      // Klik på navn udfylder feltet
      li.querySelector('span').onclick = (e) => {
        e.stopPropagation();
        soegInput.value = p.navn;
        dropdown.style.display = 'none';
      };
      // Klik på knap lægger i "kurv"
      li.querySelector('button').onclick = (e) => {
        e.stopPropagation();
        window.forsideKurv.push({ navn: p.navn, antal: 1 });
        opdaterForsideKurv();
        dropdown.style.display = 'none';
        soegInput.value = '';
      };
      li.onmouseenter = () => {
        currentIdx = idx;
        renderDropdown();
      };
      dropdown.appendChild(li);
    });
  }

  soegInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    if (!query) {
      dropdown.style.display = 'none';
      matches = [];
      return;
    }
    matches = produkter.filter(p => p.navn.toLowerCase().includes(query)).slice(0, 5);
    currentIdx = -1;
    renderDropdown();
    dropdown.style.display = 'block';
  });

  soegInput.addEventListener('keydown', function(e) {
    if (dropdown.style.display !== 'block' || matches.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIdx = (currentIdx + 1) % matches.length;
      renderDropdown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIdx = (currentIdx - 1 + matches.length) % matches.length;
      renderDropdown();
    } else if (e.key === 'Enter') {
      if (currentIdx >= 0 && matches[currentIdx]) {
        soegInput.value = matches[currentIdx].navn;
        dropdown.style.display = 'none';
      }
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (!soegInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// Gør bestemte navne i .marquee bold
document.querySelectorAll('.marquee span').forEach(span => {
	span.innerHTML = span.innerHTML.replace(/(Strawberry|Raspberry & White Chocolate|Strawberry Matcha|Sneakers|Cookies & Chocolate|Almond Caramel)/g, '<b>$1</b>');
});

// Initial render
renderFeaturedSlider();

// Arrow events
const leftBtn = document.querySelector('.slider-arrow.left');
const rightBtn = document.querySelector('.slider-arrow.right');
if (leftBtn) leftBtn.addEventListener('click', featuredPrev);
if (rightBtn) rightBtn.addEventListener('click', featuredNext);

// Dots events
const dots = document.querySelectorAll('.slider-dots .dot');
dots.forEach((dot, i) => {
	dot.addEventListener('click', () => {
		featuredIndex = i;
		renderFeaturedSlider();
	});
});
