/**
 * SFXMEC (Structurflex Middle East) - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStatCounters();
  initMaterialTabs();
  initPortfolioFilters();
  initProjectModals();
  initScopeEstimator();
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
    if (window.scrollY > 40) {
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
   2. ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.innerHTML = `${target.toLocaleString()}<span class="stat-suffix">${suffix}</span>`;
          clearInterval(timer);
        } else {
          stat.innerHTML = `${count.toLocaleString()}<span class="stat-suffix">${suffix}</span>`;
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
  }, { threshold: 0.3 });

  const statsRibbon = document.querySelector('.hero-stats');
  if (statsRibbon) {
    observer.observe(statsRibbon);
  }
}

/* ==========================================================================
   3. INTERACTIVE MATERIAL MATRIX TABS
   ========================================================================== */
function initMaterialTabs() {
  const tabBtns = document.querySelectorAll('.mat-tab-btn');
  const panels = document.querySelectorAll('.material-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMat = btn.getAttribute('data-material');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetMat}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
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
   5. PROJECT CASE STUDY MODALS
   ========================================================================== */
const projectData = {
  1: {
    title: 'Al Wasl Grand Sports Arena Canopy',
    category: 'Stadiums & Sports',
    location: 'Dubai, UAE',
    area: '42,500 m²',
    material: 'PTFE Architectural Fiberglass (Type IV)',
    year: '2023',
    client: 'Dubai Sports City Authority',
    span: '145m Unsupported Arch Span',
    image: 'assets/images/stadium.jpg',
    description: 'A monumental lightweight roofing system designed to provide 100% spectator shading while maintaining natural turf daylight exposure. The structure features high-tensile PTFE coated woven fiberglass capable of withstanding extreme desert thermal expansion (+52°C) and cyclonic wind shear up to 160 km/h.'
  },
  2: {
    title: 'The Palm Central Pavilion & Canopy Plaza',
    category: 'Commercial & Atriums',
    location: 'Palm Jumeirah, Dubai',
    area: '18,200 m²',
    material: 'Tensile PTFE & Stainless Rigging',
    year: '2024',
    client: 'Nakheel Properties',
    span: '85m Central Flying Mast',
    image: 'assets/images/hero.jpg',
    description: 'An iconic sculptural landmark integrating sweeping hyperbolic paraboloid tensile membranes with bespoke structural steel tripod masts. Features integrated LED edge-lit illumination creating an awe-inspiring twilight visual identity with 82% solar heat rejection.'
  },
  3: {
    title: 'Oasis Garden Luxury Atrium Skylight',
    category: 'Commercial & Atriums',
    location: 'New Cairo, Egypt',
    area: '12,600 m²',
    material: '3-Layer ETFE Pneumatic Cushion System',
    year: '2023',
    client: 'Emaar Misr',
    span: '65m Steel Diagrid Frame',
    image: 'assets/images/atrium.jpg',
    description: 'Ultra-transparent pneumatic ETFE foil cushions engineered with custom silver frit matrix printing to regulate solar heat gain coefficient (SHGC) at 0.28 while bathing the indoor botanical forest in 90% natural full-spectrum sunlight.'
  },
  4: {
    title: 'Doha Corporate Headquarters Parametric Facade',
    category: 'Facades & Sunscreens',
    location: 'West Bay, Doha',
    area: '8,400 m²',
    material: 'PTFE Architectural Mesh & Cable-Net',
    year: '2022',
    client: 'Qatari Diar',
    span: 'Multi-Story Tension Truss',
    image: 'assets/images/facade.jpg',
    description: 'A striking parametric tensile second-skin facade that wraps the building envelope. Provides 45% reduction in HVAC energy loads by blocking intense Middle Eastern solar glare without obstructing panoramic sea views.'
  },
  5: {
    title: 'Terminal 1 Arrivals Canopy Concourse',
    category: 'Airport & Transport',
    location: 'Abu Dhabi, UAE',
    area: '24,000 m²',
    material: 'PTFE Coated Fiberglass High-Tensile',
    year: '2023',
    client: 'Abu Dhabi Airports Company',
    span: '110m Undulating Wave Concourse',
    image: 'assets/images/transport.jpg',
    description: 'High-traffic drop-off concourse canopy designed for seamless airport arrival transit. Provides continuous shade across 6 traffic lanes with self-cleaning titanium dioxide top-coat maintaining pristine white finish despite dust storms.'
  },
  6: {
    title: 'Metropolitan Campus Shaded Courtyards',
    category: 'Urban & Courtyards',
    location: 'Riyadh, Saudi Arabia',
    area: '9,500 m²',
    material: 'Heavy-Duty PVC/PVDF Membrane',
    year: '2024',
    client: 'Ministry of Education, KSA',
    span: 'Modular Inverted Conical Sails',
    image: 'assets/images/courtyard.jpg',
    description: 'Interlocking inverted conical membrane umbrellas with internal rainwater drainage piping. Creates a cool microclimate for over 4,000 university students with high acoustic absorption reducing courtyard echoes.'
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
   6. INTERACTIVE SCOPE & RFP ESTIMATOR
   ========================================================================== */
function initScopeEstimator() {
  const areaSlider = document.getElementById('estAreaSlider');
  const areaDisplay = document.getElementById('estAreaDisplay');
  const appOptions = document.querySelectorAll('input[name="estApp"]');
  const matOptions = document.querySelectorAll('input[name="estMat"]');
  const regionSelect = document.getElementById('estRegion');
  const btnApplyRFP = document.getElementById('btnApplyRFP');

  if (!areaSlider) return;

  const updateCalculations = () => {
    const area = parseInt(areaSlider.value, 10);
    areaDisplay.textContent = `${area.toLocaleString()} m²`;

    let selectedApp = document.querySelector('input[name="estApp"]:checked')?.value || 'stadium';
    let selectedMat = document.querySelector('input[name="estMat"]:checked')?.value || 'ptfe';
    let selectedRegion = regionSelect?.value || 'UAE';

    // Calculation multipliers
    let weightPerM2 = 1.35; // kg/m²
    let lightTrans = '12%';
    let lifespan = '30+ Years';
    let solarRejection = '78%';
    let steelDensity = 24; // kg steel per m² membrane

    if (selectedMat === 'ptfe') {
      weightPerM2 = 1.45;
      lightTrans = '14%';
      lifespan = '30 - 35 Years';
      solarRejection = '82%';
      steelDensity = 26;
    } else if (selectedMat === 'etfe') {
      weightPerM2 = 0.45;
      lightTrans = '88 - 92%';
      lifespan = '25 - 30 Years';
      solarRejection = '68% (Frit Printed)';
      steelDensity = 18;
    } else if (selectedMat === 'pvc') {
      weightPerM2 = 1.15;
      lightTrans = '8%';
      lifespan = '15 - 20 Years';
      solarRejection = '74%';
      steelDensity = 21;
    }

    const totalMembraneWeight = ((area * weightPerM2) / 1000).toFixed(1);
    const estimatedSteelTonnage = Math.round((area * steelDensity) / 1000);
    
    // Approximate turnaround weeks
    let weeks = Math.max(8, Math.round(Math.sqrt(area) * 0.45));

    document.getElementById('calcArea').textContent = `${area.toLocaleString()} m²`;
    document.getElementById('calcMatName').textContent = selectedMat.toUpperCase();
    document.getElementById('calcWeight').textContent = `${totalMembraneWeight} Metric Tons`;
    document.getElementById('calcSteel').textContent = `~${estimatedSteelTonnage} Metric Tons`;
    document.getElementById('calcLight').textContent = lightTrans;
    document.getElementById('calcSolar').textContent = solarRejection;
    document.getElementById('calcLifespan').textContent = lifespan;
    document.getElementById('calcTimeline').textContent = `${weeks} - ${weeks + 4} Weeks`;

    // Highlight active radio visual wrappers
    document.querySelectorAll('.est-option').forEach(opt => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  };

  areaSlider.addEventListener('input', updateCalculations);
  appOptions.forEach(opt => opt.addEventListener('change', updateCalculations));
  matOptions.forEach(opt => opt.addEventListener('change', updateCalculations));
  if (regionSelect) regionSelect.addEventListener('change', updateCalculations);

  updateCalculations();

  // One-click RFP builder transfer to contact form
  if (btnApplyRFP) {
    btnApplyRFP.addEventListener('click', () => {
      const area = areaSlider.value;
      const app = document.querySelector('input[name="estApp"]:checked')?.parentElement.querySelector('.est-option-label')?.textContent || 'Structure';
      const mat = document.querySelector('input[name="estMat"]:checked')?.parentElement.querySelector('.est-option-label')?.textContent || 'Membrane';
      const reg = regionSelect.options[regionSelect.selectedIndex].text;

      const messageBox = document.getElementById('contactMessage');
      const subjectSelect = document.getElementById('contactSubject');
      if (subjectSelect) subjectSelect.value = 'RFP Proposal Request';

      if (messageBox) {
        messageBox.value = `Hello SFXMEC Engineering Team,\n\nI would like to request an official Engineering Scope & Proposal based on the website calculator configuration:\n- Application: ${app}\n- Estimated Area: ${parseInt(area, 10).toLocaleString()} m²\n- Membrane Material: ${mat}\n- Target Region: ${reg}\n\nPlease reach out with technical pre-qualification and consultation details.`;
      }

      // Smooth scroll to contact section
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
    }, 1200);
  });
}
