import {test as base, expect} from '@playwright/test'
import * as csv from '@fast-csv/parse';
import { OrderPage } from '../pages/OrderPage';
import { AddToCartPage } from '../pages/AddToCart';

const test = base.extend<{ orderpage: OrderPage , addTocart: AddToCartPage }>({
    orderpage: async ({ page }, use) => {
      const orderpage = new OrderPage(page); 
      await use(orderpage)     
    },
    addTocart: async ({ page }, use) => {     
      const addTocart = new AddToCartPage(page);    
      await use(addTocart)    
    },
  });

  test.describe("Test checkout Process",() => {  
    test.use({
        storageState:'AuthorAuth.json'
   });  
   
    test.beforeEach('@regression',async({ page }) => {
        await page.setDefaultNavigationTimeout(60000);        
        await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login"); 
        //login steps in global-config 
    });
    test.skip("Order confirmation should  be done successfuly @regression", async ({ addTocart, orderpage, page},testInfo) => { 
                
      let myobject :any = new Promise((resolve)=>{
        let dataArray:JSON[] =[];
        csv
        .parseFile("./fixtures/RegisterData.csv", {headers:false})
        .on("data",(data)=>{
          dataArray.push(data);
        })
        .on("end",()=>{
          resolve(dataArray);
         })
      })
      let output=await myobject;  
      await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=common/home");
      await addTocart.ClickOnAddToCart(); 
      await page.waitForTimeout(3000)      
      await orderpage.clickOnCheckOut();
      await page.waitForTimeout(3000)      
      await orderpage.verifyUrl() 
      await page.waitForTimeout(3000) 
      //billing details   
      await orderpage.ClickOnBillingDetails();
      await page.waitForTimeout(3000) 
      await orderpage.FillForm(output[1][0],output[1][1],output[1][2],output[1][3],
        output[1][4],'214','3303');
      //click on 'button-payment-address'
      await orderpage.ClickOnContinueBtn();
      //delivery details
      await page.waitForTimeout(3000);
      //click on button-shipping-address
      await orderpage.ClickOnshippingAdrBtn();
      await page.waitForTimeout(3000); 
      //delivery method   
      //click on button-shipping-method
      await orderpage.clickOnBtnShippingMethod();
      // Payment Method 
      await orderpage.CheckTheTerms();
      //click on 'button-payment-method'
      await orderpage.ClickOnPaymentMethodBtn();      
      await page.waitForTimeout(3000);
     //confirm order
      await orderpage.clickOnconfirmOrderBtn();
      await orderpage.validateConfirmMessage();
      await orderpage.ClickOnContinue_CheckoutSuccess();
 
      await page.screenshot({          
        path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
     });  
    })
    
})