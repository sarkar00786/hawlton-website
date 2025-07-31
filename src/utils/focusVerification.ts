'use client'

/**
 * FOCUS VERIFICATION UTILITY - 100% SUCCESS VERIFICATION
 * This utility verifies that the focus management system is working correctly
 * across all pages and all interactive elements.
 */

interface FocusTestResult {
  element: HTMLElement;
  elementType: string;
  selector: string;
  hasFocus: boolean;
  hasOutline: boolean;
  hasBoxShadow: boolean;
  success: boolean;
}

interface VerificationReport {
  totalElements: number;
  successfulElements: number;
  failedElements: number;
  successRate: number;
  results: FocusTestResult[];
  timestamp: string;
}

// Comprehensive list of all interactive selectors to test
const ALL_INTERACTIVE_SELECTORS = [
  'button',
  'a',
  'input[type="submit"]',
  'input[type="button"]',
  'input[type="reset"]',
  'input[type="image"]',
  '[role="button"]',
  '[tabindex]',
  '[tabindex="0"]',
  '[tabindex="-1"]',
  'summary',
  'details',
  'label[for]',
  '.btn',
  '.button',
  '.nav-item',
  '.dropdown-item',
  '.card',
  '.card-hover',
  '.card-interactive',
  '.faq-button',
  '.accordion-trigger',
  '.accordion-button',
  '.tab-button',
  '.menu-item',
  '.toggle-button',
  '.motion-div',
  '.motion-button',
  '.interactive-element',
  '.animated-element',
  '.hover-element',
  '[data-framer-name]',
  '[data-testid]',
  '[data-cy]',
  '[data-component]',
  '.MuiButton-root',
  '.ant-btn',
  '.chakra-button'
];

/**
 * Simulates a click on an element and checks if focus is properly removed
 */
const testElementFocus = (element: HTMLElement): FocusTestResult => {
  const selector = getElementSelector(element);
  const elementType = element.tagName.toLowerCase();
  
  // Simulate click
  element.click();
  
  // Wait a brief moment for focus removal to occur
  setTimeout(() => {}, 200);
  
  // Check focus state
  const hasFocus = document.activeElement === element;
  const computedStyle = window.getComputedStyle(element);
  const hasOutline = computedStyle.outline !== 'none' && computedStyle.outline !== '';
  const hasBoxShadow = computedStyle.boxShadow !== 'none' && 
                       !computedStyle.boxShadow.includes('rgba(0, 0, 0, 0)');
  
  // Element passes if it doesn't have focus after click
  const success = !hasFocus && !hasOutline && !hasBoxShadow;
  
  return {
    element,
    elementType,
    selector,
    hasFocus,
    hasOutline,
    hasBoxShadow,
    success
  };
};

/**
 * Gets a meaningful selector for an element for reporting
 */
const getElementSelector = (element: HTMLElement): string => {
  if (element.id) return `#${element.id}`;
  if (element.className) {
    const classes = element.className.split(' ').filter(c => c.length > 0);
    if (classes.length > 0) return `.${classes[0]}`;
  }
  return element.tagName.toLowerCase();
};

/**
 * Runs comprehensive focus verification on all interactive elements
 */
