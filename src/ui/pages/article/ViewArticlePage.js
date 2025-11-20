import { test, expect } from '@playwright/test';


export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page.getByRole(
      'link', { name: ' Edit Article' }).first();
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.updateArticleButton = page.getByRole(
      'button', { name: 'Update Article' });
    this.articleDescription = page
    .getByPlaceholder('What\'s this article about?');
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.articleTag = page.getByPlaceholder('Enter tags');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTagIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text))
      .toHaveText(text, { timeout: 5000 });
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert tag '${tag}' is NOT visible`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
}

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text))
      .toHaveText(text, { timeout: 5000 });
    });
  }

  async clickEditArticleLink() {
    await test.step('Click edit article link', async () => {
      await this.editArticleLink.click();
      
    });
  }

  

  async editArticleTitle(text) {
    await test.step('Edit title name', async () => {
      await this.articleTitle.fill(text);
    })
  }

  async editArticleDescription(text) {
    await test.step('Edit title name', async () => {
      await this.articleDescription.fill(text);
    })
  }

  async editAarticleBody(text) {
    await test.step('Edit article body', async () => {
      await this.articleBody.fill(text);
    })
  }

  async editArticleTag(text) {
    await test.step('Edit article tag', async () => {
      await this.articleTag.fill(text);
    })
  }

  


  async clickUpdateArticleButton() {
    await test.step('Click update article button', async () => {
      await this.updateArticleButton.click();
      await expect(this.page).toHaveURL(/\/article\//);
      await this.page.reload();
    })
  }

  async clickUpdateArticleButtonNormal() {
    await test.step('Click update article button', async () => {
      await this.updateArticleButton.click();
      
    })
  }

  async openHomePage() {
    await test.step('ho to home page', async () => {
      await this.page.goto('https://conduit.mate.academy/');
    })
  }
  

  


}