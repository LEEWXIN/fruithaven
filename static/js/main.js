document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn  = document.querySelector('.toggle-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  const flashes = document.querySelectorAll('.flash');
  flashes.forEach(f => {
    setTimeout(() => {
      f.style.transition = 'opacity .5s';
      f.style.opacity = '0';
      setTimeout(() => f.remove(), 500);
    }, 3000);
  });
});
