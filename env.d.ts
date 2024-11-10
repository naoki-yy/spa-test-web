/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    // 他に必要な環境変数の型もここに追加
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
