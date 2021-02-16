import {
  AboutContribution,
  PrintersContribution,
  ProvidersContribution,
} from ".";

export interface contribution {
  about?: AboutContribution;
  printers?: PrintersContribution;
  providers?: ProvidersContribution;
}
