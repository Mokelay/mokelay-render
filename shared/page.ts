import type { MokelayBlock } from 'mokelay-components/blocks';
import type { MokelayPage } from 'mokelay-components/pages';

export type RenderPage = MokelayPage;

export function collectBlockTypes(blocks: MokelayBlock[]): string[] {
  const types = new Set<string>();
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== 'object') return;
    const record = value as Record<string, unknown>;
    if (typeof record.type === 'string' && record.data && typeof record.data === 'object') {
      types.add(record.type);
    }
    Object.values(record).forEach(visit);
  };
  visit(blocks);
  return [...types].filter((type) => type !== 'paragraph' && type !== 'table' && type !== 'columns');
}
