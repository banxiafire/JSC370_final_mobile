document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
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

  const hero = document.querySelector('.hero');
  const heroInner = document.querySelector('.hero-inner');
  if (hero && heroInner) {
    hero.addEventListener('mousemove', (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      heroInner.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroInner.style.transform = 'translate3d(0, 0, 0)';
    });
  }

  const revealItems = [...document.querySelectorAll('.fade-in')];
  if (revealItems.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach((el) => el.classList.add('visible'));
  }

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    if (Number.isNaN(target)) return;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;
      const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();
      el.textContent = `${prefix}${formatted}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const counters = [...document.querySelectorAll('.counter')];
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.55 });
    counters.forEach((el) => counterObserver.observe(el));
  }

  const animatedBars = [...document.querySelectorAll('.mini-bar-fill, .diverge-bar')];
  if (animatedBars.length) {
    animatedBars.forEach((bar) => {
      const finalWidth = bar.style.width || getComputedStyle(bar).width;
      bar.dataset.finalWidth = finalWidth;
      bar.style.width = '0';
    });

    if ('IntersectionObserver' in window) {
      const barObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          bar.style.width = bar.dataset.finalWidth;
          barObserver.unobserve(bar);
        });
      }, { threshold: 0.35 });
      animatedBars.forEach((bar) => barObserver.observe(bar));
    } else {
      animatedBars.forEach((bar) => {
        bar.style.width = bar.dataset.finalWidth;
      });
    }
  }
});
