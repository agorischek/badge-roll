import { QueryParams } from "..";

export type BadgeDefinition = {
  details?: string;
  display: string;
  path?: string;
  to: string;
  query?: QueryParams;
  variations?: {
    [id: string]: Partial<BadgeDefinition>;
  };
};
