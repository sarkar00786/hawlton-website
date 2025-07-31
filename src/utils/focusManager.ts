'use client'

/**
 * Focus Management Utility
 * Handles focus removal from clicked elements to prevent focus rings from showing after interactions
 */

// Function to remove focus from an element
const removeFocus = (element: HTMLElement) => {
  if (element) {
    element.blur();
    element.style.outline = 'none';
    element.style.boxShadow = 'none';
  }
};

// Function to handle mouse down events - removes focus after a brief delay
const handleMouseDown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target) {
    setTimeout(() => {
      removeFocus(target);
    }, 100);
  }
};

// Function to handle blur events - ensures focus is completely removed
const handleBlur = (event: FocusEvent) => {
  const target = event.target as HTMLElement;
  if (target) {
    setTimeout(() => {
      removeFocus(target);
    }, 100);
  }
};

// Function to handle click events - removes focus after action completion
const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target) {
    setTimeout(() => {
      removeFocus(target);
    }, 150);
  }
};

// List of selectors for interactive elements
const INTERACTIVE_SELECTORS = [
  'button',
  'a',
  'input[type="submit"]',
  'input[type="button"]',
  '[role="button"]',
  '[tabindex]',
  '.btn',
  '.nav-item',
  '.dropdown-item',
  '.card-hover',
  '.faq-button',
  '.accordion-trigger',
  '[data-framer-name]',
  '.motion-div',
  '.interactive-element'
];

// Initialize focus management for all interactive elements
export const initializeFocusManagement = () => {
  if (typeof window === 'undefined') return;

  // Add event listeners to existing elements
  const addEventListeners = () => {
    const elements = document.querySelectorAll(INTERACTIVE_SELECTORS.join(', '));
    
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      
      // Remove existing listeners to prevent duplicates
      htmlElement.removeEventListener('mousedown', handleMouseDown);
      htmlElement.removeEventListener('blur', handleBlur);
      htmlElement.removeEventListener('click', handleClick);
      
      // Add new listeners
      htmlElement.addEventListener('mousedown', handleMouseDown);
      htmlElement.addEventListener('blur', handleBlur);
      htmlElement.addEventListener('click', handleClick);
    });
  };

  // Initial setup
  addEventListeners();

  // Watch for dynamically added elements
  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            // Check if the added element or its children match our selectors
            if (INTERACTIVE_SELECTORS.some(selector => 
              element.matches?.(selector) || element.querySelector?.(selector)
            )) {
              shouldUpdate = true;
            }
          }
        });
      }
    });
    
    if (shouldUpdate) {
      setTimeout(addEventListeners, 100);
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => {
    observer.disconnect();
  };
};

// CSS-in-JS function to inject focus removal styles
export const injectFocusStyles = () => {
  if (typeof window === 'undefined') return;

  const styleId = 'focus-management-styles';
  
  // Remove existing styles
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }

  // Inject new styles
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Remove focus outline when clicked but keep it for keyboard navigation */
    button:focus:not(:focus-visible),
    a:focus:not(:focus-visible),
    input:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible),
    select:focus:not(:focus-visible),
    [role="button"]:focus:not(:focus-visible),
    [tabindex]:focus:not(:focus-visible) {
      outline: none !important;
      box-shadow: none !important;
    }

    /* Ensure focus is removed after click completion */
    button:active,
    a:active,
    input:active,
    textarea:active,
    select:active,
    [role="button"]:active,
    [tabindex]:active {
      outline: none !important;
      animation: removeFocus 0.1s ease-out forwards;
    }

    @keyframes removeFocus {
      to {
        outline: none !important;
        box-shadow: none !important;
      }
    }

    /* Remove focus from elements after interaction */
    button,
    a,
    input[type="submit"],
    input[type="button"],
    [role="button"],
    [tabindex] {
      -webkit-tap-highlight-color: transparent;
      transition: outline 0.1s ease, box-shadow 0.1s ease;
    }

    /* Specific fixes for common interactive elements */
    .btn:focus:not(:focus-visible),
    .nav-item:focus:not(:focus-visible),
    .dropdown-item:focus:not(:focus-visible),
    .card:focus:not(:focus-visible),
    .card-hover:focus:not(:focus-visible),
    .faq-button:focus:not(:focus-visible),
    .accordion-trigger:focus:not(:focus-visible),
    [data-framer-name]:focus:not(:focus-visible),
    .motion-div:focus:not(:focus-visible),
    .interactive-element:focus:not(:focus-visible) {
      outline: none !important;
      box-shadow: none !important;
    }

    /* Ensure Accordion items don't retain focus */
    [role="button"][aria-expanded]:focus:not(:focus-visible) {
      outline: none !important;
      box-shadow: none !important;
    }

    /* Focus styles for accessibility - only show on keyboard navigation */
    :focus-visible {
      outline: 2px solid #FFD700 !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.2) !important;
    }
  `;
  
  document.head.appendChild(style);
};

// Main initialization function
export const initializeFocusManager = () => {
  if (typeof window === 'undefined') return;

  // Wait for DOM to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectFocusStyles();
      initializeFocusManagement();
    });
  } else {
    injectFocusStyles();
    initializeFocusManagement();
  }
};

// Utility function to manually remove focus from an element
export const removeFocusFromElement = (element: HTMLElement | null) => {
  if (element) {
    removeFocus(element);
  }
};

// Utility function to remove focus from element by selector
export const removeFocusFromSelector = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    removeFocus(element);
  }
};

// Export for direct use in components
export { removeFocus, handleMouseDown, handleBlur, handleClick };
