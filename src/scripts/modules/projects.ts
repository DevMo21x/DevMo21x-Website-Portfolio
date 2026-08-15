/**
 * Projects Showcase Module
 * Loads projects data, handles category filtering, search, and detail modal.
 */

let allProjects = [];

export async function initProjects() {
  const container = document.getElementById('projects-grid');
  const tabsContainer = document.getElementById('project-filter-tabs');
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close-btn');

  try {
    const res = await fetch('src/data/projects.json');
    if (!res.ok) throw new Error('Failed to load projects');
    const data = await res.json();
    allProjects = data.projects || [];

    // Render filter tabs
    if (tabsContainer && data.categories) {
      tabsContainer.innerHTML = data.categories.map((cat, idx) => `
        <button class="filter-chip ${idx === 0 ? 'active' : ''}" data-category="${cat.id}">
          ${cat.label}
        </button>
      `).join('');

      tabsContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.filter-chip');
        if (!target) return;
        
        tabsContainer.querySelectorAll('.filter-chip').forEach(chip => chip.classList.remove('active'));
        target.classList.add('active');

        const cat = target.dataset.category;
        filterProjects(cat);
      });
    }

    renderProjects(allProjects);

    // Modal close listeners
    if (modalOverlay) {
      modalClose?.addEventListener('click', () => closeModal());
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
          closeModal();
        }
      });
    }

  } catch (err) {
    console.error('Projects loading error:', err);
    if (container) {
      container.innerHTML = `<p class="error-msg">Unable to load projects at this time.</p>`;
    }
  }
}

function filterProjects(categoryId) {
  if (categoryId === 'all') {
    renderProjects(allProjects);
  } else {
    const filtered = allProjects.filter(p => p.category === categoryId);
    renderProjects(filtered);
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0;">No projects found in this category.</p>`;
    return;
  }

  container.innerHTML = projects.map((p, idx) => `
    <article class="card project-card reveal-on-scroll is-visible stagger-${(idx % 4) + 1}">
      <div class="project-thumbnail">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary); opacity: 0.85;">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
        <h3 style="font-size: 1.25rem;">${p.title}</h3>
        ${p.featured ? `<span class="badge badge-accent">Featured</span>` : ''}
      </div>

      <p style="font-size: 0.9375rem; margin-bottom: 1rem;">${p.summary}</p>

      <div class="project-tags">
        ${p.tags.slice(0, 4).map(tag => `<span class="badge">${tag}</span>`).join('')}
      </div>

      <div class="project-meta">
        <span style="font-size: 0.8125rem; font-family: var(--font-mono); color: var(--accent-secondary);">${p.metrics || ''}</span>
        <div style="display: flex; gap: 0.75rem;">
          ${p.repoUrl ? `
            <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-icon" aria-label="View source code on GitHub" style="color: var(--text-secondary);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          ` : ''}
          <button class="btn btn-sm btn-secondary details-btn" data-project-id="${p.id}">
            Details
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach modal trigger listeners
  container.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pid = btn.dataset.projectId;
      const proj = allProjects.find(item => item.id === pid);
      if (proj) openModal(proj);
    });
  });
}

function openModal(project) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-content-area');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <span class="section-eyebrow">${project.category}</span>
    <h2 style="margin-bottom: 1rem;">${project.title}</h2>
    <p class="lead" style="margin-bottom: 1.5rem;">${project.description}</p>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.5rem;">Key Performance Metrics</h4>
      <p style="font-family: var(--font-mono); color: var(--accent-secondary);">${project.metrics}</p>
    </div>

    <div style="margin-bottom: 2rem;">
      <h4 style="margin-bottom: 0.5rem;">Technologies & Architecture</h4>
      <div class="project-tags">
        ${project.tags.map(t => `<span class="badge badge-accent">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Demo ↗</a>` : ''}
      ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Source Code (GitHub)</a>` : ''}
    </div>
  `;

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}
