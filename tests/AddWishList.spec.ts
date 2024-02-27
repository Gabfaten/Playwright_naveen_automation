import {test as base, expect} from '@playwright/test'
import { AddToWishList } from '../pages/AddToWishList';

const test = base.extend<{ addToWish: AddToWishList }>({
    addToWish: async ({ page }, use) => {
      const addToWish = new AddToWishList(page);      
      await use(addToWish)
    },
  });
  test.describe("Test Add product to Wish List",() => { 
    test.use({
      storageState:'AuthorAuth.json'
  });      
  test.beforeEach(async({ page }) => {
      await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login"); 
      //login steps in global-config 
  });
  test("The product should be added to wish List", async ({ addToWish,page },testInfo) => { 
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
    await addToWish.ClickOnAddToWishList()   
    await addToWish.ClickOnWhishList()
    await addToWish.VerifyUrl()
    await addToWish.CheckProduct()
    await page.screenshot({          
      path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
   });  

  })
  test("Product should be removed from Wish list", async ({ addToWish,page },testInfo) => { 
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
    await addToWish.ClickOnAddToWishList()
    await addToWish.ClickOnWhishList()
    await addToWish.VerifyUrl()       
    await addToWish.RemoveProduct()    
    await addToWish.VerifyProductRemoved() 
    await page.screenshot({          
      path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
    });    
  })

  })