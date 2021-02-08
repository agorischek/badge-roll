# badge-roll

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> README Badge Configurator

## Installation

```sh
$ npm install --save-dev badge-roll
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

Array of badge configurations.

### `variables`

Shared variables for use in badge generation.

### `insertionPoint`

Where to insert the badges. Defaults to `after`.

- `current`: Find the first badge in the target and replace the group
- `before`: Insert before the specified selector
- `after`: Insert after the specified selector
- `within`: Insert inside the specified selector
- `beginning`: Insert at the beginning of the file
- `end`: Insert at the end of the file

### `selector`

Reference point in file if using `before` or `after` for `insertionPoint`. Defaults to `h1`.

### `provider`

Badges host. Defaults to `shields`.

### `style`

Style of badges.

## License

MIT © [Alex Gorischek]()

[npm-image]: https://badge.fury.io/js/badge-roll.svg
[npm-url]: https://npmjs.org/package/badge-roll
[daviddm-image]: https://david-dm.org/agorischek/badge-roll.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/agorischek/badge-roll
[coveralls-image]: https://coveralls.io/repos/agorischek/badge-roll/badge.svg
[coveralls-url]: https://coveralls.io/r/agorischek/badge-roll
