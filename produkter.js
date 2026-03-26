const produkter = [
  {
    navn: "Strawberry Dream",
    pris: 49,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post.png",
  },
  {
    navn: "Raspberry",
    pris: 52,
    billede: "4.png",
  },
  {
    navn: "Strawberry Matcha",
    pris: 55,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 2.png",
  },
  {
    navn: "Sneakers",
    pris: 54,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi.png",
  },
  {
    navn: "Cookies & Chocolate",
    pris: 53,
    billede: "1.png",
  },
  {
    navn: "Almond Caramel",
    pris: 56,
    billede: "2.png",
  },
  {
    navn: "Salted Caramel Pretzel",
    pris: 51,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 3.svg",
  },
  {
    navn: "Peanut Butter Brownie",
    pris: 55,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 2.svg",
  },
  {
    navn: "Mango Tango",
    pris: 50,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi.svg",
  },
  {
    navn: "Blueberry Cheesecake",
    pris: 54,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 4.svg",
  },
  {
    navn: "Caramel Popcorn",
    pris: 58,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 6.svg",
  },
  {
    navn: "Lemon Cheesecake Swirl",
    pris: 56,
    billede: "Brown and White Playful Chocolate Dessert Instagram Post-kopi 5.svg",
  }
];

const kurv = [];

function renderProdukter() {
  const liste = document.getElementById("produktListe");
  liste.innerHTML = produkter.map((p, i) => `
    <div class="produkt-card">
      <img src="${p.billede}" alt="${p.navn}">
      <h2>${p.navn}</h2>
      <div class="produkt-pris">${p.pris} kr.</div>
      <div class="produkt-antal">
        <label for="antal-${i}">Antal:</label>
        <input type="number" id="antal-${i}" min="1" value="1">
      </div>
      <button onclick="laegIKurv(${i})">Læg i kurv</button>
    </div>
  `).join("");
}

