"use strict";

import { loadConfig } from "./config-loader";
import { retrieveAbout } from "./about-retriever";

export default true;

const config = loadConfig();
console.log(config);
const about = retrieveAbout();
console.log(about);
