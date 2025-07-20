/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOMAIN_BE: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 