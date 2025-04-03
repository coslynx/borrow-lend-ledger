/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * The base URL for the backend API endpoints.
   * Read from the .env file by Vite.
   * Example: http://localhost:3001/api
   */
  readonly VITE_API_BASE_URL: string;

  // Add other VITE_ prefixed environment variables used in the application here
  // Example: readonly VITE_SOME_OTHER_VAR: string;
}

// Optional: Explicitly declare ImportMeta if needed for very specific scenarios,
// though usually merged correctly by TypeScript with the base vite/client types.
// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }