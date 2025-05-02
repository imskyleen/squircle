async function getDefaultUrl() {
  try {
    return new URL('./squircle-generator.mjs', import.meta.url).href;
  } catch {
    console.log('Failed to load squircle-generator.mjs');
    return 'https://unpkg.com/@squircle/core/dist/squircle-generator.js';
  }
}

export async function init(props?: {
  url?: string | null;
  disablePolyfill?: boolean;
}) {
  const moduleUrl = props?.url ?? (await getDefaultUrl());

  if (!('paintWorklet' in CSS) && !props?.disablePolyfill) {
    // @ts-ignore
    await import('@squircle/paint-polyfill');
  }
  // @ts-ignore
  await CSS.paintWorklet.addModule(moduleUrl);
}
