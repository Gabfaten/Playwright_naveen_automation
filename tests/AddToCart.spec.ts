import {test as base, expect} from '@playwright/test'
import { AddToCartPage } from '../pages/AddToCart';

const test = base.extend<{ addTocart: AddToCartPage }>({
    addTocart: async ({ page }, use) => {
      const addTocart = new AddToCartPage(page);   
      await use(addTocart)
    },
  });
  test.describe("Test Add product to cart",() => {  
    test.use({
        storageState:'AuthorAuth.json'
   });  

    test.beforeEach('@regression',async({ page }) => {
        await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login"); 
        //login steps in global-config 
    });

    test("The product should be added to cart @regression", async ({ addTocart,page },testInfo) => { 
      await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
      await addTocart.ClickOnAddToCart()
      await addTocart.ClickOnviewCart()       
      await addTocart.VerifyUrl()      
      await addTocart.VerifyTotalPrice()   
      await page.screenshot({          
        path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
     });  
    })
    test("Product should be removed from cart", async ({ addTocart,page },testInfo) => { 
      await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
      await addTocart.ClickOnAddToCart()
      await addTocart.ClickOnviewCart()   
      await addTocart.VerifyUrl()         
      await addTocart.RemoveProduct()     
      await page.screenshot({          
        path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
      });    
    })
   
  })