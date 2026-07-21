import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createError } from 'h3';
import { normalizeMokelayPage, validatePageSlug, type MokelayPage } from 'mokelay-components/pages';

export const pageDslDirectory = resolve(process.cwd(), 'page-dsl');

export async function readPageDsl(slugValue: unknown): Promise<MokelayPage> {
  const validation = validatePageSlug(slugValue);
  if (!validation.valid) {
    throw createError({ statusCode: 400, statusMessage: validation.message });
  }

  const filename = resolve(pageDslDirectory, `${validation.value}.json`);
  let source: string;
  try {
    source = await readFile(filename, 'utf8');
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === 'ENOENT') {
      throw createError({ statusCode: 404, statusMessage: `Page DSL not found: ${validation.value}` });
    }
    throw createError({ statusCode: 500, statusMessage: `Unable to read page DSL: ${validation.value}` });
  }

  try {
    return normalizeMokelayPage(JSON.parse(source));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid JSON';
    throw createError({ statusCode: 500, statusMessage: `Invalid page DSL "${validation.value}": ${message}` });
  }
}
