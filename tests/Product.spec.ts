import {test as base, expect} from '@playwright/test'
import { Product } from '../pages/Product';
import * as csv from '@fast-csv/parse';


const test = base.extend<{ product: Product }>({
    product: async ({ page }, use) => {
      const product = new Product(page);      
      await use(product)
    },
  });
  test.describe("Test Add review to product",() => { 
    test.use({
      storageState:'AuthorAuth.json'
    });      
    test.beforeEach(async({ page }) => {
        await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login"); 
        //login steps in global-config 
    });
  test("Add review to product", async ({ product,page },testInfo) => { 
    let myobject :any = new Promise((resolve)=>{
        let dataArray:JSON[] =[];
        csv
        .parseFile("./fixtures/Product.csv", {headers:false})
        .on("data",(data)=>{
          dataArray.push(data);
        })
        .on("end",()=>{
          resolve(dataArray);
         })
      })
    let output=await myobject; 

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
    await product.ClickOnProductLink();  
    await product.ClickOnReview();   
    await product.verifyReviewTitle();  
    await product.FillFormReview(output[1][0]);  
    
    const Selector = '.alert-success';
    const success_msg = await page.textContent(Selector);
    await expect(success_msg)
    .toContain('Thank you for your review. It has been submitted to the webmaster for approval.');

    await page.screenshot({          
        path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
    });  

  })
})