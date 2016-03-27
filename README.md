# d3-equidecompose

*The library/plugin name is subject to change.*

## Development

To install development and runtime dependences, run the following command in the root directory:

```
npm install
```

The *node_modules/* directory is created by the node package manager to hold all the dependences for the project.

## Testing

- `npm run test` automatically runs the `pretest` script, which builds everything in `index.js` and then runs the tests in the *test/* directory.
- `npm run preflight` first runs the `partials` script, which builds everything in `partials.js` and runs the tests in the *preflight/* directory.

The *partials.js* build target and *preflight/* directory are designed for building and testing during early stages of development, when smaller components that are not exposed in the production module need to be tested independently.
