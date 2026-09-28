
const routesConfig = {
  'home': {
    title: 'SAFAR — Discover Pakistan | Valleys, Peaks & Heritage',
    desc: 'Explore Pakistan with Safar. Curated mountain expeditions across Hunza, Skardu, and cultural Sindh Sufi circuits.'
  },
  'destinations': {
    title: 'Iconic Destinations in Pakistan — Safar',
    desc: 'Browse our curated regions: Sindh Heritage, Gorakh Hill, Hunza, Skardu, and Hingol National Park.'
  },
  'expeditions': {
    title: 'Guided Pakistan Tour Packages & Expeditions — Safar',
    desc: 'All-inclusive guided expeditions to Fairy Meadows, Gorakh Hill, Thatta, Serena Shigar Fort, and Mohenjo-daro.'
  },
  'how-it-works': {
    title: 'How It Works — Effortless Travel with Safar',
    desc: 'Learn about our 3-step itinerary planning, licensed 4x4 convoy handling, and 24/7 support in Karachi & Islamabad.'
  },
  'reviews': {
    title: 'Traveler Reviews & Testimonials — Safar',
    desc: 'Read real stories and verified experiences from local and international travelers across Pakistan.'
  },
  'faq': {
    title: 'Frequently Asked Questions & Advisory — Safar',
    desc: 'Clear answers on Gorakh Hill weather, Skardu flights, vehicle fleets, and overseas travel permits.'
  },
  'plan': {
    title: 'Plan Your Journey — Custom Expeditions with Safar',
    desc: 'Request a custom luxury or adventure itinerary. Direct assistance from coordinators in Karachi and Islamabad.'
  }
};

