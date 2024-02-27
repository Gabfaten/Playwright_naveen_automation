import { expect } from '@playwright/test';

export class  OrderPage {
    constructor(page) {
        this.page = page; 
        this.firstName= page.locator('#input-payment-firstname');
        this.lastName= page.locator('#input-payment-lastname');
        this.adress= page.locator('#input-payment-address-1');
        this.city= page.locator('#input-payment-city');
        this.postcode= page.locator('#input-payment-postcode');       
        this.state= page.locator('select[name="zone_id"]');//3303        
        this.continueBtn = page.locator('#button-payment-address') 
        this.paymentBtn = page.locator('#button-payment-method')
        this.agreeCheckbox = page.locator('//input[@name="agree"]')
        this.ConfirmOrderBtn = page.locator('#button-confirm')
        this.CheckoutSucess_continue = page.locator('//*[@id="content"]/div/div/a')
    }
    async clickOnCheckOut(){
        this.page.waitForSelector('#top-links > ul > li:nth-child(5) > a', { visible: true });
        this.page.click('#top-links > ul > li:nth-child(5) > a');
    }
    async verifyUrl(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout');                 
    }
    async ClickOnBillingDetails(){
        await this.page.waitForSelector('//*[@id="accordion"]/div[2]', { visible: true });
        await this.page.click('//*[@id="accordion"]/div[2]');
    }
    async FillForm(firstname,lastname,adr1,city,postcode,country,state){
     //Billing detail-> I want to use a new address
      await this.page.locator('input[type="radio"][name="payment_address"][value="new"]').check()
      await this.firstName.fill(firstname)
      await this.lastName.fill(lastname)
      await this.adress.fill(adr1)
      await this.city.fill(city)
      await this.postcode.fill(postcode)
      await  this.page.locator('select[name="country_id"]')
                      .selectOption({ value: `${country}` });
      await this.page.locator('select[name="zone_id"]')
                     .selectOption({ value: `${state}` });
    }
    async ClickOnContinueBtn(){
        //click on 'button-payment-address'
        await this.continueBtn.click(); 
    }
    async ClickOnshippingAdrBtn(){       
        await this.page.locator('#button-shipping-address').click()  
    }
    async clickOnBtnShippingMethod(){
          await this.page.locator('#button-shipping-method').click()  
    }
    async ClickOnPaymentMethodBtn(){
        await this.paymentBtn.click();  
    }
    async CheckTheTerms(){
        await this.agreeCheckbox.check();
    }
   async clickOnconfirmOrderBtn(){
     await this.ConfirmOrderBtn.click();
    }
    async validateConfirmMessage(){
        const message = this.page.locator('text= Your order has been placed!');    
        await expect(message).toBeVisible();
    }
    async ClickOnContinue_CheckoutSuccess(){
      await this.CheckoutSucess_continue.click();
    }

}