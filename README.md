# STOMPBLOCK Web Client

This client is used on [https://zendrumstudio.com](https://zendrumstudio.com/stompblock) for editing and interfacing with the [Zendrum STOMPBLOCK](http://zendrum.com)

It makes use of Web MIDI and SysEx and therefore must be served via HTTPS.

## Requirements
* node `^7.0.0`
* yarn `^0.27.0` or npm `^5.0.0`

## Installation

```bash
$ yarn
```

## Running the Project

```bash
$ yarn start
```

Additional scripts available:

|`yarn <script>` |Description|
|----------------|-----------|
|`clean`         | Removes `./dist` folder
|`start`         |Serves your app at `localhost:8000`|
|`build`         |Builds the application to `./dist`|
|`build:webpack` |Produces a production build|
|`test`          |Runs unit tests with Jest
|`test:cov`      |Runs `test` and produces coverage report |
|`cov`           |Launches coverage report in browser |
|`lint`          |Lints the project for potential errors|
|`lint:fix`      |Lints the project and fixes all correctable errors

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

Deployment is simple and all the files are static.  To generate the build, use:

```bash
$ yarn build
```

All assets are automatically hashed based on file contents.
