#!/usr/bin/env node

import { Command } from "commander";

import { affixCmd, checkCmd, loadConfigCmd } from "./commands/index.js";
import { log } from "./utilities/index.js";

const program = new Command();

program
  .command("wait")
  .description("Does async work?")
  .action(() => {
    log("Going to start...");
    async function wait() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      log("Waited!");
    }
    wait();
    log("Done!");
  });

program
  .command("affix")
  .description("Affix badges to the target file")
  .action(() => {
    log("Affixing badges...");
    affixCmd();
    log("Done!");
  });

program
  .command("check")
  .description("Check whether badges in target file match config")
  .action(() => {
    log("Checking badges...");
    checkCmd();
  });

program
  .command("load-config")
  .description("Check whether badges in target file match config")
  .action(() => {
    log("Loading config...");
    const config = loadConfigCmd();
    log(config);
  });

program.parse(process.argv);
