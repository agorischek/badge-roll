<img width="125" src="img/logo.svg" alt="Badge Roll logo" />

# Badge Roll

Pluggable README Badge Automator

[![Version](https://img.shields.io/npm/v/badge-roll)](https://www.npmjs.com/package/badge-roll "Version") [![License](https://img.shields.io/github/license/agorischek/badge-roll)](https://github.com/agorischek/badge-roll "License") [![Downloads](https://img.shields.io/jsdelivr/npm/hw/badge-roll)](https://github.com/agorischek/badge-roll "Downloads") [![Badges](https://img.shields.io/badge/badges-rolled-white)](https://github.com/agorischek/badge-roll "Badges")

```yml
# badgeconfig.yml
# Here's the config for this README

badges:
  - npm/v
  - github/license
  - jsdelivr/npm
  - badge-roll

settings:
  separator: space
  provider: shields
  position: below-lead

about:
  period: hw
```

## Setup

First, install:

```sh
npm install -D badge-roll
```

Second, add a script:

```json
//package.json
"scripts":{
  "badge": "badge-roll"
}
```

Third, add a config. Here's a basic example; see below for lots more options:

```json
//package.json
"badgeConfig": {
  "badges": ["npm/v", "github/license", "jsdelivr/npm"]
}
```

Fourth, run the script:

```sh
npm run badge
```

## Options

### `badges`

Array of badge configurations. A badge configuration can be either a string representing the badge's `id`, or it can be a full object.

### `about`

A dictionary of information about the project, used as variables in badge generation.

### `position`

Where the badges will be inserted into the target file. Options are:

- `current` Insert badges at the location of the first badge currently in the file.
- `top`: Insert badges at the very top of the file.
- `above-title`: Insert badges immediately above the first `h1` in the file.
- `end-of-title`: Insert badges at the end of the first `h1` in the file.
- `below-title`: Insert badges immediately below the first `h1` in the file.
- `below-intro`: Insert badges below the first paragraph in the file.
- `section`: Insert badges into the first `span` with class `badges`.
- `auto`: Default. First attempts `section`. If no matching element is found, attempts `current`. If no badges are found, falls back to `after-title`.

### `provider`

Badges host. Defaults to `shields`.

### `style`

Style of badges.

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

## Plugins

Badge Roll plugins let you extend your badge automation workflows. Plugins can be loaded as npm packages or as local modules. If npm packages, they must be prefixed with `badge-roll-plugin-`.

Plugins are added as an array under the `plugins` value in your badge config, either as paths to the module or as the portion of the published package name following `badge-roll-plugin-`. They are run in order, and subsequent plugins can modify the results of preceding plugins.

### `about`

The `about` contribution allows plugins to automatically gather additional information about the project, for example by reading config files. It is passed two parameters: `about`, which is the current set of about information, and `context`, which includes other potentially useful information for processing.

At present, `context` includes a sole property of `package`, which is the contents of the `package.json` file, if present. About contributions should return an object representing the updated `about` information. Plugins can add, override, or even remove existing properties. The returned object must be a flat list of string values. The values added to about can be referenced in the `details` of badges.

## License

MIT © [Alex Gorischek]()
