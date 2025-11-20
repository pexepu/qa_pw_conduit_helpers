import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticleWithTag, createNewArticleNoTag } from '../../src/ui/actions/article/createNewArticle';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  TEXT_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';



let homePage;
let article;
let viewArticlePage;
let article2;
let createArticlePage;




test.beforeEach(async ({ page }) => {
  const user = generateNewUserData();
  await signUpUser(page, user);
});

test.describe('Edit  an article WITHOUT tags',  () => {
  
  test.beforeEach(async ({ page }) => {
    article = generateNewArticleData();
    await createNewArticleNoTag(page, article);
    viewArticlePage = new ViewArticlePage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);
    article2 = generateNewArticleData(1);
});
  
  test('Edit the article title for the existing article', async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTitle(article2.title);
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(article2.title);
  });

  test('Edit the article description for the existing article', 
    async () => {
    
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleDescription(article2.description);
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await viewArticlePage.openHomePage();
    await homePage.clickGlobalFeed();
    await homePage.assertDescriptionChangeVisible(article2.description);
  });

  test('Edit the article text for the existing article', async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editAarticleBody(article2.text);
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(article2.text);
  });

  test('Add the tag for the existing article without tags', async () => {
    
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTag(article2.tags[0]);
    await createArticlePage.enterEtner();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsVisible(article2.tags[0]);
  });

  test ('Remove an article title for the existing article', 
    async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTitle('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await createArticlePage
    .assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
    
  });

  test('Remove an article description for the existing article', 
    async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleDescription('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await createArticlePage
    .assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
  });

  test('Remove the article text for the existing article', 
    async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editAarticleBody('');
    await viewArticlePage.clickUpdateArticleButtonNormal();
    await createArticlePage
    .assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
  })

  
});


test.describe('Edit an article WITH tags',  () => {
  
  test.beforeEach(async ({ page }) => {
    article = generateNewArticleData(1);
    await createNewArticleWithTag(page, article);
    viewArticlePage = new ViewArticlePage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);
    article2 = generateNewArticleData(1);
});

  test('Add the tag for the existing article with tags', async () => {
    await viewArticlePage.clickEditArticleLink();
    await viewArticlePage.editArticleTag(article2.tags[0]);
    await createArticlePage.enterEtner();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsVisible(article2.tags[0]);
    await viewArticlePage.assertArticleTagIsVisible(article.tags[0]);
  })

  test('Remove an article tag for the existing article with tag', 
    async () => {
    await viewArticlePage.clickEditArticleLink();
    await createArticlePage.deleteArticleTags();
    await viewArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagIsNotVisible(article.tags[0]);
  })
  
  
});


