import { chromium } from 'playwright';

async function run() {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('BROWSER ERROR:', msg.text());
      }
    });

    page.on('pageerror', err => {
      console.log('PAGE EXCEPTION:', err.message);
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML);
    if (!rootHtml) {
      console.log('ROOT IS EMPTY');
    } else {
      console.log('ROOT HAS CONTENT');
    }
    
    await browser.close();
  } catch (e) {
    console.log('Script error:', e.message);
  }
}
run();
