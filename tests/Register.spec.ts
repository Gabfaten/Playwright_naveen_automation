import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/SignUp';
import * as csv from '@fast-csv/parse';

test.describe("Test Register user through naveenautomationlabs", () =>{

    test.skip("Should be able to signup through Account Form ", async ({ page },testInfo) => { 

        const signup = new SignUpPage(page);          

        let myarray :any = new Promise((resolve)=>{
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
          let output=await myarray;                
          await signup.gotoSignUpPage();     
          await signup.Register(output[0][0],
                          output[0][1],
                          output[0][2],
                          output[0][3],
                          output[0][4],
                          output[0][5]
                          ); 
          await signup.VerifyAccountSuccess();
          await signup.ClickOnContinue();
         await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
         }); 

         await signup.VerifyLogoutLink();
    });

    test("Should not be able to signup with existing email", async ({ page },testInfo) => { 
      const signup = new SignUpPage(page);
      const expectedtext="Your Account Has Been Created!" 
      const firstname='Fatoun'
      const email='gabFat@gmail.com'  
      
      await signup.gotoSignUpPage();     
      await signup.FillForm(firstname,
                      '',
                      email,
                      '',
                      '',
                      ''); 

      await signup.VerifyError();  
      await page.screenshot({          
        path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
     });     
    })
});