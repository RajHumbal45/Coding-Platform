const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseUrl = 'http://localhost:3000';
  const checks = [];
  const pass = (n) => checks.push(`PASS: ${n}`);
  const fail = (n, e) => checks.push(`FAIL: ${n} -> ${e.message || e}`);

  const unique = Date.now();
  const chapterName = `UI Chapter ${String(unique).slice(-6)}`;
  const topicName = 'UI Topic';
  const problemName = 'UI Problem';

  try {
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByRole('link', { name: 'Admin Panel' }).click();
    await page.waitForURL('**/admin');
    pass('Admin login + admin page');
  } catch (e) { fail('Admin login + admin page', e); }

  try {
    await page.getByPlaceholder('Chapter Title').fill(chapterName);
    await page.getByRole('button', { name: 'Create Chapter' }).click();
    await page.getByText(/Chapter (added|created)/).first().waitFor({ timeout: 12000 });
    pass('Admin create chapter mutation message');
  } catch (e) { fail('Admin create chapter mutation message', e); }

  try {
    const topicSection = page.locator('article').filter({ hasText: 'Add Topic' });
    await topicSection.locator('select').first().selectOption({ label: chapterName });
    await topicSection.getByPlaceholder('Topic Title').fill(topicName);
    await topicSection.getByRole('button', { name: 'Create Topic' }).click();
    await page.getByText(/Topic (added|created)/).first().waitFor({ timeout: 12000 });
    pass('Admin create topic mutation message');
  } catch (e) { fail('Admin create topic mutation message', e); }

  try {
    const problemSection = page.locator('article').filter({ hasText: 'Add Problem' });
    const selects = problemSection.locator('select');
    await selects.nth(0).selectOption({ label: chapterName });
    await selects.nth(1).selectOption({ label: topicName });
    await problemSection.getByPlaceholder('Problem Title').fill(problemName);
    await selects.nth(2).selectOption('Easy');
    await problemSection.getByPlaceholder('YouTube URL').fill('https://youtube.com/watch?v=dQw4w9WgXcQ');
    await problemSection.getByPlaceholder('LeetCode/Codeforces URL').fill('https://leetcode.com/problems/two-sum/');
    await problemSection.getByPlaceholder('Article URL').fill('https://example.com');
    await problemSection.getByRole('button', { name: 'Create Problem' }).click();
    await page.getByText(/Problem (added|created)/).first().waitFor({ timeout: 12000 });
    pass('Admin create problem mutation message');
  } catch (e) { fail('Admin create problem mutation message', e); }

  try {
    const snapshot = page.locator('section.chapter-card').filter({ hasText: 'Current Sheet Snapshot' });
    await snapshot.getByText(chapterName).first().waitFor({ timeout: 12000 });
    pass('Admin snapshot shows created chapter');
  } catch (e) { fail('Admin snapshot shows created chapter', e); }

  console.log(checks.join('\n'));
  await browser.close();
})();
