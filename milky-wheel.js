


function renderMilkyPrizeWheel() {
	const section = document.createElement('section');
	section.className = 'milky-wheel-section';
	section.innerHTML = `
		<h2 class="milky-wheel-heading">Spin the Wheel & Vind Rabat!</h2>
		<div class="milky-wheel-content">
			<div class="milky-wheel-img-frame"><img src="${milkyPrizes[0].img}" alt="Spin the wheel" class="milky-wheel-img"></div>
			<h3 class="milky-wheel-title">Prøv lykken!</h3>
			<p class="milky-wheel-text">Klik på Spin og se, om du vinder rabat eller en lækker bonus til din milkshake.</p>
			<button class="milky-wheel-spin">Spin!</button>
		</div>
	`;
	// Find den sidste .marquee-container (nederste rullende tekst)
	const marquees = document.querySelectorAll('.marquee-container');
	const lastMarquee = marquees[marquees.length - 1];
	if (lastMarquee && lastMarquee.parentNode) {
		lastMarquee.parentNode.insertBefore(section, lastMarquee.nextSibling);
	}

	const imgFrame = section.querySelector('.milky-wheel-img-frame');
	const img = section.querySelector('.milky-wheel-img');
	const title = section.querySelector('.milky-wheel-title');
	const text = section.querySelector('.milky-wheel-text');
	const btn = section.querySelector('.milky-wheel-spin');

	btn.addEventListener('click', () => {
		btn.disabled = true;
		imgFrame.classList.add('spinning');
		setTimeout(() => {
			let idx = Math.floor(Math.random() * milkyPrizes.length);
			img.src = milkyPrizes[idx].img;
			img.alt = 'Spin result';
			title.textContent = idx === milkyPrizes.length - 1 ? 'Uheldig!' : 'Tillykke!';
			text.textContent = milkyPrizes[idx].text;
			imgFrame.classList.remove('spinning');
			btn.disabled = false;
		}, 1200);
	});
}

document.addEventListener('DOMContentLoaded', renderMilkyPrizeWheel);
