
import { Page } from '@playwright/test';

export class StudentRegistrationLocators {
  constructor(private page: Page) {}

  get firstName() {
    return this.page.locator('#firstName');
  }

  get lastName() {
    return this.page.locator('#lastName');
  }

  get email() {
    return this.page.locator('#userEmail');
  }

  get maleGender() {
    return this.page.locator('label[for="gender-radio-1"]');
  }

  get mobile() {
    return this.page.locator('#userNumber');
  }

  get dateOfBirth() {
    return this.page.locator('#dateOfBirthInput');
  }

  get hobbiesSports() {
    return this.page.locator('label[for="hobbies-checkbox-1"]');
  }

  get currentAddress() {
    return this.page.locator('#currentAddress');
  }

  get stateInput() {
    return this.page.locator('#state');
  }

  get cityInput() {
    return this.page.locator('#city');
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  get confirmationModal() {
    return this.page.locator('.modal-content');
  }

  get confirmationTitle() {
    return this.page.locator('#example-modal-sizes-title-lg');
  }

  get confirmationRows() {
    return this.page.locator('.modal-content tbody tr');
  }
}