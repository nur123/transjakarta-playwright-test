import { test } from './fixtures';
import { expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';
import fs from 'node:fs';
import path from 'node:path';
import { WebTablesPage, User } from '../pages/WebTablesPage';

const csvPath = path.join(__dirname, '../data/users.csv');

const users: User[] = parse(
  fs.readFileSync(csvPath, 'utf-8'),
  {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }
);

test.describe('Bulk Insert Users - DemoQA Web Tables', () => {
  test('should insert all users from CSV and verify table data', async ({ page }) => {
    const webTables = new WebTablesPage(page);

    await webTables.open();

    await expect(
      page.getByRole('heading', { name: 'Web Tables' })
    ).toBeVisible();

    // Tambahkan semua user dari CSV.
    for (const user of users) {
      await test.step(`Add user: ${user.Email}`,async () => {
          await webTables.addUser(user);
        }
      );
    }

    // Verifikasi semua user setelah proses insert selesai
    for (const user of users) {
      await test.step(`Verify user: ${user.Email}`, async () => {
          await webTables.verifyUserExists(user);
        }
      );
    }

    // Bersihkan filter pencarian
    await page.locator('#searchBox').clear();
  });
});

// Screenshot otomatis setelah setiap test selesai
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'passed') {
    const screenshotDir = path.join(
      process.cwd(),
      'artifacts',
      'screenshots'
    );

    fs.mkdirSync(screenshotDir, { recursive: true });

    await page.screenshot({
      path: path.join(
        screenshotDir,
        'bulk-insert-success.png'
      ),
      fullPage: true,
    });
  }
});