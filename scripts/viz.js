document.addEventListener('DOMContentLoaded', () => {
  document.title = 'JSC370 | Interactive Visualizations';

  const currentPage = location.pathname.split('/').pop() || 'viz.html';
  document.querySelectorAll('nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  const header = document.querySelector('.site-header');
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const sections = [...document.querySelectorAll('.viz-section')];
  sections.forEach((section, i) => {
    section.setAttribute('id', `viz-${i + 1}`);
    section.classList.add('fade-in');
  });

  const intro = document.querySelector('.content');
  if (intro && sections.length) {
    const toolbar = document.createElement('div');
    toolbar.className = 'viz-toolbar';
    toolbar.innerHTML = sections.map((section, index) => {
      const label = section.querySelector('h2')?.textContent?.replace(/^Interactive Figure \d+:\s*/, '') || `Figure ${index + 1}`;
      return `<a class="viz-chip" href="#viz-${index + 1}">${index + 1}. ${label}</a>`;
    }).join('');
    intro.insertBefore(toolbar, sections[0]);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 })
    : null;

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    if (revealObserver) {
      revealObserver.observe(section);
    } else {
      section.classList.add('visible');
    }
  });

  const chips = [...document.querySelectorAll('.viz-chip')];
  if (chips.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const chip = chips.find((c) => c.getAttribute('href') === `#${id}`);
        if (!chip) return;
        chip.classList.toggle('active', entry.isIntersecting);
        entry.target.classList.toggle('is-active', entry.isIntersecting);
      });
    }, { threshold: 0.35 });
    sections.forEach((section) => navObserver.observe(section));
  }

  const graphDivs = [...document.querySelectorAll('.plotly-graph-div')];
  const waitForPlotly = () => {
    if (!window.Plotly || !graphDivs.length || graphDivs.some((gd) => !gd.layout)) {
      window.setTimeout(waitForPlotly, 150);
      return;
    }

    const relayoutGraphs = () => {
      const mobile = window.innerWidth < 760;

      graphDivs.forEach((gd, index) => {
        const section = gd.closest('.viz-section');
        const heading = section?.querySelector('h2');
        const plotTitle = gd.layout?.title?.text || '';
        if (heading && plotTitle) {
          heading.textContent = plotTitle.replace(/<[^>]+>/g, '');
        }

        const common = {
          'paper_bgcolor': '#ffffff',
          'plot_bgcolor': '#ffffff',
          'font.family': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          'font.size': mobile ? 12 : 13,
          'title.text': '',
          'legend.font.size': mobile ? 10 : 11,
          'xaxis.automargin': true,
          'yaxis.automargin': true,
        };

        if (index === 0) {
          Plotly.relayout(gd, {
            ...common,
            height: mobile ? 500 : 620,
            margin: { l: 58, r: 18, t: 78, b: 110 },
            legend: { orientation: 'h', y: -0.2, x: 0, xanchor: 'left' },
            updatemenus: [{
              ...(gd.layout.updatemenus?.[0] || {}),
              x: 0,
              y: 1.16,
              xanchor: 'left',
              yanchor: 'top',
              bgcolor: 'rgba(255,255,255,0.94)',
              bordercolor: 'rgba(19,111,99,0.16)',
              pad: { r: 8, t: 0 },
            }],
          });
        } else if (index === 1) {
          Plotly.relayout(gd, {
            ...common,
            height: mobile ? 500 : 620,
            margin: { l: 58, r: 18, t: 82, b: 104 },
            legend: { orientation: 'h', y: -0.2, x: 0, xanchor: 'left' },
            updatemenus: [{
              ...(gd.layout.updatemenus?.[0] || {}),
              x: 0,
              y: 1.16,
              xanchor: 'left',
              yanchor: 'top',
              bgcolor: 'rgba(255,255,255,0.94)',
              bordercolor: 'rgba(19,111,99,0.16)',
            }],
          });
        } else if (index === 2) {
          Plotly.relayout(gd, {
            ...common,
            height: mobile ? 520 : 580,
            margin: { l: 60, r: 60, t: 42, b: 122 },
            legend: { orientation: 'h', y: 1.12, x: 0, xanchor: 'left' },
            'xaxis.tickangle': mobile ? -55 : -38,
          });
        } else if (index === 3) {
          Plotly.relayout(gd, {
            ...common,
            height: mobile ? 520 : 600,
            margin: { l: 64, r: 24, t: 42, b: 92 },
            legend: { orientation: 'h', y: 1.1, x: 0, xanchor: 'left' },
          });
        } else if (index === 4) {
          Plotly.relayout(gd, {
            ...common,
            height: mobile ? 560 : 680,
            margin: { l: 20, r: 20, t: 30, b: 120 },
            legend: { orientation: mobile ? 'h' : 'v', y: mobile ? -0.18 : 0.98, x: mobile ? 0 : 1.02, xanchor: mobile ? 'left' : 'left' },
            updatemenus: [{
              ...(gd.layout.updatemenus?.[0] || {}),
              x: 0,
              y: 0,
              xanchor: 'left',
              yanchor: 'top',
              bgcolor: 'rgba(255,255,255,0.94)',
              bordercolor: 'rgba(19,111,99,0.16)',
            }],
            sliders: [{
              ...(gd.layout.sliders?.[0] || {}),
              x: 0.08,
              len: 0.9,
              y: 0,
              pad: { t: 46, b: 0 },
              currentvalue: { prefix: 'Year: ' },
            }],
          });
        }

        Plotly.Plots.resize(gd);
      });
    };

    relayoutGraphs();
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(relayoutGraphs, 120);
    });
  };

  waitForPlotly();
});
