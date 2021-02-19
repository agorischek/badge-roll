import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
  SettingsContribution,
} from "../";

export interface plugin {
  about?: AboutContribution;
  printers?: PrintersContribution;
  providers?: ProvidersContribution;
  settings?: SettingsContribution;
}
