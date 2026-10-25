import { test } from './fixtures';
import { expect } from '@playwright/test';
import { StudentRegistrationPage } from '../pages/StudentRegistrationPage';

test.describe('Student Registration Form', () => {
  test('should submit the form and verify confirmation data', async ({ page }) => {
    test.setTimeout(60000);

    const registrationPage = new StudentRegistrationPage(page);

    await registrationPage.open();
    await registrationPage.fillForm();
    await registrationPage.verifyConfirmation();
  });
});