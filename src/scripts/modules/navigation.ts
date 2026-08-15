/**
 * Navigation Module
 * Handles mobile menu toggle and accessibility.
 */

export function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (!mobileMenuBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', toggleMenu);
  }

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
}
