import { loadConfig } from "./loaders/config-loader";
import { resolveAbout } from "./resolvers/about-resolver";

export default true;

const config = loadConfig();
console.log("Configuration:");
console.log(config);

const about = resolveAbout(config);
console.log("About:");
console.log(about);
