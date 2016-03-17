# d3-equidecompose

*The library/plugin name is subject to change.*

## Testing

- `npm run test` first runs the `pretest` script, which builds everything in `index.js` and runs the tests in the *test/* directory.
- `npm run partials` first runs the `preflight` script, which builds everything in `partials.js` and runs the tests in the *preflight/* directory.

**What's the distinction between *preflight/pretest* and *partials/index.js*?** The *partials.js* build target and *preflight/* directory are designed for building and testing during early stages of development, particularly when there is a need to test small components that are not exposed in production.