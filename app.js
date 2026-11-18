const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach(element => observer.observe(element));
}

const landscape = document.querySelector('.hero-landscape');
const hero = document.querySelector('.hero');
const progress = document.querySelector('.reading-progress');
let framePending = false;
function renderScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${scrollable > 0 ? window.scrollY / scrollable : 0})`;
  if (!reducedMotion.matches && window.scrollY < hero.offsetHeight) {
    landscape.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.03)`;
  }
  framePending = false;
}
function scheduleScroll() {
  if (!framePending) { requestAnimationFrame(renderScroll); framePending = true; }
}
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll);
reducedMotion.addEventListener('change', scheduleScroll);
renderScroll();

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}
menuButton.addEventListener('click', () => {
  const opening = mobileMenu.hidden;
  mobileMenu.hidden = !opening;
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const scenes = {
  neon: { image: 'assets/neon.jpg', title: 'Stay for the sunset.', description: 'A neon horizon. A familiar world.\nA whole different mood.', alt: 'A pink striped sun sets over a Minecraft valley beneath a purple neon sky', index: '01' },
  aurora: { image: 'assets/aurora.jpg', title: 'Let the night move you.', description: 'Ribbons of light, across the sky.\nTake the long way home.', alt: 'Turquoise and violet aurora ribbons flowing through the starry Minecraft sky', index: '02' },
  nebula: { image: 'assets/nebula.jpg', title: 'A little further from ordinary.', description: 'Violet clouds. A thousand stars.\nA world of your own.', alt: 'Vivid violet, pink, and gold nebula clouds above a grassy Minecraft world', index: '03' }
};
const tabs = [...document.querySelectorAll('[data-scene]')];
const scenePanel = document.querySelector('#scene-panel');
const sceneImage = document.querySelector('#scene-image');
const sceneDescription = document.querySelector('#scene-description');
sceneDescription.style.whiteSpace = 'pre-line';
let selectedScene = 'neon';
let sceneTimer;
Object.values(scenes).forEach(scene => { const preload = new Image(); preload.src = scene.image; });
function selectScene(name) {
  selectedScene = name;
  const scene = scenes[name];
  tabs.forEach(tab => {
    const active = tab.dataset.scene === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  scenePanel.setAttribute('aria-labelledby', `tab-${name}`);
  clearTimeout(sceneTimer);
  scenePanel.classList.add('changing');
  sceneTimer = setTimeout(() => {
    sceneImage.src = scene.image;
    sceneImage.alt = scene.alt;
    document.querySelector('#scene-title').textContent = scene.title;
    document.querySelector('#scene-count').textContent = `${scene.index} — 03`;
    sceneDescription.textContent = scene.description;
    scenePanel.classList.remove('changing');
  }, reducedMotion.matches ? 0 : 180);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScene(tab.dataset.scene));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); tabs[next].focus(); selectScene(tabs[next].dataset.scene); }
  });
});

const stage = document.querySelector('.customize-stage');
const colors = document.querySelectorAll('[data-color]');
colors.forEach(button => button.addEventListener('click', () => {
  stage.dataset.accent = button.dataset.color;
  colors.forEach(color => {
    const active = color === button;
    color.classList.toggle('active', active);
    color.setAttribute('aria-pressed', String(active));
  });
}));
const switches = [...document.querySelectorAll('[role="switch"]')];
switches.forEach(button => button.addEventListener('click', () => {
  button.setAttribute('aria-checked', String(button.getAttribute('aria-checked') !== 'true'));
  const active = switches.filter(item => item.getAttribute('aria-checked') === 'true').length;
  document.querySelector('#module-status').textContent = `${active} ${active === 1 ? 'essential' : 'essentials'} enabled`;
  document.querySelector('#music-chip').hidden = document.querySelector('[data-module="music"]').getAttribute('aria-checked') !== 'true';
}));

const lightbox = document.querySelector('.lightbox');
document.querySelector('.expand-button').addEventListener('click', () => {
  const scene = scenes[selectedScene];
  lightbox.querySelector('img').src = scene.image;
  lightbox.querySelector('img').alt = scene.alt;
  lightbox.showModal();
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
