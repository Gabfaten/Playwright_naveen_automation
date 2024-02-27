import { expect } from '@playwright/test';

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.firstname_textbox = page.locator("#input-firstname")
        this.lastname_textbox = page.locator("#input-lastname")
        this.email_textbox = page.locator("#input-email")
        this.tel_textbox = page.locator("#input-telephone")
        this.pswd_textbox = page.locator("#input-password")
        this.Confirm_textbox = page.locator("#input-confirm")
        this.agreeCheckbox = page.locator('input[name="agree"]')       
        this.ContinueBtn = page.locator('//input[@value="Continue"]')       
        this.ContinueBtnTwo= page.locator('a.btn-primary')     
    }
    async gotoSignUpPage() {
        await this.page.goto("https://naveenautomationlabs.com/opencart/")        
        await this.page.waitForSelector('//*[@id="top-links"]/ul/li[2]/a/span[1]', { visible: true })   
        await this.page.click('//*[@id="top-links"]/ul/li[2]/a/span[1]')
        await this.page.waitForSelector('ul.dropdown-menu > li:nth-child(1) > a', { visible: true }) 
        await this.page.click('ul.dropdown-menu > li:nth-child(1) > a')
    }
    async Register(firstname, lastname, email, tel, pswd, confirm){
        await this.FillForm(firstname, lastname, email, tel, pswd, confirm)
        await this.VerifyAccountSuccess()
        await this.ContinueBtnTwo.click()
    }
    async FillForm(firstname, lastname, email, tel, pswd, confirm) {      
        await this.firstname_textbox.fill(firstname)
        await this.lastname_textbox.fill(lastname)
        await this.email_textbox.fill(email)
        await this.tel_textbox.fill(tel)
        await this.pswd_textbox.fill(pswd)
        await this.Confirm_textbox.fill(confirm)
        await this.agreeCheckbox.check();
        await this.ContinueBtn.click();  
    }
    async VerifyAccountSuccess(){ 
        const title = this.page.locator('text=Your Account Has Been Created!'); 
        await expect(title).toBeVisible();       
    }
    async ClickOnContinue(){
        await this.ContinueBtnTwo.click(); 
    }
    async VerifyLogoutLink(){
      //logout link 
      await this.page.locator('//*[@id="top-links"]/ul/li[2]/a/span[1]').click();
      const logout= this.page.locator('ul.dropdown-menu > li:nth-child(5) > a')
      await expect(logout).toBeVisible(); 
    }
    
    async VerifyError(){ 
        const message = this.page.locator('text= Warning: E-Mail Address is already registered!'); 
        await expect(message).toBeVisible();
    }
}