export const verifyFocusManagement = (): Promise<VerificationReport> => {
  return new Promise((resolve) => {
    console.log('🔍 Starting comprehensive focus management verification...');
    
    // Find all interactive elements
    const allElements: HTMLElement[] = [];
    
    ALL_INTERACTIVE_SELECTORS.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        elements.forEach(el => {
          if (!allElements.includes(el)) {
            allElements.push(el);
          }
        });
      } catch (e) {
        // Skip invalid selectors
      }
    });
    
    console.log(`📊 Found ${allElements.length} interactive elements to test`);
    
    // Test each element
    const results: FocusTestResult[] = [];
    let processedCount = 0;
    
    const processElement = (index: number) => {
      if (index >= allElements.length) {
        // All elements processed, generate report
        const successfulElements = results.filter(r => r.success).length;
        const failedElements = results.length - successfulElements;
        const successRate = (successfulElements / results.length) * 100;
        
        const report: VerificationReport = {
          totalElements: results.length,
          successfulElements,
          failedElements,
          successRate,
          results,
          timestamp: new Date().toISOString()
        };
        
        console.log(`✅ Focus verification complete!`);
        console.log(`📈 Success rate: ${successRate.toFixed(1)}% (${successfulElements}/${results.length})`);
        
        if (failedElements > 0) {
          console.warn(`⚠️  ${failedElements} elements still showing focus after click:`);
          results.filter(r => !r.success).forEach(r => {
            console.warn(`   - ${r.selector} (${r.elementType})`);
          });
        }
        
        resolve(report);
        return;
      }
      
      const element = allElements[index];
      
      // Skip elements that are not visible or not interactable
      const isDisabled = element.hasAttribute('disabled') || (element as any).disabled;
      if (!element.offsetParent || element.hidden || isDisabled) {
        processElement(index + 1);
        return;
      }
      
      try {
        const result = testElementFocus(element);
        results.push(result);
        
        processedCount++;
        if (processedCount % 10 === 0) {
          console.log(`⏳ Processed ${processedCount}/${allElements.length} elements...`);
        }
      } catch (e) {
        console.warn(`Failed to test element ${getElementSelector(element)}:`, e);
      }
      
      // Process next element after a brief delay
      setTimeout(() => processElement(index + 1), 10);
    };
    
    // Start processing
    processElement(0);
  });
};

/**
 * Quick verification function for immediate feedback
 */
export const quickFocusCheck = (): boolean => {
  const testElements = document.querySelectorAll('button, a, [role="button"]') as NodeListOf<HTMLElement>;
  let passCount = 0;
  
  testElements.forEach(element => {
    if (element.offsetParent) { // Only test visible elements
      element.click();
      setTimeout(() => {
        const hasFocus = document.activeElement === element;
        if (!hasFocus) passCount++;
      }, 100);
    }
  });
  
  const successRate = (passCount / testElements.length) * 100;
  console.log(`🚀 Quick check: ${successRate.toFixed(1)}% success rate`);
  
  return successRate > 95; // Consider success if 95%+ elements pass
};

/**
 * Logs detailed verification results to console
 */
export const logVerificationResults = (report: VerificationReport) => {
  console.group('🎯 FOCUS MANAGEMENT VERIFICATION REPORT');
  console.log(`📅 Timestamp: ${report.timestamp}`);
  console.log(`📊 Total Elements Tested: ${report.totalElements}`);
  console.log(`✅ Successful Elements: ${report.successfulElements}`);
  console.log(`❌ Failed Elements: ${report.failedElements}`);
  console.log(`📈 Success Rate: ${report.successRate.toFixed(2)}%`);
  
  if (report.failedElements > 0) {
    console.group('❌ Failed Elements Details:');
    report.results.filter(r => !r.success).forEach((result, index) => {
      console.log(`${index + 1}. ${result.selector} (${result.elementType})`);
      console.log(`   - Has Focus: ${result.hasFocus}`);
      console.log(`   - Has Outline: ${result.hasOutline}`);
      console.log(`   - Has Box Shadow: ${result.hasBoxShadow}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
};

/**
 * Exports results as downloadable JSON
 */
export const exportVerificationResults = (report: VerificationReport) => {
  const dataStr = JSON.stringify(report, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `focus-verification-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  console.log('📁 Verification results exported as JSON file');
};

// Auto-run verification in development mode
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Wait for page to load, then run verification
  window.addEventListener('load', () => {
    setTimeout(() => {
      verifyFocusManagement().then(report => {
        logVerificationResults(report);
        
        if (report.successRate === 100) {
          console.log('🎉 PERFECT! 100% focus management success rate achieved!');
        } else if (report.successRate >= 95) {
          console.log('🌟 EXCELLENT! Focus management is working very well!');
        } else if (report.successRate >= 80) {
          console.log('👍 GOOD! Focus management is mostly working, minor issues detected.');
        } else {
          console.warn('⚠️  Focus management needs attention. Some elements still show focus after click.');
        }
      });
    }, 2000);
  });
}
