const puppeteer = require('puppeteer');
const newGetPlaces = async (url) => {
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
  
    const SEARCH_SELECTOR = '#searchboxinput';
    const SEARCH_BUTTON ='#searchbox-searchbutton';
    const BACK_BUTTON ='.section-back-to-list-button';
    var resultData = [];
    await page.goto(url);
    await page.waitFor(500);

    await page.click(SEARCH_SELECTOR);
    await page.keyboard.type('Agence digital');
    await page.click(SEARCH_BUTTON);
    await page.waitForSelector('.section-result-content');
    await page.screenshot({path: 'search_page.png'});
    await page.evaluate( () => document.getElementById("searchboxinput").value = "");
    await page.waitFor(1000);
    const items = await page.$$eval('.section-result-title', options => options.map(option => option.textContent));
             //  data = [];
        for (let index = 0; index < items.length; index++) {
            console.log(items[index]+index);
            await page.waitFor(1000);
            await page.click(SEARCH_SELECTOR);
            await page.evaluate( () => document.getElementById("searchboxinput").value = "");   
            await page.keyboard.type(items[index]);
            await page.click(SEARCH_BUTTON);
            await page.waitFor(3000);
            try {
                await page.waitForSelector('.section-hero-header-image');
           
               
                const img = await page.$$eval('.section-hero-header-image div button img[src]', imgs => imgs.map(img => img.getAttribute('src')));
                 
              
                // extractedEvaluateCall(page);
                //await page.screenshot({path: 'screenshots/'+items[index]+'.png'});
              } catch (error) {
                console.log("The element didn't appear.")
              }
           
                         //data.push( extractedEvaluateCall(page));

                                 
        }
                   // return data;
   // });

   
    async function extractedEvaluateCall(page) {
        // just extracted same exact logic in separate function
        // this function should use async keyword in order to work and take page as argument
        return await page.evaluate(() => {
            let imageHolder = document.getElementsByClassName('section-hero-header-image');
            let srcImg = imageHolder.childNodes[0].childNodes[0].childNodes[0].getAttribute('src');
            console.log(srcImg);
           
        });
    }
    browser.close();
    return new Promise((resolve, reject) => {
        resolve(items);
        if(reject) {
            reject({error: "error while scraping data."})
        }
    })
};
module.exports = newGetPlaces;