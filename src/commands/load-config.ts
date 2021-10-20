import { Config } from "../types/index.js";
import { log } from "../utilities/index.js";

export function loadConfigCmd() {
  log("Loading config...");

  const config = new Config();

  log(config);
}
