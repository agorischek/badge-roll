export interface Badge {
  id: string;
  spec?: string;
  title: string;
  alt?: string;
  vars?: Array<string>;
  style?: string;
  basePath: string;
}
