import { test as base } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

export const test = base;

test.afterEach(async ({ page }, testInfo) => {
  const status =
    testInfo.status === 'passed' ? 'PASS' : 'FAIL';

  const title = testInfo.title.replace(/[^a-z0-9-_]+/gi, '-');
  const dir = path.resolve('artifacts', 'screenshots');

  fs.mkdirSync(dir, { recursive: true });

  await page.screenshot({
    path: path.join(dir, `${title}-${status}.png`),
    fullPage: true,
  });
});
