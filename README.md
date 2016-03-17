# d3-equidecompose

*The library/plugin name is subject to change.*

## Testing

- `npm run test` automatically runs the `pretest` script, which builds everything in `index.js` and then runs the tests in the *test/* directory.
- `npm run preflight` first runs the `partials` script, which builds everything in `partials.js` and runs the tests in the *preflight/* directory.

The *partials.js* build target and *preflight/* directory are designed for building and testing during early stages of development, when smaller components that are not exposed in the production module need to be tested independently.
