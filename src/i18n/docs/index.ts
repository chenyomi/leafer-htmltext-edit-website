import { computed } from 'vue';
import type { Locale } from '../index';
import { useI18n } from '../index';
import { docsEnUS } from './en-US';
import { docsZhCN } from './zh-CN';

export type DocsContent = typeof docsZhCN | typeof docsEnUS;

export type DocsMethodBlock = {
  name: string;
  anchor: string;
  signature: string;
  desc: string;
  params?: ReadonlyArray<{ name: string; type: string; required: boolean; desc: string }>;
  returns?: { type: string; desc: string };
  exampleKey: string;
  example: string;
};

export type DocsLicenseFn = {
  name: string;
  anchor: string;
  signature: string;
  desc: string;
  params?: ReadonlyArray<{ name: string; type: string; required: boolean; desc: string }>;
  returns?: { type: string; desc: string };
  exampleKey: string;
  example: string;
};

const docsByLocale: Record<Locale, DocsContent> = {
  'zh-CN': docsZhCN,
  'en-US': docsEnUS
};

export function getDocsContent(loc: Locale): DocsContent {
  return docsByLocale[loc];
}

export function useDocsContent() {
  const { locale } = useI18n();
  const doc = computed(() => getDocsContent(locale.value));

  const resolveCode = (key: string): string => {
    const code = doc.value.code[key as keyof DocsContent['code']];
    return typeof code === 'string' ? code : '';
  };

  const initScenarios = computed(() =>
    doc.value.initScenarios.map(scenario => ({
      ...scenario,
      code: resolveCode(scenario.codeKey)
    }))
  );

  const manageMethods = computed<DocsMethodBlock[]>(() =>
    doc.value.manageMethods.map(method => ({
      ...method,
      example: resolveCode(method.exampleKey)
    }))
  );

  const licenseFns = computed<DocsLicenseFn[]>(() =>
    doc.value.licenseFns.map(fn => ({
      ...fn,
      example: resolveCode(fn.exampleKey)
    }))
  );

  const allSectionIds = computed(() => [
    ...doc.value.guideItems.map(i => i.id),
    ...doc.value.apiItems.map(i => i.id),
    ...doc.value.moreItems.map(i => i.id)
  ]);

  return {
    doc,
    initScenarios,
    manageMethods,
    licenseFns,
    allSectionIds
  };
}
