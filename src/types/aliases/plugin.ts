import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
  SettingsContribution,
} from "../index.js";

export type Plugin = {
  about?: AboutContribution;
  printers?: PrintersContribution;
  providers?: ProvidersContribution;
  settings?: SettingsContribution;
};
