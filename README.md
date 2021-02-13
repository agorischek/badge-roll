[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")[![License](https://img.shields.io/github/license//agorischek/badge-roll)](/https://github.com/agorischek/badge-roll "License")[![Downloads](https://img.shields.io/jsdelivr/npm//hw/badge-roll)](/https://github.com/agorischek/badge-roll "Downloads")

[![Version](https://img.shields.io/npm/v//badge-roll)](/https://www.npmjs.com/package/badge-roll "Version")[![License](https://img.shields.io/github/license//agorischek/badge-roll)](/https://github.com/agorischek/badge-roll "License")[![Downloads](https://img.shields.io/jsdelivr/npm//hw/badge-roll)](/https://github.com/agorischek/badge-roll "Downloads")

# 📛 Badge ⚙️ Roll

> Pluggable README Badge Automator

## Installation

```sh
$ npm install badge-roll
```

## Commands

### `init`

Extract existing badges from README and generate a config.

### `affix`

Insert badges based on config.

### `extract`

Generate a config based on existing badges.

### `check`

Verify that badges conform to config.

### `load-config`

Load the configuration that `badge-roll` sees.

## Options

### `badges`

Array of badge configurations. A badge configuration can be either a string representing the badge's `id`, or it can be a full object.

### `about`

A dictionary of information about the project, used as variables in badge generation.

#### Insertion Location

The insertion location of the badges can be specified by one of: `before`, `after`, `within`, or `at`.

`before`, `after`, and `within` take jQuery-style selectors, while `at` accepts `beginning`, `end`, or `current`.

### `provider`

Badges host. Defaults to `shields`.

### `style`

Style of badges.

## Plugins

Badge Roll plugins let you extend your badge automation workflows. Plugins can be loaded as npm packages or as local modules. If npm packages, they must be prefixed with `badge-roll-plugin-`.

Plugins are added as an array under the `plugins` value in your badge config, either as paths to the module or as the portion of the published package name following `badge-roll-plugin-`. They are run in order, and subsequent plugins can modify the results of preceding plugins.

### `about`

The `about` contribution allows plugins to automatically gather additional information about the project, for example by reading config files. It is passed two parameters: `about`, which is the current set of about information, and `context`, which includes other potentially useful information for processing.

At present, `context` includes a sole property of `package`, which is the contents of the `package.json` file, if present. About contributions should return an object representing the updated `about` information. Plugins can add, override, or even remove existing properties. The returned object must be a flat list of string values. The values added to about can be referenced in the `details` of badges.

## License

MIT © [Alex Gorischek]()
