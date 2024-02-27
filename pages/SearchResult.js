import { expect } from '@playwright/test';

export class SearchResultPage {
    constructor(page) {
        this.page = page;
        this.search_textbox = page.locator("//input[@name='search']")
        this.search_btn = page.locator("#search > span > button")
    }
    async gotoIndexPage(){
        await this.page.goto("https://naveenautomationlabs.com/opencart"); 
    }
    async SearchProductByName(productName){
        await this.search_textbox.fill(productName)
        await this.search_btn.click()
    }
    async verifyUrl(productName){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL(`https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=${productName}`) 
    }  
    async VerifyDisplayProduct(productName){   
       // Find all the product elements on the page
        const productElements = await this.page.$$('.product-layout');
        // Check if each product element is visible
        for (const productElement of productElements) {
            const isVisible = await productElement.isVisible();
            // If the product element is not visible, the test will fail
            await expect(isVisible).toBe(true);
        }
    }
   


}