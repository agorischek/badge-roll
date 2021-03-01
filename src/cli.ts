#!/usr/bin/env node

import { Command } from "commander";

import { affixFile, checkFile, loadConfig } from "./core";
import { log } from "./utilities";

const program = new Command();

program
  .command("affix")
  .description("Affix badges to the target file")
  .action(() => {
    log("Affixing badges...");
    affixFile();
    log("Done!");
  });

program
  .command("check")
  .description("Check whether badges in target file match config")
  .action(() => {
    log("Checking badges...");
    checkFile();
  });

program
  .command("load-config")
  .description("Check whether badges in target file match config")
  .action(() => {
    log("Loading config...");
    const config = loadConfig();
    log(config);
  });

program.parse(process.argv);
