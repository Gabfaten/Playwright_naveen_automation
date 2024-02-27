import {expect,webkit} from '@playwright/test'

async function glabalConfig(){
      
    //objectif:creer json file
    const browser = await webkit.launch();

    const page = await browser.newPage(); 
    //login steps   
    await page.setDefaultNavigationTimeout(60000);     
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");    
    await page.locator("#input-email").fill('gabFat@gmail.com');
    await page.locator('#input-password').fill('1234'); 
    await page.locator('//input[@value="Login"]').click(); 

    //creer file json systematiquement on root
    await page.context().storageState({
        path:'AuthorAuth.json'
    })  

}
export default glabalConfig;