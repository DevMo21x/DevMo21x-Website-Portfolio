/**
 * Contact Form Module
 * Client-side validation, accessible feedback, and async submission handling.
 */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusArea = document.getElementById('form-status-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('#contact-name');
    const emailInput = form.querySelector('#contact-email');
    const messageInput = form.querySelector('#contact-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validation
    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Submission simulation / feedback
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending Message...';
    }

    // Simulate async submission (or integrate Formspree / endpoint)
    setTimeout(() => {
      showStatus('Thank you! Your message has been sent successfully.', 'success');
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Message';
      }
    }, 1000);
  });

  function showStatus(message, type) {
    if (!statusArea) return;
    statusArea.textContent = message;
    statusArea.style.display = 'block';
    statusArea.style.padding = '0.75rem 1rem';
    statusArea.style.borderRadius = 'var(--radius-md)';
    statusArea.style.marginTop = '1rem';
    statusArea.style.fontSize = '0.875rem';

    if (type === 'error') {
      statusArea.style.background = 'rgba(239, 68, 68, 0.15)';
      statusArea.style.color = '#ef4444';
      statusArea.style.border = '1px solid rgba(239, 68, 68, 0.3)';
    } else {
      statusArea.style.background = 'var(--color-success-bg)';
      statusArea.style.color = 'var(--color-success)';
      statusArea.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    }
  }
}
