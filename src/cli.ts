#!/usr/bin/env node

import { Command } from "commander";

import { affixCmd, checkCmd, loadConfigCmd } from "./commands/index.js";

const program = new Command();

program
  .command("affix")
  .description("Affix badges to the target file")
  .action(() => {
    affixCmd();
  });

program
  .command("check")
  .description("Check whether badges in target file match config")
  .action(() => {
    checkCmd();
  });

program
  .command("load-config")
  .description("Check whether badges in target file match config")
  .action(() => {
    loadConfigCmd();
  });

program.parse(process.argv);
