import {
  About,
  Badge,
  Config,
  ContributionSet,
  PrinterList,
  ProvidersDirectory,
  Settings,
  Target,
} from "./classes";

export default true;

const config = new Config();
const contributions = new ContributionSet();
const settings = new Settings(config, contributions);
const about = new About(config, contributions);
const providers = new ProvidersDirectory(contributions);

const badges = config.badges.map(
  (badge) => new Badge(badge, settings, about, providers)
);

const target = new Target(settings);
const extension = target.extension;

const printers = new PrinterList(contributions);
const printer = printers[extension];

const markup = printer(badges, settings, target.originalContent);

target.write(markup);
