# d3-equidecompose

*This library is an active project for Chris Tralie's Digital 3D Geometry (MATH 290) course taught at Duke University during Spring 2016.* 

Compute the *[equidecomposition](http://www.ctralie.com/Teaching/COMPSCI290/Lectures/Intro/)* of one polygon into a polygon of equal area.

To decompose a source triangle into another subject triangle of equal area:

1. [Decompose](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5) the source triangle into a square.
2. Decompose the subject triangle into a square.
3. Overlay the common squares and [intersect all of the polygons](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d).

[<img alt="sutherland-hodgman" src="https://github.com/bmershon/d3-equidecompose/raw/master/img/triangle-to-square.png" width="420" height="219">](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d)[<img alt="sutherland-hodgman" src="https://github.com/bmershon/d3-equidecompose/raw/master/img/sutherland-hodgman.png" width="420" height="219">](http://bl.ocks.org/bmershon/1bc8659b52b35b8a320f3fefb7275ef5)

To decompose a generic simple source polygon (without holes or self intersections) into another simple subject polygon of equal area:

1. Triangulate both source and subject polygons.
2. Decompose each collection of triangles into a common square.
3. Intersect all polygons via [Sutherland-Hodgman clipping](http://bl.ocks.org/bmershon/73a90dd4229f8941b7f79df8b2c8505d) in the overlaid squares.

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

### Equidecomposition

<a name="equidecompose" href="#equidecompose">#</a> d3_equidecompose.<b>equidecompose</b>(source [,subject])

Creates a decomposition of the specified **source** polygon into the **subject** polygon with the same area. If a subject is not specified, it defaults to a square of the same area as the source whose centroid coincides with the centroid of the source.

If the subject polygon is not the same area as the subject polygon, the decomposition will be computed as if the subject were scaled about with respect to its centroid so that the source and subject are of equal area.

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition</i>.<b>sources</b>()

Returns an array of [Polygon](#polygon) objects. Each polygon is positioned within the source polygon used to create a decomposition.

<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition</i>.<b>subjects</b>()

Returns an array of [Polygon](#polygon) objects. Each polygon is positioned within the subject polygon used to create a decomposition.

### Polygon

A Polygon is a subclass of the JavaScript `Array` prototype.

<a name="new_polygon" href="#new_polygon">#</a> d3_equidecompose.<b>polygon</b>([vertices])

Creates a new polygon with the (optional) specified array of vertices.

<a name="polygon_clone" href="#polygon_clone">#</a> Polygon.prototype.<b>clone</b>()

Creates a new polygon with the same vertices and positions, except with references are destroyed.

<a name="polygon_source" href="#decomposition_sources">#</a> Polygon.prototype.<b>source</b>()

Returns a Polygon with vertices at positions cooresponding to this polygon's placement within the source polygon.
