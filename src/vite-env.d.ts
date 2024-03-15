/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  CESIUM_BASE_URL: string;
}
