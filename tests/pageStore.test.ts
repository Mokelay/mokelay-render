import { afterEach, describe, expect, it } from 'vitest';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { readPageDsl } from '../server/utils/pageStore';

const fixtureSlug = 'vitest_page';
const fixturePath = resolve(process.cwd(), 'page-dsl', `${fixtureSlug}.json`);

afterEach(() => rm(fixturePath, { force: true }));

describe('page DSL store', () => {
  it('loads and normalizes a page', async () => {
    await mkdir(resolve(process.cwd(), 'page-dsl'), { recursive: true });
    await writeFile(fixturePath, JSON.stringify({ uuid: fixtureSlug, name: 'Test', blocks: [] }));
    await expect(readPageDsl(fixtureSlug)).resolves.toMatchObject({ uuid: fixtureSlug, blocks: [] });
  });

  it('rejects traversal and malformed slugs', async () => {
    await expect(readPageDsl('../package')).rejects.toMatchObject({ statusCode: 400 });
    await expect(readPageDsl('Nested/Page')).rejects.toMatchObject({ statusCode: 400 });
  });

  it('returns 404 for a missing page', async () => {
    await expect(readPageDsl('definitely_missing')).rejects.toMatchObject({ statusCode: 404 });
  });

  it('reports invalid JSON as a server error', async () => {
    await writeFile(fixturePath, '{not-json');
    await expect(readPageDsl(fixtureSlug)).rejects.toMatchObject({ statusCode: 500 });
  });
});
