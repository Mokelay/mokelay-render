import axios from 'axios';
import { configureMokelayComponents } from 'mokelay-components/runtime';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiClient = axios.create({ baseURL: config.public.apiBaseUrl || undefined });
  configureMokelayComponents({
    apiClient,
    getPage: (slug) => $fetch(`/api/pages/${encodeURIComponent(slug)}`),
    getSystemPage: (slug) => $fetch(`/api/pages/${encodeURIComponent(slug)}`),
    getGlobalSetting: (key) => key === 'language' ? 'zh' : 'light',
    confirm: async (message) => import.meta.client ? window.confirm(message) : false
  });
});
