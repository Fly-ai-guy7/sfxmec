/**
 * SFXMEC (Structurflex Middle East Contracting) - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatCounters();
  initMaterialTabs();
  initPortfolioFilters();
  initProjectModals();
  initConversationalEstimator();
  initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL LISTENER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. ANIMATED NUMBER COUNTERS (SUPPORTS MONUMENTAL TYPOGRAPHY & STATS)
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number, .counter');
  let animated = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          stat.textContent = count.toLocaleString();
        }
      }, 35);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        countUp();
        animated = true;
      }
    });
  }, { threshold: 0.2 });

  const statsTarget = document.querySelector('.hero-monument-stats') || document.querySelector('.hero-stats');
  if (statsTarget) {
    observer.observe(statsTarget);
  }
}

/* ==========================================================================
   3. INTERACTIVE MATERIAL COMPARATOR MATRIX (LIVE ARCHITECTURAL CONSOLE)
   ========================================================================== */
const materialMatrixData = {
  ptfe: {
    lifespan: '35+',
    lifespanUnit: 'Years',
    lifespanBar: '100%',
    lifespanSub: 'Permanent Non-Combustible',
    heat: '85%',
    heatUnit: 'Deflection',
    heatBar: '85%',
    heatSub: 'Blocks 85% Infrared Load',
    strength: '8,000',
    strengthUnit: 'N/5cm',
    strengthBar: '95%',
    strengthSub: 'Woven Glass Fiber Base',
    light: '15%',
    lightUnit: 'Glare-Free',
    lightBar: '25%',
    lightSub: 'Soft Diffused Lux Level',
    badge: 'NON-COMBUSTIBLE • DIN 4102 A2 • ASTM E108',
    title: 'PTFE Architectural Fiberglass',
    desc: 'The premier choice for permanent monumental tensile architecture. Woven glass fiber coated with chemically inert Teflon™ PTFE. Completely impervious to Middle Eastern UV radiation, self-cleaning under rain, with an expected lifespan exceeding 35 years.',
    chemical: 'Woven Silica Glass Core Encapsulated in Dupont Teflon Fluoropolymer',
    cleaning: 'Photocatalytic TiO2 top-coat oxidizes organic airborne dust and soot',
    benchmark: 'Abu Dhabi Ladies Club PTFE Roof, Al Wasl Grand Arena, Terminal 1 Airport Concourse',
    tableRows: [
      { criterion: 'Fire Resistance Classification', rating: '<strong class="highlight-val">Class A / Non-Burning (ASTM E108)</strong>' },
      { criterion: 'Weight per m²', rating: '1.45 kg/m² (~1% weight of insulated glass)' },
      { criterion: 'Thermal Insulation U-Value', rating: '4.5 W/m²K (Single Layer) | 1.8 W/m²K (Insulated Aerogel)' },
      { criterion: 'Middle Eastern UV Resistance', rating: '100% Inert — Zero Photodegradation over 35+ Years' },
      { criterion: 'Standard Joint Methodology', rating: 'High-Temperature Thermal Compression Fusion Seams' }
    ]
  },
  etfe: {
    lifespan: '25 - 30',
    lifespanUnit: 'Years',
    lifespanBar: '80%',
    lifespanSub: 'Self-Extinguishing Fluoropolymer',
    heat: '75%',
    heatUnit: 'Deflection',
    heatBar: '75%',
    heatSub: 'Custom Ceramic Frit Shading',
    strength: '3,500',
    strengthUnit: 'N/5cm',
    strengthBar: '60%',
    strengthSub: 'Biaxially Oriented Extruded Foil',
    light: '92%',
    lightUnit: 'Transparent',
    lightBar: '95%',
    lightSub: 'Glass Clarity at 1% Weight',
    badge: 'GLASS REPLACEMENT • EN 13501-1 B-s1,d0 • 92% LUX',
    title: 'ETFE Pneumatic Foil Cushions',
    desc: 'Transparent architectural foil cushions stabilized with low-pressure pneumatic air supply units. Provides maximum natural daylighting for commercial retail atriums and botanical enclosures with negligible structural dead load.',
    chemical: '100% Recyclable Ethylene Tetrafluoroethylene Fluoropolymer Copolymer',
    cleaning: 'Low-friction surface naturally sheds desert sand and dust via rainwater',
    benchmark: 'Mall Atrium Skylights, Luxury Botanical Gardens, Concourse Enclosures',
    tableRows: [
      { criterion: 'Fire Resistance Classification', rating: '<strong class="highlight-val">Class B1 / Self-Extinguishing (DIN 4102)</strong>' },
      { criterion: 'Weight per m²', rating: '0.35 - 0.70 kg/m² (~1% weight of insulated glass)' },
      { criterion: 'Thermal Insulation U-Value', rating: '1.6 - 2.0 W/m²K (3-Layer Pneumatic Cushion)' },
      { criterion: 'Middle Eastern UV Resistance', rating: '95%+ Transparency; Zero UV-induced embrittlement' },
      { criterion: 'Standard Joint Methodology', rating: 'Continuous CNC Perimeter Aluminum Extrusion Clamping' }
    ]
  },
  pvc: {
    lifespan: '15 - 20+',
    lifespanUnit: 'Years',
    lifespanBar: '55%',
    lifespanSub: 'Flame-Retardant PVDF Topcoat',
    heat: '78%',
    heatUnit: 'Deflection',
    heatBar: '78%',
    heatSub: 'High Solar Reflectance Index',
    strength: '6,000',
    strengthUnit: 'N/5cm',
    strengthBar: '75%',
    strengthSub: 'High-Tenacity Polyester Core',
    light: '10%',
    lightUnit: 'Diffused',
    lightBar: '18%',
    lightSub: 'Uniform Soft Ambient Shade',
    badge: 'HIGH VERSATILITY • NFPA 701 • DIN 4102 B1',
    title: 'PVC / PVDF Tensile Composite',
    desc: 'High-strength woven polyester base fabric coated with plasticized PVC and sealed with a fluoropolymer PVDF protective lacquer. Highly ductile, cost-efficient, and optimized for rapid turnkey fabrication and erection across the GCC.',
    chemical: 'High-Tenacity Woven Polyester Core with Multi-Layer PVDF Protective Lacquer',
    cleaning: 'Fluoro-polymer lacquer resists dust adhering; periodic pressure wash recommended',
    benchmark: 'Golden Gate Mirdif Center, School Courtyard Canopies, Commercial Car Shades',
    tableRows: [
      { criterion: 'Fire Resistance Classification', rating: '<strong class="highlight-val">Flame Retardant (DIN 4102 B1 / NFPA 701)</strong>' },
      { criterion: 'Weight per m²', rating: '0.95 - 1.35 kg/m² (Type II to Type IV grades)' },
      { criterion: 'Thermal Insulation U-Value', rating: '5.2 W/m²K (Single Layer Membrane)' },
      { criterion: 'Middle Eastern UV Resistance', rating: 'PVDF Sealed against photo-oxidation; antifungal treated' },
      { criterion: 'Standard Joint Methodology', rating: 'High-Frequency (HF) Electronic Molecular Seaming' }
    ]
  }
};

