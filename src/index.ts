import { loadConfig } from "./config-loader";
import { collectAbout } from "./about-collecter";

export default true;

const config = loadConfig();
console.log("Configuration:");
console.log(config);

const about = collectAbout(config);
console.log("About:");
console.log(about);
