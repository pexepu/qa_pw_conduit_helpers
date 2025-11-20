import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    this.globalFeed = page.getByText('Global Feed');
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeed() {
    await test.step('Click the Global Feed section', async () => {
      await this.globalFeed.click();
    })
  }

  async assertDescriptionChangeVisible(description) {
    await test.step('Assert that Article Description change is visible', 
      async () => {
      await expect(this.page.getByText(description))
      .toBeVisible();
;
    })
  }
}
