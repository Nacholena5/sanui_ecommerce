import { useEffect, useRef } from 'react';

// Hook for managing focus and accessibility
export function useAccessibility() {
  const focusRef = useRef<HTMLElement>(null);

  // Focus management for modals/drawers
  const focusFirstFocusable = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    if (firstElement) {
      firstElement.focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }

      if (e.key === 'Escape') {
        // Close modal/drawer logic would go here
        const closeButton = container.querySelector('[data-close]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  };

  // Announce content to screen readers
  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';

    document.body.appendChild(announcement);
    announcement.textContent = message;

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Skip to main content link (should be added to layout)
  const renderSkipLink = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sanui-blue text-white px-4 py-2 rounded z-50"
    >
      Saltar al contenido principal
    </a>
  );

  return {
    focusRef,
    focusFirstFocusable,
    trapFocus,
    announceToScreenReader,
    renderSkipLink,
  };
}

// Utility function for better button labels
export function getButtonLabel(action: string, item: string, quantity?: number): string {
  if (quantity && quantity > 1) {
    return `${action} ${quantity} ${item}s`;
  }
  return `${action} ${item}`;
}

// Utility for image alt texts
export function getProductImageAlt(productName: string, index: number, total: number): string {
  return `${productName} - Imagen ${index + 1} de ${total}`;
}