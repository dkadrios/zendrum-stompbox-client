# STOMPBLOCK Web Client

This client is used on [https://zendrumstudio.com](https://zendrumstudio.com/stompblock) for editing and interfacing with the [Zendrum STOMPBLOCK](http://zendrum.com)

It makes use of Web MIDI and SysEx and therefore must be served via HTTPS.

## Requirements

* node `^8.0.0`
* yarn

## Installation

```bash
$ yarn
```

## Running the Project

```bash
$ yarn start
```

Additional scripts available:

| `yarn <script>`  | Description                                        |
| ---------------- | -------------------------------------------------- |
| `clean`          | Removes `./dist` folder                            |
| `dev`            | Serves your app at `localhost:8000`                |
| `build`          | Produces a production build in `./dist`            |
| `test`           | Runs unit tests with Jest                          |
| `test:watch`     | Runs unit tests with Jest whenever code changes    |
| `test:cov`       | Runs `test` and produces coverage report           |
| `test:cov:watch` | Updates coverage report whenever code changes      |
| `test:cov:open`  | Launches coverage report in browser                |
| `lint`           | Lints the project for potential errors             |
| `lint:fix`       | Lints the project and fixes all correctable errors |

## Live Development

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`).

## Testing

To add a unit test, create a `.test.js` file anywhere inside of `__tests__`.
To run the tests and also generate the coverage report, use:

```bash
$ yarn test
```

It is assumed you have `jest` installed globally in order to use its CLI.

## Deployment

Deployment is simple and all the files are static. To generate the build, use:

```bash
$ yarn build
```

All assets are automatically hashed based on file contents.
