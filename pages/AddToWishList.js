import { expect } from '@playwright/test';

export class  AddToWishList {
    constructor(page) {
        this.page = page;      
             
    }
  async ClickOnAddToWishList(){
     //click on add to whish list button
   this.page.waitForSelector('#content > div.row > div:nth-child(1) > div > div.button-group > button:nth-child(2)',{ visible: true });
   await this.page.click('#content > div.row > div:nth-child(1) > div > div.button-group > button:nth-child(2)')
   this.VerifyProductAddedToWishList()
  }

  async VerifyProductAddedToWishList(){
    const successAlertSelector = '.alert-success';
    // wait the element to be present in DOM
    await this.page.waitForSelector(successAlertSelector);
    // wait the element to be visible
    const successAlert = await this.page.locator(successAlertSelector);
    await expect(successAlert).toBeVisible({ timeout: 5000 });
  } 

  async ClickOnWhishList(){
    //click on cart button
    await this.page.waitForSelector('#wishlist-total', { visible: true });  
    await this.page.click('#wishlist-total');   
 }  
 async VerifyUrl(){
    const url = await this.page.url()
    await expect(this.page)
    .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist'); 
           
}  
async CheckProduct(){
    const initialProduct = await this.page.waitForSelector('//*[@id="content"]/div[1]/table/tbody/tr');
    expect(initialProduct).not.toBeNull();
}
async RemoveProduct(){  
    const initialProduct = await this.page.waitForSelector('//*[@id="content"]/div[1]/table/tbody/tr');
    expect(initialProduct).not.toBeNull();
    //click on Remove Button
    await this.page.waitForSelector('//*[@id="content"]/div[1]/table/tbody/tr/td[6]/a')
    await this.page.click('//*[@id="content"]/div[1]/table/tbody/tr/td[6]/a')
    // wait the product to be removed 
    await this.page.waitForSelector('//*[@id="content"]/div[1]/table/tbody/tr', { state: 'hidden' });
    // check if the product was deleted
    const deletedProduct = await this.page.waitForSelector('//*[@id="content"]/div[1]/table/tbody/tr', { state: 'hidden' });
    expect(deletedProduct).toBeNull() 
}
async VerifyProductRemoved(){
    const message = this.page.locator('text= Success: You have modified your wish list!');    
    await expect(message).toBeVisible();
}
 
 
}