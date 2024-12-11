import { Page } from '@playwright/test';

export class BasePage {
    public page: Page;

    constructor (page:Page) {
     this.page = page;
    }

    public async visit (url: string): Promise <void> {
    await this.page.goto(url);
    }

}