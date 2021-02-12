import { loadConfig } from "./config-loader";
import { retrieveAbout } from "./about-retriever";

export default true;

const config = loadConfig();
console.log("Configuration:");
console.log(config);

const about = retrieveAbout(config);
console.log("About:");
console.log(about);
