import { Page, expect } from '@playwright/test';
import { ResizableLocators } from '../locators/resizable.locators';

export class ResizablePage {
  private locators: ResizableLocators;

  constructor(private page: Page) {
    this.locators = new ResizableLocators(page);
  }

  async open(): Promise<void> {
    await this.page.goto('https://demoqa.com/resizable', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await expect(this.locators.resizableBox).toBeVisible();
    await expect(this.locators.resizeHandle.first()).toBeVisible();
  }

  async resizeTo(width: number, height: number): Promise<void> {
    const boxLocator = this.locators.resizableBox;
    const handleLocator = this.locators.resizeHandle.first();

    await expect(boxLocator).toBeVisible();
    await expect(handleLocator).toBeVisible();
    await handleLocator.scrollIntoViewIfNeeded();

    const box = await boxLocator.boundingBox();
    const handle = await handleLocator.boundingBox();

    if (!box || !handle) {
      throw new Error('Resizable box or handle not found.');
    }

    const startX = handle.x + handle.width / 2;
    const startY = handle.y + handle.height / 2;
    const deltaX = width - box.width;
    const deltaY = height - box.height;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + deltaX, startY + deltaY, {
      steps: 30,
    });
    await this.page.mouse.up();

    await expect
      .poll(async () => {
        const resizedBox = await boxLocator.boundingBox();
        return resizedBox
          ? {
              width: Math.round(resizedBox.width),
              height: Math.round(resizedBox.height),
            }
          : null;
      })
      .toEqual({ width, height });
  }

  async verifySize(
    expectedWidth: number,
    expectedHeight: number,
  ): Promise<void> {
    const size = await this.locators.resizableBox.evaluate((element) => {
      const style = getComputedStyle(element);

      return {
        width: parseFloat(style.width),
        height: parseFloat(style.height),
      };
    });

    expect(size.width).toBeCloseTo(expectedWidth, 0);
    expect(size.height).toBeCloseTo(expectedHeight, 0);
  }
}