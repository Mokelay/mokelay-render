import { collectBlockTypes, type RenderPage } from '#shared/page';
import { preloadMokelayBlocks } from 'mokelay-components/blocks';

export async function useRenderPage(slug: string) {
  const key = `mokelay-page:${slug}`;
  const result = await useAsyncData<RenderPage>(key, () => $fetch(`/api/pages/${encodeURIComponent(slug)}`));
  if (result.error.value) {
    throw createError(result.error.value);
  }
  if (!result.data.value) {
    throw createError({ statusCode: 404, statusMessage: `Page DSL not found: ${slug}` });
  }
  await preloadMokelayBlocks(collectBlockTypes(result.data.value.blocks));
  return computed(() => result.data.value!);
}
