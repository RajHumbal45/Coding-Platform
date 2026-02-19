const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3000';
  const checks = [];

  const pass = (name) => checks.push(`PASS: ${name}`);
  const fail = (name, err) => checks.push(`FAIL: ${name} -> ${err.message || err}`);

  const unique = Date.now();
  const studentEmail = `ui.student.${unique}@example.com`;
  const chapterName = `UI Chapter ${String(unique).slice(-6)}`;
  const topicName = 'UI Topic';
  const problemName = 'UI Problem';

  try {
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    await page.getByRole('heading', { name: 'Welcome Back' }).waitFor();
    pass('Login page renders');
  } catch (e) { fail('Login page renders', e); }

  try {
    await page.getByRole('link', { name: 'Create account' }).click();
    await page.waitForURL('**/register');
    await page.getByRole('heading', { name: 'Start Learning' }).waitFor();
    pass('Navigate to register page');
  } catch (e) { fail('Navigate to register page', e); }

  try {
    await page.getByLabel('Name').fill('UI Student');
    await page.getByLabel('Email').fill(studentEmail);
    await page.getByLabel('Password').fill('student123');
    await page.getByRole('button', { name: 'Register' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByRole('heading', { name: 'DA Sheet' }).waitFor();
    pass('Register -> Dashboard redirect');
  } catch (e) { fail('Register -> Dashboard redirect', e); }

  try {
    await page.getByPlaceholder('Search chapter, topic or problem').fill('array');
    await page.getByRole('button', { name: 'Clear Filters' }).click();
    pass('Dashboard filter controls usable');
  } catch (e) { fail('Dashboard filter controls usable', e); }

  try {
    await page.getByRole('link', { name: 'View Progress' }).click();
    await page.waitForURL('**/progress');
    await page.getByRole('heading', { name: /Progress/ }).waitFor();
    pass('Progress page navigation works');
  } catch (e) { fail('Progress page navigation works', e); }

  try {
    await page.getByRole('link', { name: 'Back To Sheet' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('**/login');
    pass('Logout redirects to login');
  } catch (e) { fail('Logout redirects to login', e); }

  try {
    await page.getByLabel('Email').fill('admin@example.com');
    await page.getByLabel('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForURL('**/dashboard');
    await page.getByRole('link', { name: 'Admin Panel' }).waitFor();
    pass('Admin login shows Admin Panel link');
  } catch (e) { fail('Admin login shows Admin Panel link', e); }

  try {
    await page.getByRole('link', { name: 'Admin Panel' }).click();
    await page.waitForURL('**/admin');
    await page.getByRole('heading', { name: 'Manage DA Sheet' }).waitFor();
    pass('Admin page renders');
  } catch (e) { fail('Admin page renders', e); }

  try {
    await page.getByPlaceholder('Chapter Title').fill(chapterName);
    await page.getByRole('button', { name: 'Create Chapter' }).click();
    await page.getByText('Chapter created').first().waitFor({ timeout: 10000 });
    pass('Admin create chapter works');
  } catch (e) { fail('Admin create chapter works', e); }

  try {
    const chapterSelectForTopic = page.locator('form').filter({ hasText: 'Add Topic' }).locator('select').first();
    await chapterSelectForTopic.selectOption({ label: chapterName });
    await page.locator('form').filter({ hasText: 'Add Topic' }).getByPlaceholder('Topic Title').fill(topicName);
    await page.locator('form').filter({ hasText: 'Add Topic' }).getByRole('button', { name: 'Create Topic' }).click();
    await page.getByText('Topic created').first().waitFor({ timeout: 10000 });
    pass('Admin create topic works');
  } catch (e) { fail('Admin create topic works', e); }

  try {
    const problemForm = page.locator('form').filter({ hasText: 'Add Problem' });
    const selects = problemForm.locator('select');
    await selects.nth(0).selectOption({ label: chapterName });
    await selects.nth(1).selectOption({ label: topicName });
    await problemForm.getByPlaceholder('Problem Title').fill(problemName);
    await selects.nth(2).selectOption('Easy');
    await problemForm.getByPlaceholder('YouTube URL').fill('https://youtube.com/watch?v=dQw4w9WgXcQ');
    await problemForm.getByPlaceholder('LeetCode/Codeforces URL').fill('https://leetcode.com/problems/two-sum/');
    await problemForm.getByPlaceholder('Article URL').fill('https://example.com');
    await problemForm.getByRole('button', { name: 'Create Problem' }).click();
    await page.getByText('Problem created').first().waitFor({ timeout: 10000 });
    pass('Admin create problem works');
  } catch (e) { fail('Admin create problem works', e); }

  try {
    await page.getByText(chapterName).first().waitFor({ timeout: 10000 });
    pass('Admin snapshot reflects newly created chapter');
  } catch (e) { fail('Admin snapshot reflects newly created chapter', e); }

  console.log(checks.join('\n'));

  await browser.close();
})();
