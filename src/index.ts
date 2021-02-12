import { loadConfig } from "./loaders/config-loader";
import { resolveSettings } from "./resolvers/settings-resolver";
import { resolveAbout } from "./resolvers/about-resolver";

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
