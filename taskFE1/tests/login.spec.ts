import { test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const valid_username = 'standard_user';
const valid_password = 'secret_sauce';
const invalid_username = 'not_standard';
const invalid_password= 'invalid';

let loginPage: LoginPage;

test.describe('Login page test', () => {
    test.beforeEach( async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.visit('https://www.saucedemo.com');    
})

test('User logs with valid username and valid password, login sucessfull test', async ()=>{
    // Basic correct behavior, the main functionality
    await loginPage.writeUsername(valid_username);
    await loginPage.writePassword(valid_password);
    await loginPage.submitLogin();
    await loginPage.expectUserLogged();
})

test('User logs with valid username and invalid password , login failed test', async ()=>{
     // Test of correct behavior, the main functionality - not allow login without valid complete credentials
     // error message test
    await loginPage.writeUsername(valid_username);
    await loginPage.writePassword(invalid_password);
    await loginPage.submitLogin();
    await loginPage.expectWrongCredentials();
})

test('User logs with invalid username and valid password , login failed test', async ()=>{
    // Test of correct behavior, the main functionality - not allow login without valid and complete requiered credentials,
    // error message test
    await loginPage.writeUsername(invalid_username);
    await loginPage.writePassword(valid_password);
    await loginPage.submitLogin();
    await loginPage.expectWrongCredentials();
})

test('User logs with empty username and empty password,click on login button, login failed test', async ()=>{
    // Test of correct behavior, the main functionality - not allow login without valid and complete requiered credentials,
    // error message test
    await loginPage.submitLogin();
    await loginPage.expectMissingUsername();
})

test('User logs with valid username and empty password,click on login button, login failed test', async ()=>{
    // Test of correct behavior, the main functionality - not allow login without valid and complete requiered credentials,
    // error message test
    await loginPage.writeUsername(valid_username);
    await loginPage.submitLogin();
    await loginPage.expectMissingPassword();
})

});