function laegIKurv(i) {
  const antal = parseInt(document.getElementById(`antal-${i}`).value) || 1;
  const eksisterende = kurv.find(item => item.navn === produkter[i].navn);
  if (eksisterende) {
    eksisterende.antal += antal;
  } else {
    kurv.push({ ...produkter[i], antal });
  }
  visKurv();
  // Scroll og åbn kurven
  const sidebar = document.getElementById("kurvSidebar");
  if (sidebar) {
    sidebar.classList.remove("hidden");
    sidebar.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function visKurv() {
  const sidebar = document.getElementById("kurvSidebar");
  sidebar.classList.remove("hidden");
  const indhold = document.getElementById("kurvIndhold");
  const items = document.getElementById("kurvItems");
  if (indhold && items) {
    items.innerHTML = kurv.map((item, idx) => `
      <li style="margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.7rem;">
        <img src="${item.billede}" alt="${item.navn}" style="width:40px;vertical-align:middle;">
        <span style="flex:1;">${item.navn} x ${item.antal} = <b>${item.antal * item.pris} kr.</b></span>
        <button onclick="fjernFraKurv(${idx})" style="background:#a80050;color:#fff;border:none;border-radius:1em;padding:0.3em 1em;cursor:pointer;font-size:1em;">Fjern</button>
      </li>
    `).join("");
    const total = kurv.reduce((sum, item) => sum + item.antal * item.pris, 0);
    document.getElementById("kurvTotal").innerHTML = `<b style='font-size:1.2em;'>Total: ${total} kr.</b>`;
    // Opdater antal i kurv-ikonet i headeren
    const antal = kurv.reduce((sum, item) => sum + item.antal, 0);
    const kurvAntal = document.getElementById("kurvAntal");
    if (kurvAntal) kurvAntal.textContent = antal;
  }
}

function fjernFraKurv(idx) {
  kurv.splice(idx, 1);
  visKurv();
  // Opdater antal i header
  const antal = kurv.reduce((sum, item) => sum + item.antal, 0);
  const kurvAntal = document.getElementById("kurvAntal");
  if (kurvAntal) kurvAntal.textContent = antal;
}

function setupTakBeskedHandlers() {
  const nyOrdreBtn = document.getElementById("nyOrdre");
  if (nyOrdreBtn) {
    nyOrdreBtn.onclick = () => {
      // Luk kurven (samme som 'Luk' knappen)
      const sidebar = document.getElementById("kurvSidebar");
      if (sidebar) sidebar.classList.add("hidden");
      // Nulstil kurven
      kurv.length = 0;
      // Genskab kurvindholdet til tom kurv
      const indhold = document.getElementById("kurvIndhold");
      if (indhold) {
        indhold.innerHTML = `
          <h2>Din kurv</h2>
          <ul id="kurvItems"></ul>
          <div style="height:2rem;"></div>
          <div id="kurvTotal"></div>
        `;
      }
      // Opdater antal i header
      const kurvAntal = document.getElementById("kurvAntal");
      if (kurvAntal) kurvAntal.textContent = 0;
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProdukter();

  // Søgning på produkter
  const soegInput = document.getElementById("soegInput");
  const produktListe = document.getElementById("produktListe");
  if (soegInput && produktListe) {
    soegInput.addEventListener("input", function() {
      const query = this.value.trim().toLowerCase();
      if (query === "") {
        renderProdukter();
        return;
      }
      const resultater = produkter.filter(p =>
        p.navn.toLowerCase().includes(query) ||
        (p.pris + " kr.").includes(query)
      );
      if (resultater.length === 0) {
        produktListe.innerHTML = '<div style="padding:2rem;font-size:1.2em;">Ingen produkter matcher din søgning.</div>';
      } else {
        produktListe.innerHTML = resultater.map((p, i) => `
          <div class="produkt-card">
            <img src="${p.billede}" alt="${p.navn}">
            <h2>${p.navn}</h2>
            <div class="produkt-pris">${p.pris} kr.</div>
            <div class="produkt-antal">
              <label for="antal-soeg-${i}">Antal:</label>
              <input type="number" id="antal-soeg-${i}" min="1" value="1">
            </div>
            <button onclick="laegIKurvSoeg(${JSON.stringify(p).replace(/"/g, '&quot;')}, 'antal-soeg-${i}')">Læg i kurv</button>
          </div>
        `).join("");
      }
    });
  }
  document.getElementById("kurvLuk").onclick = () => {
    document.getElementById("kurvSidebar").classList.add("hidden");
  };
  // Klik på kurv-ikonet i headeren åbner kurvSidebar
  const kurvBtn = document.getElementById("kurvBtn");
  if (kurvBtn) {
    kurvBtn.onclick = () => {
      document.getElementById("kurvSidebar").classList.remove("hidden");
      visKurv();
    };
  }
  // Gå til betaling-knap
  const betalBtn = document.getElementById("betalBtn");
  if (betalBtn) {
    betalBtn.onclick = () => {
      document.getElementById("kurvIndhold").innerHTML = `
        <h2>Tak for din bestilling!</h2>
        <p style='font-size:1.2em;margin:2rem 0;'>Vi har modtaget din ordre og glæder os til at lave din milkshake.</p>
        <button id="nyOrdre" class="betal-btn" style="margin-bottom:1rem;">Lav ny ordre</button>
      `;
      setupTakBeskedHandlers();
    };
  }
});

// Hjælpefunktion til at lægge søgte produkter i kurven
window.laegIKurvSoeg = function(produktObj, antalInputId) {
  const antal = parseInt(document.getElementById(antalInputId).value) || 1;
  const eksisterende = kurv.find(item => item.navn === produktObj.navn);
  if (eksisterende) {
    eksisterende.antal += antal;
  } else {
    kurv.push({ ...produktObj, antal });
  }
  visKurv();
};
