import { QueryParams } from "..";

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
