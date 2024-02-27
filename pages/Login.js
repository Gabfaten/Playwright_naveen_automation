import { expect } from '@playwright/test';
export class LoginPage {

    constructor(page) {
        this.page = page;
        this.email_textbox = page.locator("#input-email")
        this.password_textbox = page.locator("#input-password")
        this.login_button = page.locator('//input[@value="Login"]')       
    }
    async gotoLoginPage() {
        await this.page.goto("https://naveenautomationlabs.com/opencart"); 
        await this.page.waitForSelector('//*[@id="top-links"]/ul/li[2]/a/span[1]', { visible: true })   
        await this.page.click('//*[@id="top-links"]/ul/li[2]/a/span[1]')
        await this.page.waitForSelector('ul.dropdown-menu > li:nth-child(2) > a', { visible: true }) 
        await this.page.click('ul.dropdown-menu > li:nth-child(2) > a')
    }
    async Login(email, password) {
        await this.email_textbox.fill(email)
        await this.password_textbox.fill(password)
        await this.login_button.click()       
    }
    async ClickOnMyAccount(){
        //click my account
        await this.page.waitForSelector('//*[@id="top-links"]/ul/li[2]/a/span[1]', { visible: true })   
        await this.page.click('//*[@id="top-links"]/ul/li[2]/a/span[1]')
    }
    async ClickOnLogOut(){         
        await this.ClickOnMyAccount()
        // click on Logout
        await this.page.waitForSelector('#top-links > ul > li.dropdown.open > ul > li:nth-child(5) > a', { visible: true }) 
        await this.page.click('#top-links > ul > li.dropdown.open > ul > li:nth-child(5) > a')
    }
    async VerifyLogOutUrl(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/logout')  
    }
    async Logout() { 
        await this.page.locator('.btn-primary').click();
        //login should be visible       
        await this.ClickOnMyAccount()
        const login= this.page.locator('ul.dropdown-menu > li:nth-child(2) > a')
        await expect(login).toBeVisible() 
    } 
    async checkforgotPswdLink() {
        await this.page.locator('#content > div > div:nth-child(2) > div > form > div:nth-child(2) > a').click();
    } 
    async getForgotPwdPageUrl(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten')  
    }
    async SubmitEmail(email){
        await this.page.locator('#input-email').fill(email);
        await this.page.locator('//input[@value="Continue"]').click(); 
    }
     
    async ClickOnChangeYourPassword(){
        await this.page.waitForSelector('#content > ul:nth-child(2) > li:nth-child(2) > a', { visible: true }) 
        await this.page.click('#content > ul:nth-child(2) > li:nth-child(2) > a'); 
    } 
    async VerifyChangePswdUrl(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/password');    
    }
    async FillForm(pswd,Confirm_pswd){
        await this.page.locator('#input-password').fill(pswd);
        await this.page.locator('#input-confirm').fill(Confirm_pswd);
    }
    async ClickOnContinueBtn(){
        this.page.locator('//input[@value="Continue"]').click();
    }
    async VerifyPasswordChanged(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account');       

         const message = this.page.locator('text=  Success: Your password has been successfully updated.');    
         await expect(message).toBeVisible();
    }
    async TryLogin(email,password){
        const errorMessageSelector = '.alert-danger';

        for (let i = 0; i < 2; i++) {
            await this.email_textbox.fill(email)
            await this.password_textbox.fill(password)
            await this.login_button.click() 
            await this.page.waitForSelector(errorMessageSelector);
        }
        const errorMessageText = await this.page.textContent(errorMessageSelector);
        await expect(errorMessageText)
        .toContain('Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.');

    }
   
}