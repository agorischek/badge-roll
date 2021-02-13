import { loadConfig } from "./loaders";
import { resolveAbout, resolveSettings } from "./resolvers";
import { Badge } from "./declarations";
import print from "./modules/printer-markdown";
import { readFile, writeFile } from "./utilities";

export default true;

const config = loadConfig();
console.log("Configuration:");
console.log(config);

const settings = resolveSettings(config);
console.log("Settings:");
console.log(settings);

const about = resolveAbout(config);
console.log("About:");
console.log(about);

const badges = config.badges.map((badge) => new Badge(badge, settings, about));
console.log("Badges:");
console.log(badges);

const target = readFile(settings.target);

const badgesMarkup = print.printers.markdown(badges, settings);
console.log("Badges Markup:");
console.log(badgesMarkup);

const markup = print.printers.markdown(badges, settings, target);
console.log("Modified Target:");
console.log(markup);

writeFile("./README.md", markup);
