import {test as base, expect} from '@playwright/test'
import { LoginPage } from '../pages/Login';
import * as csv from '@fast-csv/parse';
import { writeToPath } from 'fast-csv';
    
    const test = base.extend<{ login: LoginPage }>({
        login: async ({ page }, use) => {
          const login = new LoginPage(page);   
          await login.gotoLoginPage() 
          await use(login)
        },
      });
   
test.describe("Test Login  through naveenautomationlabs",() => {   
    test("Should be able to login  using valid credentials @Smoke", async ({ login, page},testInfo) => { 
               
        let myobject :any = new Promise((resolve)=>{
            let dataArray:JSON[] =[];
            csv
            .parseFile("./fixtures/DataUser.csv", {headers:false})
            .on("data",(data)=>{
              dataArray.push(data);
            })
            .on("end",()=>{
              resolve(dataArray);
             })
          })
        let output=await myobject; 

        const user_email= output[2][0]
        const user_paswd= output[2][1]
       
        await login.Login(user_email,user_paswd)
        await page.waitForTimeout(5000) 
        const url = await page.url();
        await expect(page)
        .toHaveURL('https://naveenautomationlabs.com/opencart/index.php?route=account/account'); 

        await page.screenshot({           
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });
    })

    test("Should not be able to login  using incorrect credentials @Smoke", async ({ login,page },testInfo) => { 
        const user_email= 'test@yahoo.fr'
        const invalid_passwd= '12356'
        await login.Login(user_email,invalid_passwd);    
        const alert = page.locator('text=Warning: No match for E-Mail Address and/or Password.'); 
        await expect(alert).toBeVisible();
         await page.screenshot({        
           path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
       });
    })
    test("Should be able to logout @Smoke", async ({ login,page },testInfo) => { 
        const user_email= 'gabFat@gmail.com'
        const user_passwd= '1234'
        await login.Login(user_email,user_passwd);    
        await login.ClickOnLogOut();
        await login.VerifyLogOutUrl();
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });
        await login.Logout();       
    })
    test("Should be able to have a password reset link by e-mail @Smoke", async ({ login,page },testInfo) => { 
        const user_email= 'gabFat@gmail.com'
        await login.checkforgotPswdLink();
        await login.getForgotPwdPageUrl();
        await login.SubmitEmail(user_email);
        const sucess_alert = page.locator('text= An email with a confirmation link has been sent your email address.'); 
        await expect(sucess_alert).toBeVisible();  
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });  
    })

    test("Should not be able to have a password reset link when enter invalid email @Smoke", async ({ login,page },testInfo) => {
        const invalid_email= 'gabouch.fr'
        await login.checkforgotPswdLink();
        await login.getForgotPwdPageUrl();
        await login.SubmitEmail(invalid_email);
        const alert_danger = page.locator('text=  Warning: The E-Mail Address was not found in our records, please try again!'); 
        await expect(alert_danger).toBeVisible();  
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });  
    })
    test("Should not be able to change password @Smoke", async ({ login,page },testInfo) => { 
                
        let myobject :any = new Promise((resolve)=>{
            let dataArray:JSON[] =[];
            csv
            .parseFile("./fixtures/DataUser.csv", {headers:false})
            .on("data",(data)=>{
              dataArray.push(data);
            })
            .on("end",()=>{
              resolve(dataArray);
             })
          })
        let output=await myobject; 
        await login.Login(output[1][0], output[1][1]); 
        await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/account"); 
        await login.ClickOnChangeYourPassword();
        await login.VerifyChangePswdUrl() 
        //confirm password not equal to new password 
        await login.FillForm(output[1][1],output[1][2])
        await login.ClickOnContinueBtn()
        const message = page.locator('text= Password confirmation does not match password!');    
        await expect(message).toBeVisible();
        await page.waitForTimeout(5000) 
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        }); 
    })

    test("Should be able to change password @Smoke", async ({ login,page }, testInfo) => {                
        let myobject :any = new Promise((resolve)=>{
            let dataArray:JSON[] =[];
            csv
            .parseFile("./fixtures/DataUser.csv", {headers:false})
            .on("data",(data)=>{
              dataArray.push(data);
            })
            .on("end",()=>{
              resolve(dataArray);
             })
          })
        let output=await myobject; 

        await login.Login(output[0][0], output[0][1]); 
        await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/account"); 
        await login.ClickOnChangeYourPassword();
        await login.VerifyChangePswdUrl()        
        const pswd= output[1][2];
        const Confirm= output[1][2];       
        console.log('pswd',pswd)
        await login.FillForm(pswd, Confirm);
        await login.ClickOnContinueBtn()
        await login.VerifyPasswordChanged()
        await page.waitForTimeout(5000) 
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
         });  

    })
    test("Should not be able to login when Your account has exceeded allowed number of login attempts",
     async ({ login,page }, testInfo) => {     
        const email= 'gabouch_faten@hotmail.fr'
        const passwd= '123456'
        await login.TryLogin(email,passwd); 
        await page.screenshot({          
            path: `screenshots/${testInfo.title.replace(" ","_")}.png` 
        });

    })


})