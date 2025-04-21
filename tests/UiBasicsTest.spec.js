
const {test, expect} = require('@playwright/test');


test('Train Ticket Booking feature ', async ({browser}) => {
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto("https://www.ixigo.com/");
    
    const frame = await page.frameLocator('iframe#wiz-iframe-intent');
    
    await frame.locator('button#closeButton').click();

    const trainsTab = page.locator('.body-sm.text-xl',{ hasText:'Trains'});
    
    await trainsTab.click();

    const searchButton = page.locator("[data-testid='book-train-tickets']");

    await page.waitForLoadState('networkidle');

    await searchButton.click();

    const errorText = await page.locator('div.grow > div').textContent();

    expect(errorText).toContain('Please enter origin station!');

    const originStation = 'Trivandrum Cntl (TVC)';

    await page.locator("[placeholder*='Origin']").pressSequentially(originStation);

    const originDropDown = await page.locator('.no-scrollbar').first();
    
    await originDropDown.waitFor();

    const origins = originDropDown.locator('p');

    for(let i = 0; i < await origins.count() ; i++){
        const origin = await origins.nth(i).textContent();
        if(origin === originStation){
            await origins.nth(i).click();
            break;
        }
    }

    expect(await page.locator('[placeholder*="Origin"]').getAttribute('value')).toBe(originStation);

    const destinationStation = 'Chengalpattu (CGL)';

    await page.locator("[placeholder*='Destination']").pressSequentially(destinationStation);

    const destinationDropDown = await page.locator('.no-scrollbar').first();
    
    await destinationDropDown.waitFor();

    const destinations = destinationDropDown.locator('p');
    
    for(let i = 0; i < await destinations.count() ; i++){
        const destination = await destinations.nth(i).textContent();
        console.log(await destinations.count()+"||"+destination +"||" + destinationStation);
        if(destination === destinationStation){
            await destinations.nth(i).waitFor();
            await destinations.nth(i).click();
            console.log("YESS");
            break;
        }
    }

    expect(await page.locator('[placeholder*="Destination"]').getAttribute('value')).toBe(destinationStation);

    const month = await page.locator('.react-calendar__navigation__label span').first();

    const nextMonthBtn = page.locator('.react-calendar__navigation__arrow ', { hasText: '›' });

    const monthToSelect = 'June 2025'

    while(await month.textContent() !== monthToSelect){
        await nextMonthBtn.click();
        await month.waitFor();
    }

   await page.waitForTimeout(10000);


});

test('Browser Context Test', async ({page}) => {
    
     await page.goto("https://www.easemytrip.com/");
     console.log(await page.title())
     await expect(page).toHaveTitle("EaseMyTrip.com - Book Flights, Hotels, Holidays, Bus & Train Tickets")
 
 });