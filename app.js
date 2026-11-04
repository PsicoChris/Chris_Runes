const RUNES = [
  { name: "Fehu", glyph: "ᚠ", meaning: "Riqueza, abundancia, éxito material, energía en movimiento y nuevos comienzos." },
  { name: "Uruz", glyph: "ᚢ", meaning: "Fuerza física, vitalidad, salud robusta, coraje y energía primal." },
  { name: "Thurisaz", glyph: "ᚦ", meaning: "Protección, defensa, fuerzas en bruto, ruptura de obstáculos y purificación." },
  { name: "Ansuz", glyph: "ᚨ", meaning: "Sabiduría, comunicación, inspiración divina, verdad y guía ancestral." },
  { name: "Raidho", glyph: "ᚱ", meaning: "Viaje, movimiento, evolución personal, el camino correcto y destino." },
  { name: "Kenaz", glyph: "ᚲ", meaning: "Luz interior, antorcha, creatividad, claridad mental y transformación." },
  { name: "Gebo", glyph: "ᚷ", meaning: "Regalo, alianza, generosidad, reciprocidad y uniones kármicas o afectivas." },
  { name: "Wunjo", glyph: "ᚹ", meaning: "Alegría, felicidad, armonía, bienestar y satisfacción por el deber cumplido." },
  { name: "Hagalaz", glyph: "ᚺ", meaning: "Granizo, disrupción necesaria, fuerzas fuera de nuestro control y transformación radical." },
  { name: "Nauthiz", glyph: "ᚾ", meaning: "Necesidad, restricción, paciencia, resistencia ante la escasez y gran aprendizaje." },
  { name: "Isa", glyph: "ᛁ", meaning: "Hielo, pausa, estancamiento temporal, introspección y autocontrol." },
  { name: "Jera", glyph: "ᛃ", meaning: "Cosecha, ciclo natural, recompensa al esfuerzo paciente y el tiempo correcto." },
  { name: "Eihwaz", glyph: "ᛇ", meaning: "Tejo, resistencia, resiliencia, transformación profunda y conexión espiritual." },
  { name: "Perthro", glyph: "ᛈ", meaning: "Misterio, lo oculto, el destino, azar, revelación y potencial por descubrir." },
  { name: "Algiz", glyph: "ᛉ", meaning: "Protección divina, escudo, refugio seguro y conexión con los planos superiores." },
  { name: "Sowilo", glyph: "ᛊ", meaning: "Sol, energía vital, éxito rotundo, claridad, salud y triunfo sobre la oscuridad." },
  { name: "Tiwaz", glyph: "ᛏ", meaning: "Justicia, honor, liderazgo, sacrificio noble y victoria merecida." },
  { name: "Berkano", glyph: "ᛒ", meaning: "Abedul, fertilidad, nacimiento, crecimiento, sanación y nuevos proyectos." },
  { name: "Ehwaz", glyph: "ᛖ", meaning: "Caballo, cooperación, confianza mutua, trabajo en equipo y progreso fluido." },
  { name: "Mannaz", glyph: "ᛗ", meaning: "Humanidad, el ser, la comunidad, la mente consciente y la cooperación social." },
  { name: "Laguz", glyph: "ᛚ", meaning: "Agua, intuición, el inconsciente, emociones profundas y flujo natural." },
  { name: "Ingwaz", glyph: "ᛜ", meaning: "Fertilidad masculina, gestación, descanso antes del crecimiento y nuevos comienzos." },
  { name: "Dagaz", glyph: "ᛞ", meaning: "Día, amanecer, despertar espiritual, claridad total y gran avance." },
  { name: "Othala", glyph: "ᛟ", meaning: "Herencia, hogar, raíces familiares, tradiciones y legado ancestral." }
];

const drawCount = document.querySelector("#draw-count");
const drawButton = document.querySelector("#draw-button");
const resetButton = document.querySelector("#reset-button");
const board = document.querySelector("#rune-board");
const status = document.querySelector("#status");
const remaining = document.querySelector("#remaining");

let availableRunes = [...RUNES];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function updateRemaining() {
  remaining.textContent = `${availableRunes.length} disponibles`;
  drawButton.disabled = availableRunes.length === 0;
}

function drawRunes() {
  const count = Number(drawCount.value);

  if (count > availableRunes.length) {
    status.textContent = "No quedan suficientes runas. Reinicia el conjunto.";
    return;
  }

  const shuffled = shuffle(availableRunes);
  const selected = shuffled.slice(0, count);

  const selectedNames = new Set(selected.map(rune => rune.name));
  availableRunes = availableRunes.filter(rune => !selectedNames.has(rune.name));

  renderRunes(selected);
  status.textContent = `Has extraído ${count} ${count === 1 ? "runa" : "runas"}. Haz clic sobre ellas para voltearlas.`;

  updateRemaining();
}

function renderRunes(runes) {
  board.innerHTML = "";

  runes.forEach((rune, index) => {
    const slot = document.createElement("div");
    slot.className = "rune-slot";

    const card = document.createElement("button");
    card.type = "button";
    card.className = "rune-card";
    card.setAttribute("aria-label", `Voltear runa ${index + 1}: ${rune.name}`);
    card.setAttribute("aria-pressed", "false");

    const inner = document.createElement("span");
    inner.className = "card-inner";

    const back = document.createElement("span");
    back.className = "card-face card-back";
    back.setAttribute("aria-hidden", "true");
    back.textContent = "ᚱ";

    const front = document.createElement("span");
    front.className = "card-face card-front";

    const glyph = document.createElement("span");
    glyph.className = "rune-glyph";
    glyph.textContent = rune.glyph;

    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = rune.name;

    front.append(glyph, name);
    inner.append(back, front);
    card.append(inner);

    const position = document.createElement("div");
    position.className = "position";
    position.textContent = `Runa ${index + 1}`;

    const hint = document.createElement("div");
    hint.className = "flip-hint";
    hint.textContent = "Clic para voltear";

  
    const tooltip = document.createElement("div");
    tooltip.className = "rune-tooltip";
    
    const tooltipTitle = document.createElement("span");
    tooltipTitle.className = "rune-tooltip-title";
    tooltipTitle.textContent = rune.name.toUpperCase();
    
    const tooltipDesc = document.createElement("p");
    tooltipDesc.className = "rune-tooltip-desc";
    tooltipDesc.textContent = rune.meaning;
    
    tooltip.append(tooltipTitle, tooltipDesc);

    let hoverTimer = null;

    // Al poner el mouse encima, esperamos 2 segundos (2000 ms)
    slot.addEventListener("mouseenter", () => {
      hoverTimer = setTimeout(() => {
        tooltip.classList.add("is-visible");
      }, 2000);
    });

    // Si el usuario quita el mouse antes o después, limpiamos y ocultamos
    slot.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
      tooltip.classList.remove("is-visible");
    });

    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", String(flipped));
      hint.textContent = flipped ? "Clic para ocultar" : "Clic para voltear";
    });

    slot.append(card, position, hint, tooltip);
    board.append(slot);
  });
}

function resetBag() {
  availableRunes = [...RUNES];

  board.innerHTML = `
    <div class="empty-state">
      <span class="empty-symbol">ᚱ</span>
      <p>Tus runas aparecerán aquí.</p>
      <small>
        Cuando aparezcan, haz clic sobre cada una para voltearla.
      </small>
    </div>
  `;

  status.textContent = "Conjunto reiniciado. Las 24 runas están disponibles.";
  updateRemaining();
}

drawButton.addEventListener("click", drawRunes);
resetButton.addEventListener("click", resetBag);

updateRemaining();