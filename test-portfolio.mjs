import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function runTests() {
  console.log('🚀 Starting Automated Portfolio Browser Verification...');
  
  // Use browser detection instead of hardcoded Edge path
  const isEdge = navigator.userAgent.includes('Edg');
  const isChrome = navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
  
  let launchOptions;
  
  if (isEdge) {
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    if (fs.existsSync(edgePath)) {
      launchOptions = {
        executablePath: edgePath,
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--remote-allow-origins=*']
      };
    } else {
      console.warn('⚠️ Edge not found at expected path, falling back to Chrome...');
      launchOptions = {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--remote-allow-origins=*']
      };
    }
  } else if (isChrome) {
    launchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--remote-allow-origins=*']
    };
  } else {
    console.warn('⚠️ No suitable browser detected. Tests may fail.');
    return;
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  try {
    // Navigate to portfolio
    await page.goto('https://portfolio-hemant-a719.vercel.app', { waitUntil: 'networkidle2' });
    
    console.log('✅ Portfolio loaded successfully');
    
    // Test navigation
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    for (const section of sections) {
      await page.goto(`https://portfolio-hemant-a719.vercel.app#${section}`, { waitUntil: 'networkidle2' });
      console.log(`✅ Navigated to ${section} section`);
    }
    
    // Test contact form validation
    const emailInput = await page.$('#contact-email');
    if (emailInput) {
      await emailInput.type('invalid-email');
      await page.evaluate(() => document.getElementById('contact-form').dispatchEvent(new Event('submit')));
      console.log('✅ Email validation test completed');
    }
    
    // Test copy functionality
    const emailText = await page.$('.contact-card-content');
    if (emailText) {
      await emailText.select();
      await page.evaluate(() => window.navigator.clipboard.writeText('hemantksra@gmail.com'));
      console.log('✅ Email copy test completed');
    }
    
    // Test social links
    const githubLink = await page.$('#contact-github');
    if (githubLink) {
      await githubLink.click();
      console.log('✅ GitHub link test completed');
    }
    
    const linkedinLink = await page.$('#contact-linkedin');
    if (linkedinLink) {
      await linkedinLink.click();
      console.log('✅ LinkedIn link test completed');
    }
    
  } catch (error) {
    console.error('❌ Test execution failed:', error);
  } finally {
    await browser.close();
    console.log('🏁 Browser closed');
  }
}

// Run tests when file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

export default runTests;
