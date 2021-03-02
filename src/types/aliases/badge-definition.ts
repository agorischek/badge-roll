export type BadgeDefinition = {
  details: string;
  to: string;
  display: string;
  query?: {
    [param: string]: string;
  };
};
