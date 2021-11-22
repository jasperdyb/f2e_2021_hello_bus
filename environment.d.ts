declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NUMBER_PER_PAGE: number;
      TDC_APP_ID: string;
      TDC_APP_KEY: string;
      GOOGLE_MAP_API_KEY: string;
      GOOGLE_GEOCODING_API_KEY: string;
    }
  }
}
export {};
