import { expect, test } from '@playwright/test';

test('SSR response contains rendered block content', async ({ request }) => {
  const response = await request.get('/ssr/home');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('Mokelay 页面已完成服务端渲染');
  expect(html).not.toContain('页面加载中...');
});

test('CSR page renders after mounting', async ({ page }) => {
  await page.goto('/csr/home');
  await expect(page.getByRole('heading', { name: 'Mokelay 页面已完成服务端渲染' })).toBeVisible();
});

test('SSR resolves static datasource values', async ({ request }) => {
  const response = await request.get('/ssr/interactive');
  expect(await response.text()).toContain('Mokelay User / ready');
});
