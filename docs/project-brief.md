# Project Brief

**Student:** Antonio Burón  
**Handle:** @antonioburon  
**Course:** Diseño Audiovisual e Ilustración (UDIT)  
**Date:** 2026-01-09

---

## Project Concept

### What are you building?

Un portfolio web personal para mostrar trabajos de ilustración y diseño gráfico (branding, editorial, cartelería e infografía) mediante una presentación visual, clara y coherente.

### Who is it for?

Potenciales clientes, estudios/agencias, profesores y convocatorias creativas que busquen ver una selección representativa de proyectos y estilos.

### Why does it matter?

Permite presentar el trabajo profesionalmente, facilitar contactos y oportunidades, y servir como base técnica y visual que pueda escalar y adaptarse con el tiempo.

---

## Technical Approach

### Core Technologies

- [x] HTML5 (marcado semántico en [index.html](index.html))
- [x] CSS3 (ficheros modulares en [assets/css](assets/css))
- [x] JavaScript (vanilla — [assets/js/main.js](assets/js/main.js) para navegación por hash y modal)
- [ ] Otras (posible tooling futuro: build, optimización de assets)

### Implementación y código (detalles)

- Estructura CSS: [assets/css/index.css](assets/css/index.css) actúa como "barrel" que importa módulos: `reset.css`, `theme.css`, `base.css`, `navigation.css`, `layout.css`, `footer.css`, `components.css`. Esto organiza estilos por responsabilidad.
- Carga de fuentes: kit de Adobe Fonts enlazado desde [index.html](index.html).
- Imágenes: miniaturas y recursos se sirven desde ImageKit (URLs externas) y muchas imágenes usan `loading="lazy"` para mejorar rendimiento.

### Principales funciones en `assets/js/main.js`

- `initYear()` — Rellena dinámicamente el año en el footer (`#year`).
- `initMenu()` — Controla el botón hamburguesa, alterna la clase `is-open` en la navegación y actualiza `aria-expanded`. También cierra el menú al seleccionar un enlace (útil en móvil).
- `initSmoothScroll()` — Scroll suave a secciones (opcional/no usado para el router principal).
- `initActiveNav()` — Observador de intersección para marcar enlaces activos según la sección visible (actualmente sustituido por el router de hash).
- `initSectionRouter()` — Router simple basado en `window.location.hash`. Muestra solo la sección con el `id` correspondiente, actualiza estado activo del menú y maneja fallback a `about` si el hash no existe.
- `initProjectsModal()` — Modal de proyectos: al clicar una tarjeta (`.project-card`) recopila imágenes desde `.project-images` (si existe) o desde cualquier `img` dentro de la tarjeta, clona las imágenes al modal, rellena título y descripción desde `data-title`/`data-description`, y gestiona apertura/cierre (backdrop, ESC, botones y bloqueo de scroll del body).

### Cómo funciona la navegación y los proyectos

- Navegación por secciones: los enlaces usan `#about`, `#branding`, etc.; el hash activa `initSectionRouter()` que aplica/remueve la clase `is-active` a las secciones.
- Modal de proyectos: las tarjetas contienen miniaturas visibles y un bloque oculto `.project-images` con el resto de imágenes para el proyecto; el JS clona estos nodos dentro del modal para permitir un scroll vertical con todas las imágenes.

### Accesibilidad y ARIA

- Uso de `aria-expanded` y `aria-label` en controles de navegación.
- Estructura semántica con `header`, `main`, `section` y encabezados (`h1`, `h2`).
- Textos alternativos presentes en imágenes (aunque conviene revisar que todas las imágenes clave tengan `alt` descriptivo).
- Recomendaciones pendientes: validar foco dentro del modal (trap focus), mejorar órdenes de tabulación y auditar contraste de colores.

---

## Responsive Design Strategy

- [x] Diseño adaptativo por secciones (secciones que se muestran según hash)
- [ ] Enfoque mobile-first (mejorar reglas CSS si hace falta)
- [x] Imágenes optimizadas vía cargas diferidas (`loading="lazy"`) en muchas miniaturas
- [ ] Revisión de tipografías y escalado para accesibilidad

---

## Detalles de estructura de ficheros relevantes

- [index.html](index.html) — entrada principal, metadatos (`description`, `theme-color`), enlaces a `assets/css/index.css` y al kit de Adobe Fonts, y markup de todas las secciones.
- [assets/css](assets/css) — ficheros CSS modulares; `index.css` importa los módulos y centraliza la carga de estilos.
- [assets/js/main.js](assets/js/main.js) — lógica de UI: router por hash, menú, modal, utilidades.
- [assets/favicon](assets/favicon) — íconos y `site.webmanifest`.
- [docs/](docs) — documentación y briefs (este fichero incluido).

---

## Recomendaciones técnicas y próximos pasos

- Añadir un `focus trap` al modal para accesibilidad y asegurar que el foco vuelve al elemento disparador al cerrar.
- Auditar y mejorar contraste de color y orden del DOM para lectores de pantalla.
- Considerar un pequeño pipeline (por ejemplo, `npm` + `vite`) si se integran optimizaciones de assets o un workflow de build.
- Automatizar datos de proyectos (JSON o MD) para evitar duplicar markup HTML y facilitar mantenimiento.

---

## Success Metrics

### Short-term (próximas semanas)

- [x] Homepage funcional con navegación por secciones
- [x] Modal de visualización de proyectos funcionando
- [ ] Layout básico responsivo probado en móvil y escritorio
- [ ] Contenido principal en su lugar (about, secciones y contacto)

### Final Project Goals

- [ ] Comportamiento totalmente responsivo y pulido
- [ ] Mejoras de accesibilidad (auditoría y correcciones)
- [ ] Performance optimizada (imágenes y carga)
- [ ] Flujo de actualización de proyectos menos manual (CMS o JSON)

---

## Reflection Questions

### What excites you most about this project?

Mostrar trabajos propios de forma atractiva y profesional, y ver cómo la interfaz potencia la narrativa visual.

### What challenges do you anticipate?

Optimizar imágenes y rendimiento manteniendo calidad visual; asegurar accesibilidad y mantener el proyecto escalable sin introducir demasiada complejidad técnica.

### How does this project connect to your learning goals?

Permite practicar HTML/CSS/JS real aplicados a un producto personal, mejorar buenas prácticas de accesibilidad y aprender optimización para web.

---

_Este brief puede actualizarse según avances. Referencia: [index.html](index.html), [assets/js/main.js](assets/js/main.js) y los ficheros en [assets/css](assets/css)._ 