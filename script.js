const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const chips = document.querySelectorAll('.chip');
const factionCards = document.querySelectorAll('.faction-card');
const accordionItems = document.querySelectorAll('.accordion-item');
const revealItems = document.querySelectorAll('.reveal');

menuToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;

    chips.forEach(item => item.classList.remove('active'));
    chip.classList.add('active');

    factionCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const shouldShow = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

accordionItems.forEach(item => {
  item.addEventListener('click', () => {
    accordionItems.forEach(button => button.classList.remove('active'));
    item.classList.add('active');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));
