import { About } from "..";

export type BadgeConfig = SimpleBadgeConfig | FullBadgeConfig;

type SimpleBadgeConfig = string;

type FullBadgeConfig = {
  about?: About;
  basePath?: string;
  details?: string;
  display?: string;
  id: string;
  provider?: string;
  style?: string;
  to?: string;
  query?: {
    [param: string]: string;
  };
};
