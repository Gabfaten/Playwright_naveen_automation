import { expect } from '@playwright/test';

export class  AddToCartPage {
    constructor(page) {
        this.page = page;        
        this.unit_price = page.locator('//*[@id="content"]/form/div/table/tbody/tr/td[5]')
        this.total_price = page.locator('//*[@id="content"]/form/div/table/tbody/tr/td[6]')       
    }
    async ClickOnAddToCart(){
        //click on add to cart 
        this.page.waitForSelector('//*[@id="content"]/div[2]/div[1]/div/div[3]/button[1]/span', { visible: true });
        this.page.click('//*[@id="content"]/div[2]/div[1]/div/div[3]/button[1]/span');
        this.VerifyProductAddedTocart();   
    }
    async VerifyProductAddedTocart(){
        const selector = '.alert-success';
       // wait the element to be present in DOM
       await this.page.waitForSelector(selector);      
       const successAlertText = await this.page.textContent(selector);      
      expect(successAlertText).toContain('Success: You have added');
    } 
    async ClickOnviewCart(){
         //click on cart button
         await this.page.waitForSelector('#cart-total', { visible: true });  
         await this.page.click('#cart-total');         
         //click on view cart 
         await this.page.waitForSelector('//*[@id="cart"]/ul/li[2]/div/p/a[1]', { visible: true });
         await this.page.click('//*[@id="cart"]/ul/li[2]/div/p/a[1]');
    }
    async VerifyUrl(){
        const url = await this.page.url()
        await expect(this.page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart'); 
    }   
    async GetUnitPrice(){
        const priceText = await this.unit_price.innerText();
        const priceWithoutCurrency = priceText.replace(/[^\d.,]/g, '');
        const price = parseFloat(priceWithoutCurrency.replace(',', '.')); 
        return price;
    }
    async GetTotalPrice(){
        const TotalpriceText = await this.total_price.innerText();
        const totalPrice = TotalpriceText.replace(/[^\d.,]/g, '');
        const totalPr = parseFloat(totalPrice.replace(',', '.'));
        return totalPr;
    }
    async VerifyTotalPrice(){
        const qtyElement = this.page.locator('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/input');   
        if (qtyElement) {
            const qty = await qtyElement.getAttribute('value');
            console.log('Qte',qty);       
        } else {
            console.log('Qte not Found');
        }   
        const qte = parseFloat(await qtyElement.getAttribute('value'));
        const unitprice= await this.GetUnitPrice();
        const Totalprice_actual = await this.GetTotalPrice();
        const expected_totprice= parseFloat(unitprice*qte);        
        console.log('float qte',qte)
        console.log('Totalprice_actual',Totalprice_actual)
        console.log('expected_totprice',expected_totprice)
        await expect(expected_totprice).toEqual(Totalprice_actual); 
    }
    async RemoveProduct(){  
        const initialProduct = await this.page.waitForSelector('//*[@id="content"]/form/div/table/tbody/tr');
        expect(initialProduct).not.toBeNull();
        //click on Remove Button
        await this.page.waitForSelector('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/span/button[2]')
        await this.page.click('//*[@id="content"]/form/div/table/tbody/tr/td[4]/div/span/button[2]')
        // wait the product to be removed 
        await this.page.waitForSelector('//*[@id="content"]/form/div/table/tbody/tr[1]', { state: 'hidden' });
        // check if the product was deleted
        const deletedProduct = await this.page.waitForSelector('//*[@id="content"]/form/div/table/tbody/tr[1]', { state: 'hidden' });
        expect(deletedProduct).toBeNull() 
    }
   

}