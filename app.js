const RUNES = [
  { name: "Fehu", glyph: "ᚠ", meaning: "Riqueza, abundancia, éxito material, energía en movimiento y nuevos comienzos.", meaningInv: "Retraso financiero, pérdida de bienes, avaricia o mala gestión de recursos." },
  { name: "Uruz", glyph: "ᚢ", meaning: "Fuerza física, vitalidad, salud robusta, coraje y energía primal.", meaningInv: "Debilidad, falta de dirección, salud disminuida o energía mal canalizada." },
  { name: "Thurisaz", glyph: "ᚦ", meaning: "Protección, defensa, fuerzas en bruto, ruptura de obstáculos y purificación.", meaningInv: "Vulnerabilidad, decisiones tomadas por impulso, peligro o bloqueos internos." },
  { name: "Ansuz", glyph: "ᚨ", meaning: "Sabiduría, comunicación, inspiración divina, verdad y guía ancestral.", meaningInv: "Malentendidos, engaños, falta de comunicación o consejos desacertados." },
  { name: "Raidho", glyph: "ᚱ", meaning: "Viaje, movimiento, evolución personal, el camino correcto y destino.", meaningInv: "Retrasos en viajes, estancamiento, interrupciones o rumbo equivocado." },
  { name: "Kenaz", glyph: "ᚲ", meaning: "Luz interior, antorcha, creatividad, claridad mental y transformación.", meaningInv: "Pérdida de inspiración, oscuridad, creatividad bloqueada o ilusión." },
  { name: "Gebo", glyph: "ᚷ", meaning: "Regalo, alianza, generosidad, reciprocidad y uniones kármicas o afectivas.", meaningInv: "Desequilibrio en relaciones, egoísmo, ruptura de acuerdos o deudas kármicas." },
  { name: "Wunjo", glyph: "ᚹ", meaning: "Alegría, felicidad, armonía, bienestar y satisfacción por el deber cumplido.", meaningInv: "Tristeza, desarmonía, alienación o expectativas no cumplidas." },
  { name: "Hagalaz", glyph: "ᚺ", meaning: "Granizo, disrupción necesaria, fuerzas fuera de nuestro control y transformación radical.", meaningInv: "Crisis prolongada, catástrofe evitable por terquedad o sufrimiento estéril." },
  { name: "Nauthiz", glyph: "ᚾ", meaning: "Necesidad, restricción, paciencia, resistencia ante la escasez y gran aprendizaje.", meaningInv: "Opresión extrema, frustración severa, limitaciones agobiantes o urgencia mal gestionada." },
  { name: "Isa", glyph: "ᛁ", meaning: "Hielo, pausa, estancamiento temporal, introspección y autocontrol.", meaningInv: "Frialdad, egoísmo paralizante, engaño oculto bajo la superficie o inercia tóxica." },
  { name: "Jera", glyph: "ᛃ", meaning: "Cosecha, ciclo natural, recompensa al esfuerzo paciente y el tiempo correcto.", meaningInv: "Malos resultados por impaciencia, ciclos repetitivos negativos o esfuerzo no recompensado." },
  { name: "Eihwaz", glyph: "ᛇ", meaning: "Tejo, resistencia, resiliencia, transformación profunda y conexión espiritual.", meaningInv: "Miedo al cambio, debilidad interior, confusión existencial o resistencia inútil." },
  { name: "Perthro", glyph: "ᛈ", meaning: "Misterio, lo oculto, el destino, azar, revelación y potencial por descubrir.", meaningInv: "Secretos revelados a la fuerza, desilusión, adicciones o estancamiento por azar." },
  { name: "Algiz", glyph: "ᛉ", meaning: "Protección divina, escudo, refugio seguro y conexión con los planos superiores.", meaningInv: "Vulnerabilidad ante influencias externas, engaño protector o falta de instinto." },
  { name: "Sowilo", glyph: "ᛊ", meaning: "Sol, energía vital, éxito rotundo, claridad, salud y triunfo sobre la oscuridad.", meaningInv: "Falso éxito, desgaste de energía, orgullo excesivo o ceguera ante la realidad." },
  { name: "Tiwaz", glyph: "ᛏ", meaning: "Justicia, honor, liderazgo, sacrificio noble y victoria merecida.", meaningInv: "Injusticia, falta de motivación, conflictos de autoridad o sacrificio inútil." },
  { name: "Berkano", glyph: "ᛒ", meaning: "Abedul, fertilidad, nacimiento, crecimiento, sanación y nuevos proyectos.", meaningInv: "Retraso en proyectos, problemas familiares, estéril crecimiento o bloqueos de salud." },
  { name: "Ehwaz", glyph: "ᛖ", meaning: "Caballo, cooperación, confianza mutua, trabajo en equipo y progreso fluido.", meaningInv: "Desconfianza, fricción en equipos, viajes cancelados o progreso bloqueado." },
  { name: "Mannaz", glyph: "ᛗ", meaning: "Humanidad, el ser, la comunidad, la mente consciente y la cooperación social.", meaningInv: "Aislamiento, egoísmo social, malentendidos colectivos o prejuicios." },
  { name: "Laguz", glyph: "ᛚ", meaning: "Agua, intuición, el inconsciente, emociones profundas y flujo natural.", meaningInv: "Miedos irracionales, desborde emocional, confusión mental o decisiones intuitivas erradas." },
  { name: "Ingwaz", glyph: "ᛜ", meaning: "Fertilidad masculina, gestación, descanso antes del crecimiento y nuevos comienzos.", meaningInv: "Impotencia creativa, proyectos inconclusos, falsa culminación o retrasos." },
  { name: "Dagaz", glyph: "ᛞ", meaning: "Día, amanecer, despertar espiritual, claridad total y gran avance.", meaningInv: "Miedo a la luz o al cambio de perspectiva, amanecer postergado." },
  { name: "Othala", glyph: "ᛟ", meaning: "Herencia, hogar, raíces familiares, tradiciones y legado ancestral.", meaningInv: "Conflictos familiares, pérdida de bienes heredados, rechazo a las raíces o aislamiento." }
];

