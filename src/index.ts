import { loadConfig } from "./loaders";
import { resolvePrinters, resolveSettings } from "./resolvers";
import { About, Badge, Target } from "./classes";
import { log, writeFile } from "./utilities";

export default true;

const config = loadConfig();
log("Configuration:");
log(config);

const settings = resolveSettings(config);
log("Settings:");
log(settings);

const about = new About(config);
log("About:");
log(about);

const badges = config.badges.map((badge) => new Badge(badge, settings, about));
log("Badges:");
log(badges);

const target = new Target(settings);
const extension = target.extension;

const printers = resolvePrinters();
const printer = printers[extension];

const badgesMarkup = printer(badges, settings);
log("Badges Markup:");
log(badgesMarkup);

const markup = printer(badges, settings, target.content);
log("Modified Target:");
log(markup);

writeFile("./README.md", markup);
