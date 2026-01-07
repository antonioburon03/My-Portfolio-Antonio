document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMenu();
  initProjectsModal();
});

/* Año dinámico en el footer */
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* Menú hamburguesa / navegación principal */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar menú al hacer click en un enlace (en mobile)
  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Modal de proyectos (al hacer clic en cualquier .project-card) */
function initProjectsModal() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.querySelector('.project-modal');

  if (!cards.length || !modal) return;

  const backdrop = modal.querySelector('.project-modal-backdrop');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const modalImg = modal.querySelector('img');
  const modalTitle = modal.querySelector('.project-modal-title');
  const modalDesc = modal.querySelector('.project-modal-description');

  function openModal({ src, alt, title, description }) {
    if (modalImg) {
      modalImg.src = src || '';
      modalImg.alt = alt || '';
    }
    if (modalTitle) {
      modalTitle.textContent = title || '';
    }
    if (modalDesc) {
      modalDesc.textContent = description || '';
    }

    modal.classList.add('is-open');
    document.body.classList.add('is-locked');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Abrir modal al hacer clic en una tarjeta
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.dataset.title || '';
      const description = card.dataset.description || '';

      openModal({
        src: img ? img.src : '',
        alt: img ? img.alt : '',
        title,
        description,
      });
    });
  });

  // Cerrar haciendo clic en el fondo o en el botón de cierre
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
