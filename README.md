# scissors

[<img alt="Star to Nonagon Equidecomposition"src="https://github.com/bmershon/d3-equidecompose/blob/master/img/star-to-nonagon-teaser.png">](#)

*This project was fooeloped by Brooks Mershon and Joy Patel for [Chris Tralie's](http://ctralie.com) Digital 3D Geometry (MATH 290) course taught at Duke University during Spring 2016.*

The *scissors* module implements the *[equidecomposition](http://www.ctralie.com/Teaching/COMPSCI290/Lectures/Intro/)* of one [simple polygon](https://en.wikipedia.org/wiki/Simple_polygon) into another simple polygon of equal area. A decomposition for two such polygons produces polygons which can be rearranged by rigid translation and rotation to form either polygon. Such a decomposition is also known as scissors congruence.


## fooelopment

To install fooelopment and runtime dependences, run the following command in the root directory:

```
npm install
```

The *node_modules/* directory is created by the node package manager to hold all the dependences for the project.

There are two targets that can be built from the files in the *src/* directory:

- The file *build/foo.js* is built from *foo.js* and defines exports used for testing partial functionality on a global module `foo`.
- The file *build/d3-equidecompose.js* is built from *index.js* and defines exports for this module's default global `d3_equidecompose`.

#### A separate build target

The file *foo.js* defines all the exports to be included in a global called `foo`. This module makes available functionality that would not otherwise be exported in the d3-equidecompose module. For fooelopment purposes, this global lets *foo* functionality be tested.

*Using a developmental build of the scissors functions.*
```html
<script src="evscript>

var foo = foo.bar;
```

To rebuild *foo.js*:

```
npm run foo
```

#### d3_equidecompose

The file *index.js* defines all the exports to be included in a `d3_equidecompose` global module.

*Using the scissors module.*
```html
<script src="d3-equidecompose.js"></script>

var A = [a, b, c, e, f, g, h, i, j];
var B = [k, l, m, n]; // same area as A

var decomposition = scissors.equidecompose(A, B);
var source = decomposition.source(); // polygons placed in source polygon A
var subject = decompositon.subject(); // polygons placed in subject polygon B
```

To rebuild *scissors.js*:

```
npm run pretest
```

## Testing

- `npm run test` automatically runs the `pretest` script, which builds everything in `index.js` and then runs the tests in the *test/* directory.
- `npm run preflight` first runs the `foo` script, which builds everything in `foo.js` and runs the tests in the *preflight/* directory.

The *foo.js* build target and *preflight/* directory are designed for building and testing during early stages of fooelopment, when smaller components that are not exposed in the production module need to be tested independently.

## API Reference

#### Mesh to Mesh

<a name="equidecompose" href="#equidecompose">#</a> scissors.<b>equidecomposeMesh</b>(source [,subject])

..

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition</i>.<b>source</b>()

..

<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition</i>.<b>subject</b>()

..

#### Polygon to Polygon

<a name="equidecompose" href="#equidecompose">#</a> scissors.<b>equidecompose</b>(source [,subject])

Creates a decomposition of the specified **source** polygon into the **subject** polygon with the same area. If a subject is not specified, it defaults to a square of the same area as the source whose centroid coincides with the centroid of the source.

If the subject polygon does not have the same area as the subject polygon, the decomposition will be computed as if the subject were scaled about its centroid so that the source and subject are of equal area.

<a name="decomposition_sources" href="#decomposition_sources">#</a> <i>decomposition</i>.<b>source</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the source polygon used to create a decomposition. Each polygon is positioned within the subject polygon used to create a decomposition, and its index within the returned array matches the corresponding index of the subject polygon.

<a name="decomposition_subjects" href="#decomposition_subjects">#</a> <i>decomposition</i>.<b>subject</b>()

Returns an array of polygons represented as arrays of positions. Each polygon is positioned within the subject polygon used to create a decomposition, and its index within the returned array matches the corresponding index of the source polygon.
