import {test as base, expect} from '@playwright/test'
import { SearchResultPage } from '../pages/SearchResult';
import * as csv from '@fast-csv/parse';

const test = base.extend<{ search: SearchResultPage }>({
    search: async ({ page }, use) => {
      const search = new SearchResultPage(page);   
      await search.gotoIndexPage() 
      await use(search)
    },
  });
test.describe("Test Search Product by name",() => {  
    test("Search the product by name and product should be displayed", async ({ search,page },testInfo) => { 
   
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
        await search.gotoIndexPage()
        await search.SearchProductByName(output[0][0])
        await search.verifyUrl(output[0][0])   
        await search.VerifyDisplayProduct(output[0][0])
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });
    })
})