const runeBag = document.querySelector("#rune-bag");
const resetButton = document.querySelector("#reset-button");
const board = document.querySelector("#rune-board");
const status = document.querySelector("#status");
const remaining = document.querySelector("#remaining");

let availableRunes = [...RUNES];
let drawnRunesList = [];

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
  if (availableRunes.length === 0) {
    runeBag.style.opacity = "0.5";
    runeBag.style.cursor = "not-allowed";
  } else {
    runeBag.style.opacity = "1";
    runeBag.style.cursor = "grab";
  }
}

// Configurar Arrastre desde la bolsa
runeBag.setAttribute("draggable", "true");

runeBag.addEventListener("dragstart", (e) => {
  if (availableRunes.length === 0) {
    e.preventDefault();
    return;
  }
  runeBag.classList.add("dragging-bag");
});

runeBag.addEventListener("dragend", () => {
  runeBag.classList.remove("dragging-bag");
});

// Eventos sobre el tablero (Zona de soltado)
board.addEventListener("dragover", (e) => {
  e.preventDefault();
  board.classList.add("drag-over");
});

board.addEventListener("dragleave", () => {
  board.classList.remove("drag-over");
});

board.addEventListener("drop", (e) => {
  e.preventDefault();
  board.classList.remove("drag-over");

  if (availableRunes.length === 0) {
    status.textContent = "No quedan más runas en la bolsa. Reinicia el conjunto.";
    return;
  }

  drawSingleRune();
});

function drawSingleRune() {
  // Sacamos una runa aleatoria de la bolsa
  const shuffled = shuffle(availableRunes);
  const rune = shuffled[0];

  // La removemos de disponibles
  availableRunes = availableRunes.filter(r => r.name !== rune.name);

  // Decidir aleatoriamente si sale invertida (50% de probabilidad)
  const isInverted = Math.random() < 0.5;

  const runeData = {
    ...rune,
    inverted: isInverted
  };

  drawnRunesList.push(runeData);
  renderBoard();

  status.textContent = `Has extraído una runa arrastrándola de la bolsa. (${availableRunes.length} restantes)`;
  updateRemaining();
}

function renderBoard() {
  if (drawnRunesList.length === 0) {
    board.innerHTML = `
      <div class="empty-state">
        <span class="empty-symbol">ᚱ</span>
        <p>Tus runas aparecerán aquí.</p>
        <small>Arrastra las runas desde la bolsa y suéltalas en este espacio.</small>
      </div>
    `;
    return;
  }

  board.innerHTML = "";

  drawnRunesList.forEach((rune, index) => {
    const slot = document.createElement("div");
    slot.className = "rune-slot";

    const card = document.createElement("button");
    card.type = "button";
    card.className = `rune-card ${rune.inverted ? "is-inverted" : ""}`;
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
    name.textContent = rune.inverted ? `${rune.name} (Inv.)` : rune.name;

    front.append(glyph, name);
    inner.append(back, front);
    card.append(inner);

    const position = document.createElement("div");
    position.className = "position";
    position.textContent = `Runa ${index + 1}`;

    const hint = document.createElement("div");
    hint.className = "flip-hint";
    hint.textContent = "Clic para voltear";

    // --- BURBUJA FLOTANTE (Con soporte para significado invertido) ---
    const tooltip = document.createElement("div");
    tooltip.className = "rune-tooltip";
    
    const tooltipTitle = document.createElement("span");
    tooltipTitle.className = "rune-tooltip-title";
    tooltipTitle.textContent = rune.inverted ? `${rune.name.toUpperCase()} (INVERTIDA)` : rune.name.toUpperCase();
    
    const tooltipDesc = document.createElement("p");
    tooltipDesc.className = "rune-tooltip-desc";
    tooltipDesc.textContent = rune.inverted ? rune.meaningInv : rune.meaning;
    
    tooltip.append(tooltipTitle, tooltipDesc);

    let hoverTimer = null;

    slot.addEventListener("mouseenter", () => {
      hoverTimer = setTimeout(() => {
        tooltip.classList.add("is-visible");
      }, 2000);
    });

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
  drawnRunesList = [];
  renderBoard();
  status.textContent = "Bolsa reiniciada. Las 24 runas están disponibles de nuevo.";
  updateRemaining();
}

resetButton.addEventListener("click", resetBag);

updateRemaining();