# Protest Art HK (UI)

The frontend repository of the Protest Art HK platform. The basic file structure is cloning from [Vue Enterprise Boilerplate](https://github.com/chrisvfritz/vue-enterprise-boilerplate). For the details of file structure and project architecture, please refer to the [docs folder](./docs/index.md)

## Prerequisite

- [NodeJS](https://nodejs.org/en/) stable version (v12.x)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) stable version (v1.x)

## Install Dependencies

```bash
# Install NodeJS dependencies listed in package.json
yarn install
```

## Start Dev Server

```bash
# Launch the dev server
yarn dev

# Launch the dev server and automatically open it in
# your default browser when ready
yarn dev --open

# Launch the dev server with the Cypress client for
# test-driven development in a friendly interface
yarn dev:e2e
```

By default, dev and tests filter requests through the [mock API](./docs/tests.md#the-mock-api) in `tests/mock-api`. To test directly against a local/live API instead, run dev and test commands with the `VUE_APP_API_URL` environment variable set. For example:

```bash
# To develop against a local backend server
VUE_APP_API_URL=http://localhost:3000 yarn dev

# To test and develop against a production server
VUE_APP_API_URL=https://example.io yarn dev:e2e
```

## Production Build

```bash
# Build for production with minification
yarn build
```

This results in your compiled application in a `dist` directory.

## Technical Stack

- [Vue](https://vuejs.org/) (MVC Framework)
- [Vuex](https://vuex.vuejs.org/) (State management, similar to Redux)
- [Element](https://element.eleme.io/#/en-US) (UI Framework, similar to Bootstrap)

## Generators

```bash
# Generate a new component with adjacent unit test
# Component is those reuseable element, eg. <CustomButton/>, <Menu/>, <ArtThumbnail/>, etc.
# It is located at `src/components`.
# All components which the name start with `_` will be auto global registered
yarn new component

# Generate a new view component with adjacent unit test
# You can treat as page, eg. <Home/>, <About/>, <Upload/>, etc.
# It is located at `src/router/views`.
yarn new view

# Generate a new layout component with adjacent unit test
# You can make layout like, <WithMainMenu/>, <WithSideBar/>, etc
# It is located at `src/router/layouts`.
yarn new layout

# Generate a new Vuex module with adjacent unit test
# Which is the namespaced client side datastore
# It is located at `src/state/modules`.
yarn new module

# Generate a new utility function with adjacent unit test
# It is located at `src/utils`.
yarn new util

# Generate a new end-to-end spec
# It is located at `tests/e2e/specs`.
yarn new e2e
```

## Style & CSS

For component based style, you can directly write CSS/SCSS in side the `.vue` file. For some global CSS settings, please modify the `.scss` files in `/src/design` folder. Usually you would like to declare SCSS variable and help class there.

## Static files

If you have any static files which don't want to package through webpack, please place it in `/public` folder.

## More

If you still have any question about the architecture, please refer to the [Vue Enterprise Boilerplate](./docs/index.md).
