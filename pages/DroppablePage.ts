import { Page, expect } from '@playwright/test';
import { DroppableLocators } from '../locators/droppable.locators';

export class DroppablePage {
  private locators: DroppableLocators;

  constructor(private page: Page) {
    this.locators = new DroppableLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto('https://demoqa.com/droppable', {
      waitUntil: 'commit',
      timeout: 60000,
    });

    await expect(this.locators.dragElement).toBeVisible({
      timeout: 30000,
    });

    await expect(this.locators.dropTarget).toBeVisible({
      timeout: 30000,
    });
    await expect(this.locators.dragElement).toHaveClass(/ui-draggable/, {
      timeout: 30000,
    });
    await expect(this.locators.dropTarget).toHaveClass(/ui-droppable/, {
      timeout: 30000,
    });
  }

  async dragAndDrop(): Promise<void> {
    const source = this.locators.dragElement;
    const target = this.locators.dropTarget;

    await expect(source).toBeVisible();
    await expect(target).toBeVisible();

    await source.dragTo(target, { steps: 10 });
  }

  async verifyDropSuccess(): Promise<void> {
    await expect(this.locators.dropTarget).toHaveText('Dropped!', {
      timeout: 10000,
    });
  }
}