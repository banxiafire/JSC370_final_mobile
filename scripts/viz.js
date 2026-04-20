// Smooth scroll to viz sections from anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Add section jump links to viz page
const vizSections = document.querySelectorAll('.viz-section');
vizSections.forEach((section, i) => {
  section.setAttribute('id', `viz-${i + 1}`);
});
