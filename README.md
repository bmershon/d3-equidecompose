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

## API Reference

<a name="equidecompose" href="#equidecompose">#</a> d3_equidecompose.<b>equidecompose</b>(polygon, polygon)

Creates a layout resulting from decomposing the first polygon into polygons which can be translated and rotated to form the second polygon.

<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition<i>.<b>subjects</b>()

Returns an array of **Polygon** objects, which are a subclass of **Array**. Each polygon is positioned within the second shape used to create a decomposition.

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition<i>.<b>sources</b>()

Returns an array of **Polygon** objects, which are a subclass of **Array**. Each polygon is positioned within the first shape used to create a decomposition.


