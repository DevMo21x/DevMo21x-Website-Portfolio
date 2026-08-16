/**
 * Application Entry Point & Module Orchestrator
 */

import { initTheme } from './modules/theme';
import { initNavigation } from './modules/navigation';
import { initAnimations } from './modules/animations';
import { initContactForm } from './modules/contact';

const init = () => {
  // 1. Initialize Theme (dark/light)
  initTheme();

  // 2. Initialize Navigation & Mobile Menu
  initNavigation();

  // 3. Initialize Form Handling
  initContactForm();

  // 4. Initialize IntersectionObserver Animations
  initAnimations();

  console.log('✨ DevMo21x-Website-Portfolio initialized successfully.');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
