import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { HomePage } from '../../pages/HomePage';



export async function createNewArticle(page, article) {
  await test.step('Create new Article with tag', async () => {
    const createArticlePage = new CreateArticlePage(page);
    const homePage = new HomePage(page);

    await homePage.clickNewArticleLink();

    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);
    if(article.tags && article.tags.length > 0) {
      await createArticlePage.fillTagsField(article.tags[0]);
      await createArticlePage.enterEtner();
    };
    
    await createArticlePage.clickPublishArticleButton();

    

  });
}