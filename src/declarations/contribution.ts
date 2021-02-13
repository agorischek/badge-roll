import { About } from "../classes";
import { Context } from "../declarations";

export interface contribution {
  about?: (about: About, context: Context) => About;
}
