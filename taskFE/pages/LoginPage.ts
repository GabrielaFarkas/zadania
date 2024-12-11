import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    public username: Locator;
    public password: Locator;
    public loginButton: Locator;
    public errorMessage: Locator;
    public errorMessageBoxColor: Locator;
    private inventoryUrl: string;

    constructor(page: Page) {
        super(page);

        this.username = page.getByTestId('username');
        this.password = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
        this.errorMessageBoxColor = page.locator(
            'div.error-message-container.error'
        );
        this.inventoryUrl = 'https://www.saucedemo.com/inventory.html';
    }

    private async expectErrorMessageBoxColor(): Promise<void> {
        await expect(this.errorMessageBoxColor).toHaveCSS(
            'background-color',
            'rgb(226, 35, 26)'
        );
    }

    public async visit(url: string): Promise<void> {
        await this.page.goto(url);
    }

    public async writeUsername(text: string): Promise<void> {
        await this.username.fill(text);
    }

    public async writePassword(text: string): Promise<void> {
        await this.password.fill(text);
    }

    public async submitLogin(): Promise<void> {
        await this.loginButton.click();
    }

    public async expectUserLogged(): Promise<void> {
        await expect(this.page).toHaveURL(this.inventoryUrl);
    }

    public async expectWrongCredentials(): Promise<void> {
        await expect(this.page).not.toHaveURL(this.inventoryUrl);
        await this.expectErrorMessageBoxColor();
        await expect(this.errorMessage).toHaveText(
            'Epic sadface: Username and password do not match any user in this service'
        );
    }

    public async expectMissingUsername(): Promise<void> {
        await expect(this.page).not.toHaveURL(this.inventoryUrl);
        await this.expectErrorMessageBoxColor();
        await expect(this.errorMessage).toHaveText(
            'Epic sadface: Username is required'
        );
    }

    public async expectMissingPassword(): Promise<void> {
        await expect(this.page).not.toHaveURL(this.inventoryUrl);
        await this.expectErrorMessageBoxColor();
        await expect(this.errorMessage).toHaveText(
            'Epic sadface: Password is required'
        );
    }
}
