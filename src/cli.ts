#!/usr/bin/env node

import { Command } from "commander";

import { affixCmd, checkCmd, loadConfigCmd } from "./commands";
import { log } from "./utilities";

const program = new Command();

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
