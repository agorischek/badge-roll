> **_NOTE:_** _Badge Roll has not yet reached a stable v1.0, breaking changes are likely, and most badges aren't implemented yet. Pull requests welcome, especially to increase badge coverage!_

<img width="125" src="img/logo.svg" alt="Badge Roll logo" />

# Badge Roll

Configurable & Extensible README Badge Automator

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
  "badge": "badge-roll affix"
}
```

Third, add a config. Here's a basic example; see below for lots more options:

```json
//package.json
"badgeConfig": {
  "badges": ["npm/v", "github/license", "jsdelivr/npm"]
}
```

Fourth, run the script. Badge Roll will search for badges already in the file and replace them, so make sure you you've committed anything you don't want to lose!

```sh
> npm run badge
```

Voila! Your README has been badged. Read on for lots more configuration options.

## Configuration

Badge Roll configurations can be stored in a `badgeConfig` property in `package.json`, as JSON in `badgeconfig.json`, or as YAML in `badgeconfig.yaml` or `badgeconfig.yml`. Configuration files have three sections: `badges`, `settings`, and `about`.

### Badges

The `badges` section contains an array of badge configurations. For the full list of badges built in to Badge Roll, see [Badges](badges.md).

In the simplest case, a badge configuration can be simple a string indicating the badge's `id`, such as `npm/v`. Badge Roll gathers some basic info about your project and uses some sensible defaults to generate the badge.

For additional configuration options, the badge can be declared as an object. Only `id` is required; all other properties are optional.

- `id`: ID of the badge
- `display`: Alt text for the badge
- `to`: URL that the badge should navigate to
- `variation`: Particular variation of a badge to use, such as `branch`
- `options`: A dictionary of strings, numbers, or booleans to be submitted as URL query parameters

Additionally, the `style` and `provider` settings can be overridden, and the `about` dictionary can be extended or modified, for specific badges. Simple (only the `id` string) and advanced (full object) badge declarations can be mixed freely.

Here's an example `badges` section:

```yml
badges:
  - npm/v
  - id: github/commits-since
    options:
      - include_prereleases: true
      - sort: semver
  - id: appveyor/build
    variation: branch
    about:
      branch: release
```

### Settings

The `settings` section contains options such as badge style and provider. All settings are optional.

#### `position`

Where the badges will be inserted into the target file. Options are:

- `current`: Insert badges at the location of the first badge currently in the file.
- `top`: Insert badges at the very top of the file.
- `below-title`: Insert badges immediately below the first `h1` in the file.
- `below-intro`: Insert badges below the first paragraph in the file.

#### `provider`

Badges host. Defaults to `shields`.

#### `file`

Path to the file to affix badges to. Defaults to `README.md`.

#### `separator`

String to put between badges. Defaults to `space`. Also available are `newline` and `none`.

#### `style`

Style of badges. Defaults to no explicit style.

### About

The `about` section contains a dictionary of information about the project, used as variables in badge generation. The properties in the `about` section are unconstrained, so long as the section is a flat dictionary of strings. Badge Roll and plugins can collect some `about` information programmatically, but it can be declared explicitly as well.

## Commands

Basic Badge Roll usage happens via command line, such as `badge-roll affix`.

### `affix`

Insert badges into target file based on config.

### `check`

Verify that badges in target file conform to config. This is recommended for use in CI pipelines, alongside similar linting and formatting checks.

### `load-config`

Load the configuration that `badge-roll` sees, for debugging.

## API

Badge Roll can also be called programmatically, which may be useful in contexts such as scaffolding generators.

### `affix`

Insert badges into target file based on config. Config will be read from disk if not passed as parameter.

```
(source: string, config?: Config) => string
```

### `check`

Verify that badges in target file conform to config. Config will be read from disk if not passed as parameter.

```
(source: string, config?: Config) => boolean
```
