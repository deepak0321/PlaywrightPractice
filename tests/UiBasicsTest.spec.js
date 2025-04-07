
const {test, expect} = require('@playwright/test');


test.only('First Playwright Test', async ({browser}) => {
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://www.ixigo.com/");
    
    const frame = await page.frameLocator('iframe#wiz-iframe-intent');
    
    await frame.locator('button#closeButton').click();

    const trainsTab = await page.locator('.body-sm.text-xl',{ hasText:'Trains'});
    
    await trainsTab.click();

    const searchButton = await page.locator("[data-testid='book-train-tickets']");

    await page.waitForTimeout(1000);

    await searchButton.click();

    const errorText = await page.locator('div.grow > div').textContent();

    expect(errorText).toContain('Please select a source station');

    await page.waitForTimeout(5000);
});

test('Browser Context Test', async ({page}) => {
    
     await page.goto("https://www.easemytrip.com/");
     console.log(await page.title())
     await expect(page).toHaveTitle("EaseMyTrip.com - Book Flights, Hotels, Holidays, Bus & Train Tickets")
 
 });