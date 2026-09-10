/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
