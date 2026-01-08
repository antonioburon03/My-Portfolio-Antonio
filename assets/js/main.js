document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMenu();
  // initSmoothScroll();   // Ya no lo usamos para el router de secciones
  // initActiveNav();      // Reemplazado por initSectionRouter
  initSectionRouter();     // NUEVO: muestra solo la sección correspondiente al hash
  initProjectsModal();
});

/* ========= Año dinámico en el footer ========= */
function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ========= Menú hamburguesa / navegación ========= */
function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cerrar menú al hacer clic en un enlace (en mobile)
  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ========= Scroll suave a secciones ========= */
/* (Ya no se usa para cambiar de "pantalla", pero lo dejo por si lo necesitas dentro de una misma sección) */
function initSmoothScroll() {
  const header = document.querySelector('.site-header');
  const navHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    link.addEventListener('click', (event) => {
      // Si es un enlace interno, evitamos el salto brusco
      if (href.startsWith('#')) {
        event.preventDefault();

        const targetRect = target.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;

        const targetY = targetRect.top + scrollY - navHeight;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });

        // Actualizamos la URL (opcional)
        history.pushState(null, '', href);
      }
    });
  });
}

/* ========= Estado activo en el menú según la sección visible (NO usado ahora) ========= */
function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (!id) return;

          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;

            if (href === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // zona en el centro de la pantalla
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ========= NUEVO: Router de secciones por hash (#about, #branding, etc.) ========= */
function initSectionRouter() {
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (!sections.length) return;

  function showSection(id) {
    let found = false;

    // Mostrar solo la sección con ese id
    sections.forEach((section) => {
      if (section.id === id) {
        section.classList.add('is-active');
        found = true;
      } else {
        section.classList.remove('is-active');
      }
    });

    // Actualizar estado activo del menú
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      let linkHash = null;

      if (href.startsWith('#')) {
        linkHash = href.slice(1);
      } else if (href.includes('#')) {
        linkHash = href.split('#')[1];
      }

      if (linkHash === id) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });

    // Si la sección no existe, volvemos a about
    if (!found) {
      sections.forEach((section) => {
        section.classList.toggle('is-active', section.id === 'about');
      });
    }

    // Subir arriba al cambiar de "pantalla"
    window.scrollTo(0, 0);
  }

  function handleHashChange() {
    const hash = window.location.hash || '#about';
    const id = hash.replace('#', '') || 'about';
    showSection(id);
  }

  // Inicial: al cargar la página
  handleHashChange();

  // Cuando cambia el hash en la URL (#branding, #editorial...)
  window.addEventListener('hashchange', handleHashChange);
}

/* ========= Modal de proyectos: scroll vertical con todas las imágenes ========= */
function initProjectsModal() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.querySelector('.project-modal');

  if (!cards.length || !modal) return;

  const backdrop = modal.querySelector('.project-modal-backdrop');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const imagesContainer = modal.querySelector('.project-modal-images');
  const modalTitle = modal.querySelector('.project-modal-title');
  const modalDesc = modal.querySelector('.project-modal-description');

  function openModalFromCard(card) {
    if (!imagesContainer) return;

    // Vaciar imágenes anteriores
    imagesContainer.innerHTML = '';

    // 1) Intentamos coger imágenes dentro de .project-images
    let imgs = card.querySelectorAll('.project-images img');

    // 2) Si no hay .project-images, cogemos cualquier <img> directo (cartelería, infografía, etc.)
    if (!imgs.length) {
      imgs = card.querySelectorAll('img');
    }

    // Crear copias de las imágenes y añadirlas al modal
    imgs.forEach((img) => {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt || '';
      imagesContainer.appendChild(clone);
    });

    // Título y descripción
    const title = card.dataset.title || '';
    const description = card.dataset.description || '';

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = description;

    // Mostrar modal
    modal.classList.add('is-open');
    document.body.classList.add('is-locked');
    modal.setAttribute('aria-hidden', 'false');

    // Asegurarnos que el scroll del modal empieza arriba
    const dialog = modal.querySelector('.project-modal-dialog');
    if (dialog) {
      dialog.scrollTop = 0;
    }
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Abrir modal al clicar cualquier tarjeta
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      openModalFromCard(card);
    });
  });

  // Cerrar modal clicando fondo
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Cerrar con botones
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
