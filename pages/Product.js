import { expect } from '@playwright/test';

export class  Product {
    constructor(page) {
        this.page = page; 
       // this.name_textbox =  page.locator("#input-name")
        this.review_textbox = page.locator("#input-review")
        this.checkbox = page.locator("//input[@value='3']")
        this.continue_button = page.locator('//*[@id="button-review"]')   
    }
    async ClickOnProductLink(){
        //click on components menu 
        await this.page.waitForSelector('#menu > div.collapse.navbar-collapse.navbar-ex1-collapse > ul > li:nth-child(3) > a', { visible: true });  
        await this.page.click('#menu > div.collapse.navbar-collapse.navbar-ex1-collapse > ul > li:nth-child(3) > a');  
         //click on show all components menu 
        await this.page.waitForSelector('#menu > div.collapse.navbar-collapse.navbar-ex1-collapse > ul > li.dropdown.open > div > a', { visible: true });
        await this.page.click('#menu > div.collapse.navbar-collapse.navbar-ex1-collapse > ul > li.dropdown.open > div > a');
        //click on monitors
        await this.page.locator('#column-left > div.list-group > a:nth-child(5)').click()
        //click on product 'Apple Cinema 30'
        await this.page.waitForSelector('#content > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(2) > div.caption > h4 > a',
           { visible: true });
        await this.page.click('#content > div:nth-child(5) > div:nth-child(1) > div > div:nth-child(2) > div.caption > h4 > a')

    }
    async ClickOnReview(){
        await this.page.waitForSelector('#content > div:nth-child(1) > div.col-sm-8 > ul.nav.nav-tabs > li:nth-child(3) > a',
         { visible: true });  
        await this.page.click('#content > div:nth-child(1) > div.col-sm-8 > ul.nav.nav-tabs > li:nth-child(3) > a');
    } 
    async verifyReviewTitle(){       
        const Selector = 'h2';
        const title = await this.page.textContent(Selector);
        await expect(title)
        .toContain('Write a review');
    }
    async FillFormReview(text){
       // await this.name_textbox.fill();
        await this.review_textbox.fill(text);
        await this.checkbox.check();
        await this.continue_button.click();
    }
}