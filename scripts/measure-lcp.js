// Script to measure Largest Contentful Paint (LCP) performance
const puppeteer = require('puppeteer');

async function measureLCP(url) {
    console.log(`Measuring LCP for ${url}...`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set up performance observer for LCP
        await page.evaluateOnNewDocument(() => {
            window.lcpTime = null;

            const observer = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                window.lcpTime = lastEntry.startTime;
            });

            observer.observe({ type: 'largest-contentful-paint', buffered: true });
        });

        // Navigate to the URL and wait for load
        const startTime = Date.now();
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Get the LCP time
        const lcpTime = await page.evaluate(() => window.lcpTime);
        const navigationTime = Date.now() - startTime;

        console.log(`LCP: ${lcpTime ? (lcpTime / 1000).toFixed(2) : 'N/A'} seconds`);
        console.log(`Navigation Time: ${(navigationTime / 1000).toFixed(2)} seconds`);

        // Get the LCP element details
        const lcpElement = await page.evaluate(() => {
            const entries = performance.getEntriesByType('element');
            const lcpEntry = entries.find(entry => entry.identifier === 'largest-contentful-paint');

            if (lcpEntry) {
                return {
                    type: lcpEntry.element ? lcpEntry.element.tagName : 'Unknown',
                    url: lcpEntry.url || 'N/A',
                    size: lcpEntry.size || 'N/A'
                };
            }

            return null;
        });

        if (lcpElement) {
            console.log('LCP Element:');
            console.log(`  Type: ${lcpElement.type}`);
            console.log(`  URL: ${lcpElement.url}`);
            console.log(`  Size: ${lcpElement.size}`);
        }

        // Get all resources loaded
        const resources = await page.evaluate(() => {
            return performance.getEntriesByType('resource').map(entry => ({
                name: entry.name,
                type: entry.initiatorType,
                duration: entry.duration,
                size: entry.transferSize
            }));
        });

        console.log('\nImage Resources:');
        resources
            .filter(res => res.type === 'img' || res.name.match(/\.(png|jpg|jpeg|webp|gif|svg)(\?|$)/i))
            .sort((a, b) => b.size - a.size)
            .slice(0, 5)
            .forEach(res => {
                console.log(`  ${res.name.split('/').pop()}: ${(res.size / 1024).toFixed(2)} KB, loaded in ${(res.duration / 1000).toFixed(2)}s`);
            });

    } finally {
        await browser.close();
    }
}

// Check if URL is provided as command line argument
const url = process.argv[2] || 'http://localhost:3000';
measureLCP(url);
