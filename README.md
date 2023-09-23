# gooboo

## Project setup
Install dependencies
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Lints and fixes files
```
yarn lint
```

### Debug mode
To enable debug mode, import the debug.json file as savefile or edit your savefile to include the feature debugFeature.
Then you can access tools for debugging and developing by navigating to the debug feature.
Please note that the debug feature does not support translations and may break on small screens.

## Testing

### Unit tests
Run all tests
```
yarn test:unit
```

Run tests without parameters. This allows to run only selected tests by passing a name as argument
```
yarn test:unit-custom
```

### E2E tests
Open cypress
```
yarn test:e2e
```

## Building for production

Don't forget to set the desired APP_ENV in constants.js before building!

### Build for use on a webserver
```
yarn build
```

### Preview electron app
```
yarn forge:start
```

### Create electron app
```
yarn forge:make
```

## Compatibility

### Devices
Supports desktop, tablet, and mobile with a screen width of 375px or higher

### Browsers
Supports firefox, electron and chromium-based browsers
