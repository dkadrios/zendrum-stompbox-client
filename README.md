# STOMPBLOCK Web Client

This client is used on [https://zendrumstudio.com](https://zendrumstudio.com) for editing and interfacing with the [Zendrum STOMPBLOCK](http://zendrum.com)

It makes use of Web MIDI and SysEx and therefore must be served via HTTPS.

## Requirements
* node `^8.0.0`
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

|`yarn <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:8000`|
|`build`            |Builds the application to ./dist|
|`test`             |Runs unit tests with Karma
|`test:watch`       |Runs `test` in watch mode to re-run tests when changed|
|`lint`             |Lints the project for potential errors|
|`lint:fix`         |Lints the project and fixes all correctable errors

## Live Development

### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`).

## Routing
`react-router` is available for use, however currently the app only supports the
single route `./`

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
