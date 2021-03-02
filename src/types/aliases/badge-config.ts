import { About, QueryParams } from "..";

export type BadgeConfig = SimpleBadgeConfig | FullBadgeConfig;

type SimpleBadgeConfig = string;

type FullBadgeConfig = {
  about?: About;
  basePath?: string;
  details?: string;
  display?: string;
  id: string;
  provider?: string;
  query?: QueryParams;
  style?: string;
  to?: string;
  variation?: string;
};
