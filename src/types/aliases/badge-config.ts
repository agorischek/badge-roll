import { About, QueryParams } from "../index.js";

export type BadgeConfig = SimpleBadgeConfig | FullBadgeConfig;

type SimpleBadgeConfig = string;

type FullBadgeConfig = {
  about?: About;
  basePath?: string;
  details?: string;
  display?: string;
  id: string;
  path?: string;
  provider?: string;
  options?: QueryParams;
  style?: string;
  to?: string;
  variation?: string;
};