function initMaterialTabs() {
  const switchBtns = document.querySelectorAll('.mat-switch-btn');
  if (!switchBtns.length) return;

  const updateMaterialConsole = (matKey) => {
    const data = materialMatrixData[matKey];
    if (!data) return;

    // Update active tab buttons
    switchBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-material') === matKey;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Update KPIs
    const dynLifespan = document.getElementById('dynLifespan');
    const dynHeat = document.getElementById('dynHeat');
    const dynStrength = document.getElementById('dynStrength');
    const dynLight = document.getElementById('dynLight');

    if (dynLifespan) dynLifespan.innerHTML = `${data.lifespan} <span class="kpi-unit">${data.lifespanUnit}</span>`;
    if (dynHeat) dynHeat.innerHTML = `${data.heat} <span class="kpi-unit">${data.heatUnit}</span>`;
    if (dynStrength) dynStrength.innerHTML = `${data.strength} <span class="kpi-unit">${data.strengthUnit}</span>`;
    if (dynLight) dynLight.innerHTML = `${data.light} <span class="kpi-unit">${data.lightUnit}</span>`;

    // Update meter bars
    const dynLifespanBar = document.getElementById('dynLifespanBar');
    const dynHeatBar = document.getElementById('dynHeatBar');
    const dynStrengthBar = document.getElementById('dynStrengthBar');
    const dynLightBar = document.getElementById('dynLightBar');

    if (dynLifespanBar) dynLifespanBar.style.width = data.lifespanBar;
    if (dynHeatBar) dynHeatBar.style.width = data.heatBar;
    if (dynStrengthBar) dynStrengthBar.style.width = data.strengthBar;
    if (dynLightBar) dynLightBar.style.width = data.lightBar;

    // Update sub labels
    const dynLifespanSub = document.getElementById('dynLifespanSub');
    const dynHeatSub = document.getElementById('dynHeatSub');
    const dynStrengthSub = document.getElementById('dynStrengthSub');
    const dynLightSub = document.getElementById('dynLightSub');

    if (dynLifespanSub) dynLifespanSub.textContent = data.lifespanSub;
    if (dynHeatSub) dynHeatSub.textContent = data.heatSub;
    if (dynStrengthSub) dynStrengthSub.textContent = data.strengthSub;
    if (dynLightSub) dynLightSub.textContent = data.lightSub;

    // Update Spec Narrative
    const dynBadge = document.getElementById('dynBadge');
    const dynTitle = document.getElementById('dynTitle');
    const dynDesc = document.getElementById('dynDesc');
    const dynChemical = document.getElementById('dynChemical');
    const dynCleaning = document.getElementById('dynCleaning');
    const dynBenchmark = document.getElementById('dynBenchmark');

    if (dynBadge) dynBadge.textContent = data.badge;
    if (dynTitle) dynTitle.textContent = data.title;
    if (dynDesc) dynDesc.textContent = data.desc;
    if (dynChemical) dynChemical.textContent = data.chemical;
    if (dynCleaning) dynCleaning.textContent = data.cleaning;
    if (dynBenchmark) dynBenchmark.textContent = data.benchmark;

    // Update Spec Table
    const dynTableBody = document.getElementById('dynTableBody');
    if (dynTableBody && data.tableRows) {
      dynTableBody.innerHTML = data.tableRows.map(row => `
        <tr>
          <td>${row.criterion}</td>
          <td>${row.rating}</td>
        </tr>
      `).join('');
    }
  };

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mat = btn.getAttribute('data-material');
      updateMaterialConsole(mat);
    });
  });
}

