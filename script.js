const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.primary-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Zavřít menu' : 'Menu';
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menu';
    });
  });
}

const filters = document.querySelectorAll('[data-filter]');
const galleryItems = document.querySelectorAll('[data-category]');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const selected = filter.dataset.filter;
    filters.forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
    galleryItems.forEach((item) => {
      item.hidden = selected !== 'all' && item.dataset.category !== selected;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.hidden = true;
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!lightbox || !image || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightbox.hidden = false;
    lightbox.querySelector('.lightbox-close')?.focus();
  });
});

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.closest('.lightbox-close')) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

const atlasTabs = document.querySelectorAll('[data-atlas-target]');
const atlasPanels = document.querySelectorAll('[data-atlas-panel]');

atlasTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.atlasTarget;
    atlasTabs.forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab));
    });
    atlasPanels.forEach((panel) => {
      panel.hidden = panel.dataset.atlasPanel !== selected;
    });
  });
});
