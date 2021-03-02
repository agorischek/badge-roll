import { QueryParams } from "..";

export type BadgeDefinition = {
  details: string;
  to: string;
  display: string;
  query?: QueryParams;
  variations?: {
    [id: string]: BadgeDefinition;
  };
};
