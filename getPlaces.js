const puppeteer = require('puppeteer');
const getPlaces = async (url) => {
    const browser = await puppeteer.launch({args: ['--disabled-setuid-sandbox', '--no-sandbox']});
    const page = await browser.newPage();
  
    const SEARCH_SELECTOR = '#searchboxinput';
    const SEARCH_BUTTON ='#searchbox-searchbutton';
    const BACK_BUTTON ='.section-back-to-list-button';
    await page.goto(url);
    await page.waitFor(500);

    await page.click(SEARCH_SELECTOR);
    await page.keyboard.type('location voiture');
    await page.click(SEARCH_BUTTON);
    await page.waitForSelector('.section-result-content');
    const data = await page.$$eval('.section-result-title', options => options.map(option => option.textContent));
   /* const data = await page.evaluate(() => {
        
        let sectionResultTitlesClasses = document.getElementsByClassName('section-result-title');
        let sectionResultCategoriesClasses = document.getElementsByClassName('section-result-details');
        let sectionResultAdressesClasses = document.getElementsByClassName('section-result-location');
        let sectionResultPhonesNumbersClasses = document.getElementsByClassName('section-result-phone-number');

        let sectionResultTitles = [];
        let images = [];
       
        for(let title of sectionResultTitlesClasses){
            sectionResultTitles.push(title.innerText);
           
            
        }

        let sectionResultCategories = [];
        for(let category of sectionResultCategoriesClasses){
            sectionResultCategories.push(category.innerText);
        }
        
        let sectionResultAdresses = [];
        for(let adress of sectionResultAdressesClasses){
            sectionResultAdresses.push(adress.innerText);
        }

        let sectionResultPhonesNumbers = [];
        for(let phoneNumber of sectionResultPhonesNumbersClasses){
            sectionResultPhonesNumbers.push(phoneNumber.innerText);
        }

        return {
            sectionResultTitles,
            images,
            sectionResultCategories,
            sectionResultAdresses,
            sectionResultPhonesNumbers
        }

    })
    */
    browser.close();
    return new Promise((resolve, reject) => {
        resolve(data.length);
        if(reject) {
            reject({error: "error while scraping data."})
        }
    })
};
module.exports = getPlaces;