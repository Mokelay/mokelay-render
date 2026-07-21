<script setup lang="ts">
const route = useRoute();
const slug = String(route.params.slug ?? '');
const page = await useRenderPage(slug);
</script>

<template>
  <PageRenderer :page="page" />
</template>