function handleRoute() {
  const routeLoader = document.getElementById('route-loader');
  if (routeLoader) routeLoader.classList.add('show');

  setTimeout(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    const targetPageId = `page-${hash}`;
    const pages = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('nav ul a');

    let pageFound = false;
    pages.forEach(page => {
      if (page.id === targetPageId) {
        page.classList.add('active-page');
        pageFound = true;
      } else {
        page.classList.remove('active-page');
      }
    });

    if (!pageFound) {
      const homePage = document.getElementById('page-home');
      if (homePage) homePage.classList.add('active-page');
    }

    navLinks.forEach(link => {
      if (link.getAttribute('data-route') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const meta = routesConfig[hash] || routesConfig['home'];
    document.title = meta.title;
    if (document.getElementById('meta-title')) document.getElementById('meta-title').innerText = meta.title;
    if (document.getElementById('meta-desc')) document.getElementById('meta-desc').setAttribute('content', meta.desc);
    if (document.getElementById('og-title')) document.getElementById('og-title').setAttribute('content', meta.title);
    if (document.getElementById('og-desc')) document.getElementById('og-desc').setAttribute('content', meta.desc);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerScrollAnimations();

    setTimeout(() => {
      if (routeLoader) routeLoader.classList.remove('show');
    }, 150);
  }, 200);
}
function triggerScrollAnimations() {
  const cards = document.querySelectorAll('.page-view.active-page .reveal-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

function filterDestinations(region, btnElement) {
  if (btnElement) {
    document.querySelectorAll('#page-destinations .filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
  const cards = document.querySelectorAll('#destGrid .flip-card-wrapper');
  cards.forEach(card => {
    if (region === 'all' || card.getAttribute('data-region') === region) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  triggerScrollAnimations();
}

function filterTours(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('#page-expeditions .filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
  const cards = document.querySelectorAll('#toursGrid .flip-card-wrapper');
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  triggerScrollAnimations();
}
function prefillDestination(tourTitle) {
  const selectElem = document.getElementById('formDestination');
  if (selectElem) {
    for (let i = 0; i < selectElem.options.length; i++) {
      if (selectElem.options[i].value === tourTitle) {
        selectElem.selectedIndex = i;
        break;
      }
    }
  }

  window.location.hash = '#plan';
  setTimeout(() => {
    const bookingCard = document.getElementById('bookingCard');
    if (bookingCard) {
      bookingCard.classList.remove('pulse-highlight');
      void bookingCard.offsetWidth; // re-trigger animation
      bookingCard.classList.add('pulse-highlight');
      const nameInput = document.getElementById('formName');
      if (nameInput) nameInput.focus();
    }
  }, 400);
}

function setupExpeditionCardClickEvents() {
  const expeditionCards = document.querySelectorAll('.tc-interactive');
  expeditionCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const tourTitle = card.getAttribute('data-target-tour');
      if (tourTitle) {
        prefillDestination(tourTitle);
      }
    });
  });
}

function runSearch() {
  const region = document.getElementById('homeRegionSelect').value;
  location.hash = '#expeditions';
  setTimeout(() => {
    if (region === 'sindh') {
      filterTours('sindh');
    } else if (region === 'north') {
      filterTours('north');
    } else {
      filterTours('all');
    }
  }, 300);
}

function handleInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const destination = document.getElementById('formDestination').value;
  alert(`Thank you, ${name}! Your inquiry for "${destination}" has been received. Our coordinator will contact you via WhatsApp within 24 hours.`);
}

const dialStepData = [
  {
    num: "01",
    title: "Route Conceptualization",
    desc: "Select your signature itinerary across Gilgit-Baltistan, Sindh, or Balochistan—or communicate tailored requests directly with our destination planners in Islamabad & Karachi."
  },
  {
    num: "02",
    title: "All-Terrain Fleet Allocation",
    desc: "We assign dedicated 4x4 Toyota Land Cruisers, high-clearance Prados, or VIP mountain convoys piloted by certified high-altitude drivers."
  },
  {
    num: "03",
    title: "Heritage Fortress Stays",
    desc: "Lock in reserved royal suites in 400-year-old fortresses (Serena Shigar & Khaplu Palace) or pre-heated cliffside glamping pods at Gorakh Hill."
  },
  {
    num: "04",
    title: "Permits & Safety Security",
    desc: "We coordinate sensitive regional clearances, domestic flight standby backups via the Karakoram Highway, and satellite SOS protocols."
  },
  {
    num: "05",
    title: "Native Escort & 24/7 Concierge",
    desc: "Embark on your journey accompanied by indigenous mountain guides and historians, supported round-the-clock by our operations team."
  }
];

let currentDialStep = 0;
const totalDialSteps = 5;
const anglePerStep = 72;
const dialRadius = 220;

function initializeDialPositions() {
  const nodes = document.querySelectorAll('#dialRotatorDisc .dial-node');
  nodes.forEach((node, i) => {
    const angleDeg = i * anglePerStep - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.round(dialRadius * Math.cos(angleRad));
    const y = Math.round(dialRadius * Math.sin(angleRad));

    node.style.transform = `translate(${x}px, ${y}px)`;
  });
  applyDialStep(0);
}

function setDialStep(index) {
  currentDialStep = (index + totalDialSteps) % totalDialSteps;
  applyDialStep(currentDialStep);
}

function rotateDialStep(direction) {
  setDialStep(currentDialStep + direction);
}

function applyDialStep(stepIndex) {
  const rotator = document.getElementById('dialRotatorDisc');
  const nodes = document.querySelectorAll('#dialRotatorDisc .dial-node');
  const card = document.getElementById('dialStepCard');
  if (!rotator || !card) return;

  const rotationDeg = -stepIndex * anglePerStep;
  rotator.style.transform = `rotate(${rotationDeg}deg)`;

  nodes.forEach((node, i) => {
    const capsule = node.querySelector('.dial-node-capsule');
    if (capsule) {
      capsule.style.transform = `translate(-50%, -50%) rotate(${-rotationDeg}deg)`;
    }
    if (i === stepIndex) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });

  card.style.opacity = '0.35';
  card.style.transform = 'translateY(10px)';

  setTimeout(() => {
    const data = dialStepData[stepIndex];
    document.getElementById('stepBadgeNum').innerText = data.num;
    document.getElementById('stepCardTitle').innerText = data.title;
    document.getElementById('stepCardDesc').innerText = data.desc;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 160);
}


let currentCenterIndex = 2;
const totalCards = 6;

function updateDeckPositions() {
  const cards = document.querySelectorAll('#cardDeckTrack .passport-card');
  cards.forEach((card) => {
    const idx = parseInt(card.getAttribute('data-index'), 10);
    let diff = idx - currentCenterIndex;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    card.className = 'passport-card';

    if (diff === 0) {
      card.classList.add('pos-center');
    } else if (diff === -1) {
      card.classList.add('pos-left-1');
    } else if (diff === 1) {
      card.classList.add('pos-right-1');
    } else if (diff === -2) {
      card.classList.add('pos-left-2');
    } else if (diff === 2) {
      card.classList.add('pos-right-2');
    } else {
      card.classList.add('pos-hidden');
    }
  });
}

function rotateDeck(step) {
  currentCenterIndex = (currentCenterIndex + step + totalCards) % totalCards;
  updateDeckPositions();
}


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#cardDeckTrack .passport-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (idx !== currentCenterIndex) {
        currentCenterIndex = idx;
        updateDeckPositions();
      }
    });
  });

  updateDeckPositions();
  initializeDialPositions();
  setupExpeditionCardClickEvents();
});

window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    if (preloader) preloader.classList.add('loaded');
    handleRoute();
    updateDeckPositions();
  }, 1000);
});
