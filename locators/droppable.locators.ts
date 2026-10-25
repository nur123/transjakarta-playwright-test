import { Page } from '@playwright/test';

export class DroppableLocators {
  constructor(private page: Page) {}

  get dragElement() {
    return this.page.locator('#draggable');
  }

  get dropTarget() {
    return this.page.locator('#simpleDropContainer > div[id="droppable"]');
  }
}