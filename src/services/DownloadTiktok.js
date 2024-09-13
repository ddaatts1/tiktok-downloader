// const puppeteer = require("puppeteer");
//
// const downloadTikTokVideo = async (url) => {
//     let browser = null;
//     try {
//         const launchOptions = {
//             headless: true,
//         };
//
//         // Launch the browser
//         browser = await puppeteer.launch(launchOptions);
//
//         // Create a new page
//         const page = await browser.newPage();
//         await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36');
//
//         await page.evaluateOnNewDocument(() => {
//             delete navigator.__proto__.webdriver;
//         });
//         await page.goto(`https://snaptik.app/`);
//         await page.waitForSelector('#url');
//
//         // Input text into the input field
//         await page.type('#url', url);
//
//         // Click the paste button
//         await page.click('form > button');
//         await new Promise(resolve => setTimeout(resolve, 3000));
//
//         // Get the href attribute of the first <a> element
//         const link = await page.evaluate(() => {
//             const firstLink = document.querySelector('.video-links a'); // Select the first <a> element
//             return firstLink ? firstLink.getAttribute('href') : null;
//         });
//
//         // Get the image
//         const image = await page.evaluate(() => {
//             const firstLink = document.querySelector('.download-box img'); // Select the first <a> element
//             return firstLink ? firstLink.getAttribute('src') : null;
//         });
//
//         const title = await page.evaluate(() => {
//             const titleElement = document.querySelector('.video-title');
//             return titleElement ? titleElement.innerText : 'Unknown Title';
//         });
//
//         console.log("link: " + link);
//
//         console.log("==============> Download success!");
//         await browser.close();
//
//         return {
//             title,
//             link,
//             image
//         };
//     } catch (e) {
//         if (browser) {
//             await browser.close();
//         }
//         console.error("=====> Error Downloading TikTok: " + url, e);
//         return { error: e.message };
//     }
// }
//
// // Export the function with a name
// module.exports = {
//     downloadTikTokVideo
// };




// solution 2


const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

const downloadTikTokVideo = async (url) => {
    let browser = null;
    try {
        const launchOptions = {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080', // Ensure the browser starts with a proper window size
                '--disable-extensions',    // Disable any browser extensions
                '--hide-scrollbars',       // Hide scrollbars to prevent unwanted rendering
                '--mute-audio',            // Prevents audio from playing
                '--disable-background-timer-throttling',
                '--disable-renderer-backgrounding',
                '--disable-backgrounding-occluded-windows',
                '--disable-infobars',      // Prevent infobar message
            ],
            ignoreHTTPSErrors: true,
        };


        // Launch the browser
        browser = await puppeteer.launch(launchOptions);

        // Create a new page
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto('https://snaptik.app/', { waitUntil: 'networkidle2' });

        // Input text into the input field
        await page.type('#url', url);

        // Click the paste button
        await page.click('form > button');
        await page.waitForSelector('.video-links a'); // Wait for the links to appear
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Get the href attribute of the first <a> element
        const link = await page.evaluate(() => {
            const firstLink = document.querySelector('.video-links a'); // Select the first <a> element
            return firstLink ? firstLink.getAttribute('href') : null;
        });

        // Get the image
        const image = await page.evaluate(() => {
            const firstImg = document.querySelector('.download-box img'); // Select the first <img> element
            return firstImg ? firstImg.getAttribute('src') : null;
        });

        // Get the title
        const title = await page.evaluate(() => {
            const titleElement = document.querySelector('.video-title');
            return titleElement ? titleElement.innerText : 'Unknown Title';
        });

        console.log("link: " + link);
        console.log("image: " + image);
        console.log("title: " + title);
        console.log("==============> Download success!");

        await browser.close();

        return {
            title,
            link,
            image
        };
    } catch (e) {
        if (browser) {
            await browser.close();
        }
        console.error("=====> Error Downloading TikTok: " + url, e);
        return { error: e.message };
    }
}

// Export the function with a name
module.exports = {
    downloadTikTokVideo
};
