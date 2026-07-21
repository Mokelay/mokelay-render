<script setup lang="ts">
import { computed, provide } from 'vue';
import MokelayBlockRenderer from 'mokelay-components/blocks/MokelayBlockRenderer.vue';
import { createPreviewBlockRuntime, PreviewBlockRuntimeKey } from 'mokelay-components/runtime';
import {
  PageLocaleConfigKey,
  PageReferenceAncestryKey,
  PageRuntimeContextKey,
  PageRuntimeDataKey,
  PageRuntimeVariableContextKey,
  resolvePageDataSources
} from 'mokelay-components/pages';
import type { RenderPage } from '#shared/page';

const props = defineProps<{ page: RenderPage }>();
const runtimeContext = computed(() => ({}));
const runtimeData = await resolvePageDataSources(props.page.dataSources ?? [], runtimeContext.value);
const runtimeDataRef = computed(() => runtimeData);
const variableContext = computed(() => ({
  pageId: props.page.uuid,
  context: runtimeContext.value,
  dataSources: runtimeData,
  pageData: runtimeData,
  [props.page.uuid]: runtimeData,
  ...runtimeData
}));

provide(PreviewBlockRuntimeKey, createPreviewBlockRuntime());
provide(PageRuntimeContextKey, runtimeContext);
provide(PageRuntimeDataKey, runtimeDataRef);
provide(PageRuntimeVariableContextKey, variableContext);
provide(PageLocaleConfigKey, computed(() => props.page.localeConfig));
provide(PageReferenceAncestryKey, computed(() => [props.page.uuid]));

useHead({ title: props.page.name || props.page.uuid });
</script>

<template>
  <main class="render-shell">
    <article class="render-page" :data-page-slug="page.uuid">
      <MokelayBlockRenderer
        v-for="(block, index) in page.blocks"
        :key="block.id ?? `${block.type}-${index}`"
        :block="block"
      />
    </article>
  </main>
</template>
