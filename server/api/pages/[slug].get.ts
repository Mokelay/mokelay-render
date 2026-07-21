import { readPageDsl } from '../../utils/pageStore';

export default defineEventHandler(async (event) => readPageDsl(getRouterParam(event, 'slug')));
