import { About } from "../classes";
import { Context } from ".";

export type AboutContribution = (about: About, context: Context) => About;
