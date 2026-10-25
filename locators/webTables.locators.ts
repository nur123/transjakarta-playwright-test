import { Page } from '@playwright/test';

export class WebTablesLocators {
  constructor(private page: Page) {}

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  get firstName() {
    return this.page.locator('#firstName');
  }

  get lastName() {
    return this.page.locator('#lastName');
  }

  get email() {
    return this.page.locator('#userEmail');
  }

  get age() {
    return this.page.locator('#age');
  }

  get salary() {
    return this.page.locator('#salary');
  }

  get department() {
    return this.page.locator('#department');
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  get searchBox() {
    return this.page.locator('#searchBox');
  }

  get tableRows() {
    return this.page.locator('tbody tr');
  }

  get registrationForm() {
    return this.page.locator('#userForm');
  }
}