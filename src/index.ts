"use strict";

module.exports = true;

const { cosmiconfig, cosmiconfigSync } = require('cosmiconfig');

const searchPlaces = [
  'package.json',
  `.badgeconfig`,
  `.badgeconfig.json`,
  `.badgeconfig.yaml`,
  `.badgeconfig.yml`,
  `.badgeconfig.js`,
  `.badgeconfig.cjs`,
  `badge.config.js`,
  `$badge.config.cjs`,
]

const explorer = cosmiconfig("badgeConfig", {searchPlaces: searchPlaces});

explorer.search()
  .then((result: any) => {
    console.log(result)
  })
  .catch((error: any) => {
    console.log(error)
  });
