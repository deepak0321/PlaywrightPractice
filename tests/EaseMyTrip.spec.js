const {test,expect} = require('@playwright/test');

test.only('EaseMyTrip Booking', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.easemytrip.com/");
    await page.locator("//span[text()='Trains']").click();
    await page.locator("input#txtfromcity").click();
    await page.locator("input#txtfromcity").fill("Trivandrum");
    await page.getByText('Trivandrum Cntl(TVC)').click();
    await page.locator("input#txtdesticity").click();
    await page.locator("input#txtdesticity").fill("Chengalpattu");
    await page.getByText('Chengalpattu(CGL)').click();
    await page.waitForTimeout(5000);
});