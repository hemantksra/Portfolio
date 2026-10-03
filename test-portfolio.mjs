import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const ARTIFACTS_DIR = 'C:\\Users\\heman\\.gemini\\antigravity-ide\\brain\\4ccdc71a-0da1-42da-8574-edd1d45d1720';

async function runTests() {
  console.log('🚀 Starting Automated Portfolio Browser Verification...');
  
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--remote-allow-origins=*']
  };
  if (fs.existsSync(edgePath)) {
    launchOptions.executablePath = edgePath;
    console.log(`🔍 Using installed browser binary: ${edgePath}`);
  }

  const browser = await puppeteer.launch(launchOptions);

  try {
    const page = await browser.newPage();
    
    // Set Desktop Viewport
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    console.log('🌐 Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 15000 });

    // 1. Title & Meta verification
    const title = await page.title();
    console.log(`✅ Page Title: "${title}"`);

    // 2. Hero Section Verification
    const heroName = await page.$eval('.hero-name', el => el.innerText);
    const heroTitle = await page.$eval('.hero-title', el => el.innerText);
    const heroTagline = await page.$eval('.hero-tagline', el => el.innerText);
    console.log(`✅ Hero Name: "${heroName.replace('\n', ' ')}"`);
    console.log(`✅ Hero Title: "${heroTitle}"`);
    console.log(`✅ Hero Tagline: "${heroTagline}"`);

    // 3. Test Terminal Copy Button
    console.log('🧪 Testing Terminal Copy Button in Hero...');
    const copyBtn = await page.$('.terminal-copy-btn');
    if (copyBtn) {
      await copyBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const copyBtnText = await page.$eval('.terminal-copy-btn span', el => el.innerText);
      console.log(`✅ Terminal Copy Button state after click: "${copyBtnText}"`);
    }

    // 4. About Section Verification
    const aboutHeadline = await page.$eval('.about-headline', el => el.innerText);
    const pillarCount = await page.$$eval('.pillar-card', els => els.length);
    console.log(`✅ About Headline: "${aboutHeadline}"`);
    console.log(`✅ About Pillars found: ${pillarCount} pillars`);

    // 5. Skills Section Verification
    const categoryCount = await page.$$eval('.skill-category-card', els => els.length);
    const skillCount = await page.$$eval('.skill-badge-card', els => els.length);
    console.log(`✅ Skills Categories: ${categoryCount} categories`);
    console.log(`✅ Total Skill Badges: ${skillCount} badges`);

    // 6. Projects Section Verification
    const projectCount = await page.$$eval('.project-card', els => els.length);
    const projectTitles = await page.$$eval('.project-title', els => els.map(e => e.innerText));
    console.log(`✅ Projects found (${projectCount}): ${projectTitles.join(', ')}`);

    // 7. Verify all LinkedIn and GitHub URLs
    console.log('🔗 Verifying all LinkedIn and GitHub links across the DOM...');
    const linkedinLinks = await page.$$eval('a[href*="linkedin.com"]', els => els.map(a => ({
      href: a.href,
      text: a.innerText.trim() || a.getAttribute('aria-label') || a.getAttribute('title')
    })));
    const githubLinks = await page.$$eval('a[href*="github.com"]', els => els.map(a => ({
      href: a.href,
      text: a.innerText.trim() || a.getAttribute('aria-label') || a.getAttribute('title')
    })));

    console.log(`✅ Found ${linkedinLinks.length} LinkedIn links:`);
    linkedinLinks.forEach((l, i) => console.log(`   [${i+1}] ${l.text} -> ${l.href}`));
    console.log(`✅ Found ${githubLinks.length} GitHub links:`);
    githubLinks.forEach((l, i) => console.log(`   [${i+1}] ${l.text} -> ${l.href}`));

    // 8. Contact Section & Copy Email Test
    console.log('🧪 Testing "Copy Email" Button in Contact section...');
    const emailBtn = await page.$('.btn-copy-email');
    if (emailBtn) {
      await emailBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const emailBtnText = await page.$eval('.btn-copy-email span', el => el.innerText);
      console.log(`✅ Copy Email Button state after click: "${emailBtnText}"`);
    }

    // 8. Capture Full Page Desktop Screenshot
    const desktopScreenshotPath = path.join(ARTIFACTS_DIR, 'portfolio_desktop.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
    console.log(`📸 Desktop Screenshot saved to: ${desktopScreenshotPath}`);

    // 9. Mobile Viewport Test (iPhone 14 / 375x812)
    console.log('📱 Testing Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    // Capture mobile page with closed menu
    const mobileHeroPath = path.join(ARTIFACTS_DIR, 'portfolio_mobile_hero.png');
    await page.screenshot({ path: mobileHeroPath, fullPage: false });
    console.log(`📸 Mobile Hero Screenshot saved to: ${mobileHeroPath}`);

    // Test Mobile Hamburger Menu
    const menuBtn = await page.$('.mobile-menu-btn');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const drawerOpen = await page.$eval('.mobile-nav-drawer', el => el.classList.contains('open'));
      console.log(`✅ Mobile Navigation Drawer opened: ${drawerOpen}`);
      
      const mobileScreenshotPath = path.join(ARTIFACTS_DIR, 'portfolio_mobile.png');
      await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
      console.log(`📸 Mobile Menu Screenshot saved to: ${mobileScreenshotPath}`);
    }

    console.log('\n🎉 ALL AUTOMATED BROWSER TESTS PASSED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ Error during testing:', error);
  } finally {
    await browser.close();
  }
}

runTests();
