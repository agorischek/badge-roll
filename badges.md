| `id`                     | `variation` | `details`                                        | `to`                                       |
| :----------------------- | ----------- | ------------------------------------------------ | ------------------------------------------ |
| `appveyor/build`         | `—`         | `:user/:repo`                                    |                                            |
| `appveyor/build`         | `branch`    | `:user/:repo/:branch`                            |                                            |
| `appveyor/job/build`     | `—`         | `:user/:repo/:job`                               |                                            |
| `appveyor/job/build`     | `branch`    | `:user/:repo/:job/:branch`                       |                                            |
| `appveyor/tests`         | `—`         | `:user/:repo`                                    |                                            |
| `appveyor/tests`         | `branch`    | `:user/:repo/:branch`                            |                                            |
| `appveyor/tests`         | `compact`   | `:user/:repo`                                    |                                            |
| `azure-devops/build`     | `—`         | `:organization/:projectId/:definitionId`         |                                            |
| `azure-devops/build`     | `branch`    | `:organization/:projectId/:definitionId/:branch` |                                            |
| `badge-roll`             | `—`         |                                                  | `https://github.com/agorischek/badge-roll` |
| `github/license`         | `—`         | `:user/:repo`                                    | `:packageHomepage`                         |
| `github/workflow/status` | `—`         | `:user/:repo/:workflow`                          |                                            |
| `jsdelivr/npm`           | `—`         | `:period/:packageName`                           | `:packageHomepage`                         |
| `npm/v`                  | `—`         | `:packageName`                                   | `:packageRegistry`                         |
