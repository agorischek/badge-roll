import { About } from "../classes";

export interface BadgeConfig {
  about?: About;
  basePath?: string;
  details?: string;
  display?: string;
  id: string;
  provider?: string;
  style?: string;
  to?: string;
}
