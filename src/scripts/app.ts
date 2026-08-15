/**
 * Application Entry Point & Module Orchestrator
 */

import { initTheme } from './modules/theme';
import { initNavigation } from './modules/navigation';
import { initProjects } from './modules/projects';
import { initAnimations } from './modules/animations';
import { initContactForm } from './modules/contact';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Theme (dark/light)
  initTheme();

  // 2. Initialize Navigation & Scroll-spy
  initNavigation();

  // 3. Initialize Dynamic Projects Showcase
  await initProjects();

  // 4. Initialize Form Handling
  initContactForm();

  // 5. Initialize IntersectionObserver Animations
  initAnimations();

  console.log('✨ DevMo21x-Website-Portfolio initialized successfully.');
});
