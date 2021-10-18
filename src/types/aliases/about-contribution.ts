import { About, Context } from "../index.js";

export type AboutContribution = (about: About, context: Context) => About;
