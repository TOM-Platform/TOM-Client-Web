# TOM-Client-Web

Web dashboard for TOM, developed with Vue 3 in Vite, frontend with naive-ui.

## Project links

- Documentation: --
- [Version info](VERSION.md)

## Requirements

- Use [yarn](https://classic.yarnpkg.com/lang/en/docs/install/) for package management.


## Installation

- Run `yarn install` on the root directory to install dependencies
- Create the required credential files inside `src/credential` folder
  - Create a file `src/credential/google_maps_credential.json` with Google Maps credentials such as `{"map_api_key": "KEY"}`
    - Current Google Maps APIs used:
      - [Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
      - [Directions API](https://developers.google.com/maps/documentation/directions/overview)
      - [Static Maps API](https://developers.google.com/maps/documentation/maps-static/overview)


## Application Execution
- Start the [TOM-Server-Python](https://github.com/TOM-Platform/TOM-Server-Python) to establish a socket and database connection
- Modify the [config](src/constant/config.ts) to the add IP address (i.e., `WEBSOCKET_HOST_IP`) of the python-server. Use `127.0.0.1` when both python-server and web-client are running on the same machine.
- Run `yarn run dev` to start the application


## Development

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)


## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Production: Type-Check, Compile and Minify for Deployment

```sh
yarn run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```

