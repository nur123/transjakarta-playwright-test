
import { test } from './fixtures';
import { expect } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';

test.describe('Droppable - Drag and Drop', () => {
  test('should drag an element and drop it into the target', async ({ page }) => {
    test.setTimeout(90000);

    const droppablePage = new DroppablePage(page);

    await droppablePage.open();

    await expect(
      page.getByRole('heading', { name: 'Droppable' })
    ).toBeVisible();

    await droppablePage.dragAndDrop();

    await droppablePage.verifyDropSuccess();
  });
});