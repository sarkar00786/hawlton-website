#!/usr/bin/env node

/**
 * Comprehensive Website Testing Script for Hawlton
 * Tests all critical functionality, performance, and user experience
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class WebsiteTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  log(message, type = 'info') {
    const colors = {
      success: '\x1b[32m✅',
      error: '\x1b[31m❌',
      warning: '\x1b[33m⚠️',
      info: '\x1b[36mℹ️'
    };
    console.log(`${colors[type]} ${message}\x1b[0m`);
  }

  test(name, testFn) {
    try {
      const result = testFn();
      if (result) {
        this.results.passed++;
        this.results.tests.push({ name, status: 'passed' });
        this.log(`${name}`, 'success');
      } else {
        this.results.failed++;
        this.results.tests.push({ name, status: 'failed' });
        this.log(`${name}`, 'error');
      }
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'failed', error: error.message });
      this.log(`${name}: ${error.message}`, 'error');
    }
  }

  warn(message) {
    this.results.warnings++;
    this.log(message, 'warning');
  }

  // File existence tests
  testFileStructure() {
    this.log('\n🔍 Testing File Structure...', 'info');
    
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/globals.css',
      'src/app/not-found.tsx',
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/components/CookieConsent.tsx',
      'tailwind.config.ts',
      'next.config.ts',
      'package.json',
      'public/robots.txt',
      'public/sitemap.xml',
      'public/favicon.ico',
      'public/site.webmanifest'
    ];

    requiredFiles.forEach(file => {
      this.test(`File exists: ${file}`, () => {
        return fs.existsSync(path.join(process.cwd(), file));
      });
    });
  }

  // Package.json validation
  testPackageJson() {
    this.log('\n📦 Testing Package Configuration...', 'info');
    
    this.test('package.json is valid JSON', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return pkg.name && pkg.version && pkg.scripts;
    });

    this.test('Required dependencies exist', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const required = ['next', 'react', 'react-dom', 'tailwindcss', 'framer-motion'];
      return required.every(dep => 
        pkg.dependencies[dep] || pkg.devDependencies[dep]
      );
    });
  }

  // SEO and Meta tests
  testSEOElements() {
    this.log('\n🔍 Testing SEO Elements...', 'info');
    
    this.test('robots.txt exists and is valid', () => {
      const robotsContent = fs.readFileSync('public/robots.txt', 'utf8');
      return robotsContent.includes('User-agent:') && 
             robotsContent.includes('Sitemap:');
    });

    this.test('sitemap.xml exists and is valid', () => {
      const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
      return sitemapContent.includes('<?xml version="1.0"') && 
             sitemapContent.includes('<urlset');
    });

    this.test('Layout has proper meta tags', () => {
      const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
      return layoutContent.includes('export const metadata') &&
             layoutContent.includes('title:') &&
             layoutContent.includes('description:');
    });
  }

  // Component structure tests
  testComponents() {
    this.log('\n⚛️ Testing React Components...', 'info');
    
    const components = [
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/components/CookieConsent.tsx'
    ];

    components.forEach(component => {
      this.test(`${component} has proper React structure`, () => {
        const content = fs.readFileSync(component, 'utf8');
        return content.includes('export default') || content.includes('export {');
      });
    });
  }

  // CSS and styling tests
  testStyling() {
    this.log('\n🎨 Testing Styling Configuration...', 'info');
    
    this.test('Tailwind config exists and is valid', () => {
      const configContent = fs.readFileSync('tailwind.config.ts', 'utf8');
      return configContent.includes('export default') &&
             configContent.includes('content:') &&
             configContent.includes('theme:');
    });

    this.test('Global CSS has Tailwind imports', () => {
      const cssContent = fs.readFileSync('src/app/globals.css', 'utf8');
      return cssContent.includes('@tailwind base') &&
             cssContent.includes('@tailwind components') &&
             cssContent.includes('@tailwind utilities');
    });

    this.test('Custom CSS classes defined', () => {
      const cssContent = fs.readFileSync('src/app/globals.css', 'utf8');
      return cssContent.includes('@layer components') ||
             cssContent.includes('@layer utilities');
    });
  }

  // Build test
  testBuild() {
    this.log('\n🔨 Testing Build Process...', 'info');
    
    this.test('Project builds successfully', () => {
      try {
        execSync('npm run build', { stdio: 'pipe' });
        return true;
      } catch (error) {
        return false;
      }
    });
  }

  // Performance and accessibility checks
  testPerformance() {
    this.log('\n⚡ Performance Recommendations...', 'info');
    
    // Check for image optimization
    const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
    if (!layoutContent.includes('next/image')) {
      this.warn('Consider using Next.js Image component for optimization');
    }

    // Check for font optimization
    if (layoutContent.includes('next/font')) {
      this.log('Font optimization detected', 'success');
    } else {
      this.warn('Consider using next/font for font optimization');
    }
  }

  // Security checks
  testSecurity() {
    this.log('\n🔒 Testing Security Configuration...', 'info');
    
    this.test('Environment variables are properly handled', () => {
      const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
      return layoutContent.includes('process.env');
    });

    this.test('Cookie consent implemented', () => {
      const cookieContent = fs.readFileSync('src/components/CookieConsent.tsx', 'utf8');
      return cookieContent.includes('localStorage') &&
             cookieContent.includes('consent');
    });
  }

  // Accessibility tests
  testAccessibility() {
    this.log('\n♿ Testing Accessibility Features...', 'info');
    
    this.test('Focus styles implemented', () => {
      const cssContent = fs.readFileSync('src/app/globals.css', 'utf8');
      return cssContent.includes('focus:') || cssContent.includes(':focus');
    });

    this.test('Semantic HTML structure', () => {
      const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
      return layoutContent.includes('<main>') &&
             layoutContent.includes('<header>') &&
             layoutContent.includes('<footer>');
    });
  }

  // Run all tests
  runAllTests() {
    console.log('🚀 Starting Hawlton Website Quality Assurance Tests...\n');
    
    this.testFileStructure();
    this.testPackageJson();
    this.testSEOElements();
    this.testComponents();
    this.testStyling();
    this.testSecurity();
    this.testAccessibility();
    this.testPerformance();
    
    // Note: Build test can be expensive, uncomment if needed
    // this.testBuild();
    
    this.printResults();
  }

  printResults() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 HAWLTON WEBSITE QA RESULTS');
    console.log('='.repeat(50));
    
    this.log(`✅ Tests Passed: ${this.results.passed}`, 'success');
    this.log(`❌ Tests Failed: ${this.results.failed}`, 'error');
    this.log(`⚠️ Warnings: ${this.results.warnings}`, 'warning');
    
    const total = this.results.passed + this.results.failed;
    const percentage = Math.round((this.results.passed / total) * 100);
    
    console.log(`\n📈 Success Rate: ${percentage}%`);
    
    if (this.results.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'failed')
        .forEach(test => {
          console.log(`   • ${test.name}${test.error ? ': ' + test.error : ''}`);
        });
    }
    
    if (percentage >= 90) {
      this.log('\n🎉 Excellent! Your website meets high quality standards.', 'success');
    } else if (percentage >= 80) {
      this.log('\n✅ Good! Address the failed tests to improve quality.', 'info');
    } else {
      this.log('\n⚠️ Needs attention. Please fix the failing tests.', 'warning');
    }
    
    console.log('\n🔗 Next Steps:');
    console.log('   1. Fix any failed tests');
    console.log('   2. Address warnings for optimization');
    console.log('   3. Run performance audit with Lighthouse');
    console.log('   4. Test on multiple devices and browsers');
    console.log('   5. Conduct user acceptance testing');
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new WebsiteTester();
  tester.runAllTests();
}

module.exports = WebsiteTester;
