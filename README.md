# d3-equidecompose

*This library is an active project for [Chris Tralie's](http://ctralie.com) Digital 3D Geometry (MATH 290) course taught at Duke University during Spring 2016. The project was developed by [Brooks Mershon](http://brooksmershon.com) and Joy Patel.* 

Compute the *[equidecomposition](http://www.ctralie.com/Teaching/COMPSCI290/Lectures/Intro/)* of one polygon into a polygon of equal area. A decomposition produces polygons which can be rearranged by rigid translation and rotation to form another polygon.

## TODO

- [X] Cut triangle to common square.
- [X] Use transformations to animate or "tween" polygons from triangle to common square.
- [X] Use Sutherland-Hodgman clipping to "smash" common squares for two triangles of equal area against one another.
- [ ] **Animate decomposition between two equidecomposed triangles.**
- [ ] Implement general equidecomposition for any two simple polygons (without self-intersections or holes).
- [ ] Complete d3-equidecompose API, including convenience methods for transforming the decomposition polygons.

## Implementation

#### Triangle to Square Decomposition

To decompose a source triangle into a square of equal area:

1. Decompose a triangle into its canonical rectangle.
2. [Decompose](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5) a canonical rectangle into a square using the [escalator method](http://www.ctralie.com/Teaching/COMPSCI290/Lectures/Intro/#rect2rect).

*Click images for interactive examples.*

[<img alt="canonical-rectangle" src="https://cloud.githubusercontent.com/assets/3190945/13858265/3b91a538-ec54-11e5-9962-d1cff01b0cff.gif" width="33%">](http://bl.ocks.org/bmershon/14972d48da2c362841d6073b267c815f)
[<img alt="cut-rectangle-triangle" src="https://cloud.githubusercontent.com/assets/3190945/14405618/89bdd7ea-fe60-11e5-805a-5f7afa4e11ee.gif" width="33%">](http://bl.ocks.org/bmershon/14972d48da2c362841d6073b267c815f)
[<img alt="triangle-to-square" src="https://cloud.githubusercontent.com/assets/3190945/14765098/cc43adf2-099f-11e6-94ae-5d768bb9767f.gif" width="33%">](http://bl.ocks.org/bmershon/14972d48da2c362841d6073b267c815f)

#### Triangle to Triangle Decomposition

To decompose a source triangle into another subject triangle of equal area:

1. Decompose the source triangle into a square.
2. Decompose the subject triangle into a square.
3. Overlay the common squares and [intersect all of the polygons](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d).

**N.B.**The decomposition works correctly using Sutherland-Hodgman clipping to instersect to common squares. There is a bug preventing the correct animation of triangle to triangle decomposition.

*Click images for interactive examples.*

[<img alt="triangle-to-triangle" src="https://cloud.githubusercontent.com/assets/3190945/14940273/c5f8d960-0f3d-11e6-8988-ffad88c74f6d.png" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)
[<img alt="triangle-to-triangle" src="https://cloud.githubusercontent.com/assets/3190945/14940281/2a6b4b1c-0f3e-11e6-93fd-43a887084561.png" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)
[<img alt="triangle-to-triangle" src="https://cloud.githubusercontent.com/assets/3190945/14940282/2a7315fe-0f3e-11e6-962a-7fca3dc976ca.png" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)

#### Shape to Shape Decomposition (TODO)

To decompose a simple source polygon (without holes or self intersections) into another simple subject polygon of equal area:

1. Triangulate both source and subject polygons.
2. Decompose each collection of triangles into a common square.
3. Intersect all polygons via [Sutherland-Hodgman clipping](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d) in the overlaid squares.

#### Geometry Processing

Several geometry processing tools are needed in order to perform a decomposition:

- Cut a polygon with a line segment to produce new polygons.
- Cut a collection of polygons with a line segment (possibly at exact vertex locations).
- Intersect two collections of polygons (using Sutherland-Hodgman clipping).
- Intersect polygons at **exact** positions, without relying on floating point accuracy.
- Transform polygons through rigid translations and rotations, preserving exact positioning of vertices when possible. Exact positioning is achieved by equating `Object` references for vertices which will be intersected without relying on floating-point accuracy (i.e. if one wishes to know that two vertices are coincident, check that they are the same object, rather than whether they have the same coordinates). 

*Click images for interactive examples.*

[<img alt="cut-polygon" src="https://cloud.githubusercontent.com/assets/3190945/14469966/0261bbc0-00b5-11e6-842e-2a5cacc62ef5.gif" width="33%">](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d)
[<img alt="cut-collection" src="https://cloud.githubusercontent.com/assets/3190945/14515082/72a69648-01c4-11e6-893c-93258826d474.gif" width="33%">](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d)
[<img alt="sutherland-hodgman" src="https://github.com/bmershon/d3-equidecompose/raw/master/img/sutherland-hodgman.png" width="33%">](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d)

#### Transformations

In order to keep track of the translations and rotations undergone by each polygon throughout the equidecomposition pipeline, a history of transformations is maintained by each polygon. Cuts produce new polygons, the canonical rectangle requires rotations, and the escalator method introduces translations.

*Click images for interactive examples.*

[<img alt="triangle" src="https://github.com/bmershon/d3-equidecompose/raw/master/img/triangle.png" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)
[<img alt="square" src="https://github.com/bmershon/d3-equidecompose/raw/master/img/square.png" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)
[<img alt="triangle-to-square" src="https://cloud.githubusercontent.com/assets/3190945/14924562/373fb892-0e11-11e6-87e2-92582fa2fe48.gif" width="33%">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)

## Development

To install development and runtime dependences, run the following command in the root directory:

```
npm install
```

The *node_modules/* directory is created by the node package manager to hold all the dependences for the project.

There are two targets that can be built from the files in the *src/* directory:

- *build/partials.js* is built from *partials.js* (exports used for testing partial functionality).
- *build/d3-equidecompose.js* is built from *index.js* (this module's main exports).

#### Partials

The file *partials.js* defines all the exports to be included in a `partials` global module. This module makes available functionality that would not otherwise be available in the completed d3-equidecompose module. For development purposes, this global lets *partial* functionality be tested.

```html
<script src="partials.js"></script>
```

To rebuild *partials.js*:

```
npm run partials
```

#### d3_equidecompose

The file *index.js* defines all the exports to be included in a `d3_equidecompose` global module.

```html
<script src="d3-equidecompose.js"></script>
```

To rebuild *d3-equidecompose.js*:

```
npm run pretest
```

## Testing

- `npm run test` automatically runs the `pretest` script, which builds everything in `index.js` and then runs the tests in the *test/* directory.
- `npm run preflight` first runs the `partials` script, which builds everything in `partials.js` and runs the tests in the *preflight/* directory.

The *partials.js* build target and *preflight/* directory are designed for building and testing during early stages of development, when smaller components that are not exposed in the production module need to be tested independently.

## API Reference (TODO)

### Equidecomposition

#### Triangle to Triangle

<a name="equidecompose" href="#equidecompose">#</a> d3_equidecompose.<b>triangles</b>(source [,subject])

Creates a decomposition of the specified source triangle into the subject polygon. If a subject is not specified, it defaults to a square of the same area as the source whose centroid coincides with the centroid of the source.

If the subject polygon does not have the same area as the subject polygon, the decomposition will be computed as if the subject were scaled about with respect to its centroid so that the source and subject are of equal area.

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition</i>.<b>sources</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the source polygon used to create a decomposition.

<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition</i>.<b>subjects</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the subject polygon used to create a decomposition.

#### Polygon to Polygon

<a name="equidecompose" href="#equidecompose">#</a> d3_equidecompose.<b>polygons</b>(source [,subject])

Creates a decomposition of the specified **source** polygon into the **subject** polygon with the same area. If a subject is not specified, it defaults to a square of the same area as the source whose centroid coincides with the centroid of the source.

If the subject polygon does not have the same area as the subject polygon, the decomposition will be computed as if the subject were scaled about with respect to its centroid so that the source and subject are of equal area.

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition</i>.<b>sources</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the source polygon used to create a decomposition.


<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition</i>.<b>subjects</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the subject polygon used to create a decomposition.
