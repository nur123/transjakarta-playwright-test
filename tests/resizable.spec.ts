import { test } from './fixtures';
import { expect } from '@playwright/test';
import { ResizablePage } from '../pages/ResizablePage';

test.describe('Resizable - Resize Element', () => {
  test('should resize element to 400 x 200 pixels', async ({ page }) => {
    const resizablePage = new ResizablePage(page);

    await resizablePage.open();
    await resizablePage.resizeTo(400, 200);
    await resizablePage.verifySize(400, 200);
  });
});