import { About } from ".";

export interface Badge {
  id: string;
  details?: string;
  display?: string;
  style?: string;
  basePath: string;
  to: string;
  about: About;
}
