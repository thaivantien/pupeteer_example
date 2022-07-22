const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://en.wikipedia.org', {waitUntil: 'networkidle2'});

    await page.waitForSelector('input[name=search]');
    await delay(3000)
    // await page.type('input[name=search]', 'Adenosine triphosphate');
    //await page.$eval('input[name=search]', el => el.value = 'Adenosine triphosphate');
    await page.focus('input[name=search]');
	await page.keyboard.type('Adenosine triphosphate');
    await delay(3000)
    // await page.click('input[type="submit"]');
    // await page.waitForSelector('#mw-content-text');
    await Promise.all([
        page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);
    const text = await page.evaluate(() => {
        const anchor = document.querySelector('#mw-content-text');
        return anchor.textContent;
    });
    await delay(3000)
    console.log(text);
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }