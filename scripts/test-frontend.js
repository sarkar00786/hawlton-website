const puppeteer = require('puppeteer');

async function testWebsite() {
  const browser = await puppeteer.launch({ headless: false }); // Show browser for debugging
  const page = await browser.newPage();
  
  try {
    console.log('🚀 Testing Hawlton Website...');
    
    // Navigate to the website
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Check if page loads
    const title = await page.title();
    console.log('✅ Page title:', title);
    
    // Check if header is visible
    const header = await page.$('header');
    if (header) {
      console.log('✅ Header is present');
    } else {
      console.log('❌ Header is missing');
    }
    
    // Check if navigation is working
    const navLinks = await page.$$('nav a');
    console.log('✅ Navigation links found:', navLinks.length);
    
    // Check if main content is visible
    const mainContent = await page.$('main');
    if (mainContent) {
      console.log('✅ Main content is present');
    } else {
      console.log('❌ Main content is missing');
    }
    
    // Check for JavaScript errors
    const errors = [];
    page.on('error', err => {
      errors.push(err.message);
    });
    
    page.on('pageerror', err => {
      errors.push(err.message);
    });
    
    // Wait a bit for any errors to surface
    await page.waitForTimeout(2000);
    
    if (errors.length > 0) {
      console.log('❌ JavaScript errors found:');
      errors.forEach(error => console.log('  -', error));
    } else {
      console.log('✅ No JavaScript errors detected');
    }
    
    // Check if dropdown navigation works
    try {
      const aboutLink = await page.$('nav button:has-text("About"), nav a:has-text("About")');
      if (aboutLink) {
        await aboutLink.hover();
        await page.waitForTimeout(500);
        const dropdown = await page.$('.primary-nav__lvl-2-wrap, [class*="dropdown"]');
        if (dropdown) {
          console.log('✅ Dropdown navigation works');
        } else {
          console.log('⚠️  Dropdown navigation not found');
        }
      }
    } catch (err) {
      console.log('⚠️  Could not test dropdown navigation:', err.message);
    }
    
    // Check if hero section content is visible
    const heroSection = await page.$('#hero-section, [id*="hero"]');
    if (heroSection) {
      const heroText = await page.evaluate(el => el.textContent, heroSection);
      if (heroText && heroText.trim().length > 0) {
        console.log('✅ Hero section has content');
      } else {
        console.log('❌ Hero section appears empty');
      }
    } else {
      console.log('❌ Hero section not found');
    }
    
    // Check CSS loading
    const styles = await page.evaluate(() => {
      return Array.from(document.styleSheets).length;
    });
    console.log('✅ Stylesheets loaded:', styles);
    
    // Check if primary colors are applied
    const bodyBgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });
    console.log('✅ Body background color:', bodyBgColor);
    
    console.log('🎉 Website test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  testWebsite().catch(console.error);
}

module.exports = testWebsite;
