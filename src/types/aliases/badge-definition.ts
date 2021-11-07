import { QueryParams } from "../index.js";

export type BadgeDefinition = {
  details?: string;
  display: string;
  path?: string;
  to: string;
  options?: QueryParams;
  variations?: {
    [id: string]: Partial<BadgeDefinition>;
  };
};
