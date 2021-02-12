import { About } from ".";

export interface Config {
  badges: Array<{
    id: string;
    details?: string;
    display?: string;
    to?: string;
  }>;
  style?: string;
  about?: About;
  plugins: Array<string>;
}
