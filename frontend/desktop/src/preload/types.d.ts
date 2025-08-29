import type { Tokens } from "../main/token-store";
declare global {
  interface Window {
    secureAuth: {
      setTokens(tokens: Tokens): Promise<boolean>;
      getTokens(): Promise<Tokens | null>;
      clearTokens(): Promise<boolean>;
    };
  }
}
export {};
