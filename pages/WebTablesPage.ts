
import { Page, expect } from '@playwright/test';
import { WebTablesLocators } from '../locators/webTables.locators';

export interface User {
  'First Name': string;
  'Last Name': string;
  Email: string;
  Age: string;
  Salary: string;
  Department: string;
}

export class WebTablesPage {
  private locators: WebTablesLocators;

  constructor(private page: Page) {
    this.locators = new WebTablesLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto('https://demoqa.com/webtables');
    await expect(this.locators.addButton).toBeVisible();
  }

  async addUser(user: User): Promise<void> {
    // Bersihkan filter pencarian sebelum menambahkan user baru
    await this.locators.searchBox.clear();

    await this.locators.addButton.click();
    await expect(this.locators.firstName).toBeVisible();

    await this.locators.firstName.fill(user['First Name']);
    await this.locators.lastName.fill(user['Last Name']);
    await this.locators.email.fill(user.Email);
    await this.locators.age.fill(user.Age);
    await this.locators.salary.fill(user.Salary);
    await this.locators.department.fill(user.Department);

    await this.locators.submitButton.click();

    // Pastikan form registrasi tertutup
    await expect(this.locators.registrationForm).toBeHidden();

  }

  async verifyUserExists(user: User): Promise<void> {
    await this.locators.searchBox.fill(user.Email);

  console.log(
  'Table-like elements:',
  await this.page.locator('[role="row"], table, .rt-table').count()
);

console.log(
  'Email element count:',
  await this.page.getByText(user.Email, { exact: true }).count()
);

  
    const matchingRow = this.locators.tableRows.filter({
    has: this.page.locator('td').getByText(user.Email, {
      exact: true,
    }),
  });

  await expect(matchingRow).toHaveCount(1);

  const cells = matchingRow.locator('td');

  await expect(cells.nth(0)).toHaveText(user['First Name']);
  await expect(cells.nth(1)).toHaveText(user['Last Name']);
  await expect(cells.nth(2)).toHaveText(user.Age);
  await expect(cells.nth(3)).toHaveText(user.Email);
  await expect(cells.nth(4)).toHaveText(user.Salary);
  await expect(cells.nth(5)).toHaveText(user.Department);
 }
}