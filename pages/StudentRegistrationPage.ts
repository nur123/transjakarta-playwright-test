
import { Page, expect } from '@playwright/test';
import { StudentRegistrationLocators } from '../locators/studentRegistration.locators';

export class StudentRegistrationPage {
  private locators: StudentRegistrationLocators;

  constructor(private page: Page) {
    this.locators = new StudentRegistrationLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto(
      'https://demoqa.com/automation-practice-form',
      { waitUntil: 'domcontentloaded', timeout: 60000 }
    );

    await expect(this.locators.firstName).toBeVisible();
  }

  async fillForm(): Promise<void> {
    await this.locators.firstName.fill('Nur');
    await this.locators.lastName.fill('Tester');
    await this.locators.email.fill('nur.tester@example.com');
    await this.locators.maleGender.click();
    await this.locators.mobile.fill('0812345678');

    // Set date of birth
    await this.locators.dateOfBirth.fill('15 May 2000');
    await this.locators.dateOfBirth.press('Enter');

    await this.locators.hobbiesSports.click();
    await this.locators.currentAddress.fill(
      'Jakarta, Indonesia'
    );

    // Select State and City
    await this.locators.stateInput.click();
    await this.page.getByText('NCR', { exact: true }).click();

    await this.locators.cityInput.click();
    await this.page.getByText('Delhi', { exact: true }).click();

    await this.locators.submitButton.scrollIntoViewIfNeeded();
    await this.locators.submitButton.click();
  }

  async verifyConfirmation(): Promise<void> {
    await expect(this.locators.confirmationModal).toBeVisible();

    await expect(this.locators.confirmationTitle)
      .toHaveText('Thanks for submitting the form');

    const expectedRows = [
      ['Student Name', 'Nur Tester'],
      ['Student Email', 'nur.tester@example.com'],
      ['Gender', 'Male'],
      ['Mobile', '0812345678'],
      ['Date of Birth', '15 May,2000'],
      ['Hobbies', 'Sports'],
      ['Address', 'Jakarta, Indonesia'],
      ['State and City', 'NCR Delhi'],
    ];

    for (const [label, value] of expectedRows) {
      const row = this.locators.confirmationRows.filter({
        has: this.page.locator('td').nth(0).getByText(label, {
          exact: true,
        }),
      });

      await expect(row).toContainText(value);
    }
  }
}