import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
  SettingsContribution,
} from "..";

export type Plugin = {
  about?: AboutContribution;
  printers?: PrintersContribution;
  providers?: ProvidersContribution;
  settings?: SettingsContribution;
};