/* ==========================================================================
   4. PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT CASE STUDY MODALS (FEATURING ORIGINAL SFXMEC EXECUTED PROJECTS)
   ========================================================================== */
const projectData = {
  1: {
    title: 'Arched Truss — School Courtyard & Hypar Canopy',
    category: 'Courtyards & Shades',
    location: 'Dubai & Sharjah, UAE',
    area: '5,800 m²',
    material: 'Heavy-Duty Architectural PVC/PVDF (Grade IV)',
    year: '2023',
    client: 'Ministry of Education & Private Academies',
    span: '38m Clear Tubular Arch Span',
    image: 'assets/images/courtyard.jpg',
    description: 'Specialized arched structural steel truss and hyperbolic paraboloid (Hypar) tensile membrane canopy engineered specifically for regional school courtyards. Returns 75-85% of intense solar heat externally while providing soft, natural, glare-free daylighting (9-18% transmission) for students and outdoor campus activities.'
  },
  2: {
    title: 'Car Shades & Conical Umbrellas',
    category: 'Canopies & Car Shades',
    location: 'Dubai & Abu Dhabi, UAE',
    area: '14,200 m²',
    material: 'High-Tensile PVC/PVDF & Stainless Fittings',
    year: '2024',
    client: 'Commercial Centers & Luxury Developments',
    span: 'Cantilever & Center-Post Conicals',
    image: 'assets/images/hero.jpg',
    description: 'Precision engineered cantilever parking canopies and architectural conical umbrellas designed for maximum clearance and thermal solar protection. Engineered to withstand desert gust loadings without ponding, featuring concealed rainwater downpipes and anti-wicking lacquered membrane fabrics.'
  },
  3: {
    title: 'PVC Roof — Golden Gate Mirdif',
    category: 'Commercial & Atriums',
    location: 'Mirdif, Dubai, UAE',
    area: '8,600 m²',
    material: 'Precontraint High-Performance PVC Membrane',
    year: '2022',
    client: 'Golden Gate Commercial Center',
    span: '48m Barrel Vault Continuous Truss',
    image: 'assets/images/atrium.jpg',
    description: 'Turnkey architectural roofing for Golden Gate Mirdif featuring custom barrel vault tensioned membrane modules. Designed to replace conventional heavy concrete roofing with lightweight, elegant curvature that illuminates retail thoroughfares with balanced diffused natural light.'
  },
  4: {
    title: 'Flying Mast — Luxury Private Villa',
    category: 'Canopies & Car Shades',
    location: 'Abu Dhabi, UAE',
    area: '3,400 m²',
    material: 'Architectural PTFE & 316 Stainless Cables',
    year: '2023',
    client: 'Private Client',
    span: 'Cable-Suspended Flying Center Mast',
    image: 'assets/images/hero.jpg',
    description: 'An architectural sculpture featuring a floating central steel mast tensioned solely by high-grade stainless steel boundary cables and PTFE membrane. The structure creates dramatic shaded outdoor garden living spaces without heavy foundation obstructions in the central pool terrace.'
  },
  5: {
    title: 'PTFE Roof — Ladies Club & Restaurant Abu Dhabi',
    category: 'Stadia & Leisure',
    location: 'Corniche, Abu Dhabi, UAE',
    area: '16,500 m²',
    material: 'PTFE Woven Fiberglass (DIN 4102 A2 Non-Combustible)',
    year: '2023',
    client: 'Abu Dhabi Ladies Club / Leisure Authority',
    span: '72m Radial Tension Net',
    image: 'assets/images/stadium.jpg',
    description: 'Permanent architectural tensile membrane roof spanning recreational grandstands, swimming pavilions, and waterfront restaurants. Offers complete resistance to extreme coastal saline humidity and UV radiation with an estimated 35-year design lifespan.'
  },
  6: {
    title: 'Tensile Membrane Roof & Glass Facade Integration',
    category: 'Facades & Envelopes',
    location: 'Business Bay, Dubai, UAE',
    area: '11,200 m²',
    material: 'PTFE Architectural Mesh & Insulated Structural Glass',
    year: '2024',
    client: 'Commercial Towers Authority',
    span: 'Custom Cable-Net Curtain Wall Truss',
    image: 'assets/images/facade.jpg',
    description: 'The perfect combination of tensile membrane roofing and exterior architectural glass facades. Provides dual performance: aerodynamic roof protection paired with high-efficiency solar shading mesh that cuts interior cooling energy costs by up to 45%.'
  },
  7: {
    title: 'Al Wasl Grand Sports Arena & Stadium Roof',
    category: 'Stadia & Leisure',
    location: 'Dubai, UAE',
    area: '42,500 m²',
    material: 'PTFE Architectural Fiberglass (Type IV)',
    year: '2023',
    client: 'Sports City Authority',
    span: '145m Unsupported Arch Span',
    image: 'assets/images/stadium.jpg',
    description: 'Monumental 145m clear-span PTFE tensile membrane grandstand roof protecting 45,000 spectators with 100% UV filtration and dynamic non-linear FEA wind load engineering compliant with ASCE 7-16 and regional hurricane codes.'
  },
  8: {
    title: 'Terminal 1 Arrivals Concourse & Transit Shading',
    category: 'Transport & Public Shades',
    location: 'Abu Dhabi International Airport, UAE',
    area: '24,000 m²',
    material: 'PTFE Coated Fiberglass High-Tensile',
    year: '2023',
    client: 'Airports Authority',
    span: '110m Undulating Wave Concourse',
    image: 'assets/images/transport.jpg',
    description: 'Undulating aerodynamic canopy spanning 6 lanes of passenger drop-off transit. Features self-cleaning photocatalytic TiO2 surface chemistry that dissolves dust particles under Middle Eastern sunlight, staying pristine white across decades.'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!modalOverlay) return;

  const openModal = (id) => {
    const data = projectData[id];
    if (!data) return;

    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalArea').textContent = data.area;
    document.getElementById('modalMaterial').textContent = data.material;
    document.getElementById('modalLocation').textContent = data.location;
    document.getElementById('modalSpan').textContent = data.span;
    document.getElementById('modalDesc').textContent = data.description;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. CONVERSATIONAL STEPPED SCOPE ESTIMATOR
   ========================================================================== */
function initConversationalEstimator() {
  const estimatorCard = document.querySelector('.estimator-stepped-card');
  if (!estimatorCard) return;

  const state = {
    currentStep: 1,
    typology: 'hospitality',
    typologyName: 'Hospitality & Outdoor Dining',
    area: 2500,
    environment: 'coastal',
    region: 'UAE',
    material: 'ptfe',
    materialPriority: 'permanent'
  };

  const panes = document.querySelectorAll('.est-pane');
  const stepPills = document.querySelectorAll('.step-pill');
  const progressBar = document.getElementById('estProgressBar');
  const nextBtns = document.querySelectorAll('.est-btn-next');
  const backBtns = document.querySelectorAll('.est-btn-back');
  const restartBtn = document.getElementById('btnRestartEstimator');
  const typeCards = document.querySelectorAll('.est-type-card');
  const presetChips = document.querySelectorAll('.est-preset-chip');
  const areaSlider = document.getElementById('convAreaSlider');
  const areaDisplay = document.getElementById('convAreaDisplay');
  const envCards = document.querySelectorAll('.est-env-card');
  const regionSelect = document.getElementById('convRegion');
  const priorityCards = document.querySelectorAll('.est-priority-card');
  const submitBriefBtn = document.getElementById('btnSubmitBriefToContact');

  const goToStep = (step) => {
    state.currentStep = step;

    // Update panes
    panes.forEach(pane => pane.classList.remove('active'));
    const targetPane = document.getElementById(`estPane${step}`);
    if (targetPane) targetPane.classList.add('active');

    // Update stepper pills
    stepPills.forEach(pill => {
      const pillStep = parseInt(pill.getAttribute('data-step-target'), 10);
      pill.classList.remove('active', 'completed');
      if (pillStep === step) {
        pill.classList.add('active');
      } else if (pillStep < step) {
        pill.classList.add('completed');
      }
    });

    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${(step / 4) * 100}%`;
    }

    // If step 4, calculate output
    if (step === 4) {
      calculateBrief();
    }

    // Scroll to top of estimator smoothly if needed
    estimatorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Step 1: Typology selection
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      state.typology = card.getAttribute('data-type');
      state.typologyName = card.getAttribute('data-type-name') || 'Architectural Structure';
      const defaultArea = parseInt(card.getAttribute('data-default-area'), 10);
      const defaultMat = card.getAttribute('data-default-mat');

      if (!isNaN(defaultArea)) {
        state.area = defaultArea;
        if (areaSlider) areaSlider.value = defaultArea;
        if (areaDisplay) areaDisplay.textContent = `${defaultArea.toLocaleString()} m²`;

        // Match preset chip if possible
        presetChips.forEach(chip => {
          const chipArea = parseInt(chip.getAttribute('data-area'), 10);
          chip.classList.toggle('active', chipArea === defaultArea);
        });
      }

      if (defaultMat) {
        state.material = defaultMat;
        priorityCards.forEach(pCard => {
          pCard.classList.toggle('active', pCard.getAttribute('data-mat') === defaultMat);
        });
      }
    });
  });

  // Step 2: Scale & Context
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const area = parseInt(chip.getAttribute('data-area'), 10);
      state.area = area;
      if (areaSlider) areaSlider.value = area;
      if (areaDisplay) areaDisplay.textContent = `${area.toLocaleString()} m²`;
    });
  });

  if (areaSlider) {
    areaSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      state.area = val;
      if (areaDisplay) areaDisplay.textContent = `${val.toLocaleString()} m²`;

      presetChips.forEach(chip => {
        const chipArea = parseInt(chip.getAttribute('data-area'), 10);
        chip.classList.toggle('active', chipArea === val);
      });
    });
  }

  envCards.forEach(card => {
    card.addEventListener('click', () => {
      envCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const input = card.querySelector('input[type="radio"]');
      if (input) {
        input.checked = true;
        state.environment = input.value;
      }
    });
  });

  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      state.region = e.target.value;
    });
  }

  // Step 3: Priority selection
  priorityCards.forEach(card => {
    card.addEventListener('click', () => {
      priorityCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.material = card.getAttribute('data-mat') || 'ptfe';
      state.materialPriority = card.getAttribute('data-priority') || 'permanent';
    });
  });

  // Step Navigation Next / Back
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.getAttribute('data-next'), 10);
      if (!isNaN(nextStep)) {
        goToStep(nextStep);
      }
    });
  });

  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const backStep = parseInt(btn.getAttribute('data-back'), 10);
      if (!isNaN(backStep)) {
        goToStep(backStep);
      }
    });
  });

  stepPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetStep = parseInt(pill.getAttribute('data-step-target'), 10);
      if (!isNaN(targetStep)) {
        goToStep(targetStep);
      }
    });
  });

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      goToStep(1);
    });
  }

  // Step 4: Calculate Engineering Output
  const calculateBrief = () => {
    const area = state.area;
    const mat = state.material;
    const env = state.environment;

    // Multipliers
    let weightPerM2 = 1.45; // kg/m²
    let steelDensity = 26; // kg steel per m²
    let matTitle = 'PTFE Fiberglass';
    let lifespanText = '35+ Year Design Life';
    let heatText = '85% Deflection';
    let timelineWeeks = Math.max(8, Math.round(Math.sqrt(area) * 0.35));

    if (mat === 'etfe') {
      weightPerM2 = 0.55;
      steelDensity = 18;
      matTitle = 'ETFE Foil Cushions';
      lifespanText = '25 - 30 Year Life';
      heatText = '75% Deflection';
      timelineWeeks = Math.max(10, Math.round(Math.sqrt(area) * 0.38));
    } else if (mat === 'pvc') {
      weightPerM2 = 1.15;
      steelDensity = 22;
      matTitle = 'PVC / PVDF Composite';
      lifespanText = '15 - 20+ Year Life';
      heatText = '78% Deflection';
      timelineWeeks = Math.max(6, Math.round(Math.sqrt(area) * 0.30));
    }

    const fabricTons = ((area * weightPerM2) / 1000).toFixed(1);
    const steelTons = Math.round((area * steelDensity) / 1000);
    const codeNum = Math.floor(1000 + Math.random() * 9000);

    // Populate brief outputs
    const briefCode = document.getElementById('briefCode');
    const briefTitle = document.getElementById('briefTitle');
    const outArea = document.getElementById('outArea');
    const outTypology = document.getElementById('outTypology');
    const outMat = document.getElementById('outMat');
    const outLifespan = document.getElementById('outLifespan');
    const outFabWeight = document.getElementById('outFabWeight');
    const outSteelWeight = document.getElementById('outSteelWeight');
    const outHeatDeflect = document.getElementById('outHeatDeflect');
    const outTimeline = document.getElementById('outTimeline');
    const outRiggingDesc = document.getElementById('outRiggingDesc');
    const outCodesDesc = document.getElementById('outCodesDesc');

    if (briefCode) briefCode.textContent = `2026-${codeNum}`;
    if (briefTitle) briefTitle.textContent = `${state.typologyName} Scope Brief`;
    if (outArea) outArea.innerHTML = `${area.toLocaleString()} <span class="unit">m²</span>`;
    if (outTypology) outTypology.textContent = state.typologyName;
    if (outMat) outMat.innerHTML = `${matTitle}`;
    if (outLifespan) outLifespan.textContent = lifespanText;
    if (outFabWeight) outFabWeight.innerHTML = `${fabricTons} <span class="unit">Tons</span>`;
    if (outSteelWeight) outSteelWeight.innerHTML = `~${steelTons} <span class="unit">Tons</span>`;
    if (outHeatDeflect) outHeatDeflect.innerHTML = `${heatText} <span class="unit">Thermal Drop</span>`;
    if (outTimeline) outTimeline.innerHTML = `${timelineWeeks} - ${timelineWeeks + 4} <span class="unit">Weeks</span>`;

    // Environment-specific rigging description
    if (outRiggingDesc) {
      if (env === 'coastal') {
        outRiggingDesc.textContent = 'Specified with electro-polished AISI 316 and 2205 Duplex marine stainless rigging, Teflon isolation gaskets, and ASTM B117 salt-fog rated cables for marine environments.';
      } else if (env === 'desert') {
        outRiggingDesc.textContent = 'High-grade galvanized S355 structural steel with 3-coat C5M epoxy paint system, UV-resistant PVDF lacquer, and anti-abrasion sand seals.';
      } else {
        outRiggingDesc.textContent = 'Architectural grade swaged stainless rigging, concealed rainwater drainage channels, and acoustic textile integration for urban spaces.';
      }
    }

    if (outCodesDesc) {
      const reg = state.region;
      if (reg === 'UAE') {
        outCodesDesc.textContent = 'Compliant with UAE Civil Defense Fire Code, ASCE 7-16 wind design loads (up to 160 km/h), and Dubai Municipality / Abu Dhabi DMT regulations.';
      } else if (reg === 'KSA') {
        outCodesDesc.textContent = 'Compliant with Saudi Building Code (SBC 301 / 801), MOMRA regulations, and Red Sea / NEOM environmental sustainability guidelines.';
      } else {
        outCodesDesc.textContent = 'Engineered under ASCE 7-16, DIN 4102 / ASTM E108 non-combustibility standards, and localized municipal building codes.';
      }
    }
  };

  // Submit Brief to Contact Form
  if (submitBriefBtn) {
    submitBriefBtn.addEventListener('click', () => {
      const area = state.area;
      const type = state.typologyName;
      const mat = state.material.toUpperCase();
      const env = state.environment.toUpperCase();
      const regText = regionSelect ? regionSelect.options[regionSelect.selectedIndex].text : state.region;

      const messageBox = document.getElementById('contactMessage');
      const subjectSelect = document.getElementById('contactSubject');
      if (subjectSelect) subjectSelect.value = 'RFP Proposal Request';

      if (messageBox) {
        messageBox.value = `Hello Structurflex Middle East Engineering Team,\n\nI have generated an Engineering Specification Brief via the Intelligent Scope Estimator:\n- Typology: ${type}\n- Planned Footprint: ${area.toLocaleString()} m²\n- Specified Material: ${mat}\n- Environmental Context: ${env}\n- Regional Code: ${regText}\n\nPlease contact me to review the preliminary engineering calculations, structural steel sizing, and formal consultation schedule.`;
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        if (messageBox) messageBox.focus();
      }
    });
  }
}

/* ==========================================================================
   7. CONTACT FORM HANDLER & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('inquiryForm');
  const alertBox = document.getElementById('formSuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Transmitting Specification...`;

    // Simulated network transmission
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
          alertBox.style.display = 'none';
        }, 7000);
      }
    }, 1000);
  });
}
