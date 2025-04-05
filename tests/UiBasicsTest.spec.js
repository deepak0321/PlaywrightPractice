const {test, expect} = require('@playwright/test');


test('First Playwright Test', async ({browser}) => {
   //newContext() -> Fresh Instance of the Browser
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.ixigo.com/");

});

test.only('Browser Context Test', async ({page}) => {
    
     await page.goto("https://www.easemytrip.com/");
     console.log(await page.title())
     await expect(page).toHaveTitle("EaseMyTrip.com - Book Flights, Hotels, Holidays, Bus & Train Tickets")
 
 });