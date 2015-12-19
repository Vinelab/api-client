'use strict';
var gulp = require("gulp");
var lazy = require("gulp-load-plugins")({lazy: true});

/*
 * * * Compile Typescript to JavaScript
 */
gulp.task("compile-ts", function () {
    return gulp.src([ './TypeScript/module.ts', './TypeScript/*.ts'])
               .pipe(lazy.typescript({
                // Generates corresponding .map file.
                sourceMap : false,

                // Generates corresponding .d.ts file.
                declaration : true,

                // Do not emit comments to output.
                removeComments : false,

                // Warn on expressions and declarations with an implied 'any' type.
                noImplicitAny : false,

                // Skip resolution and preprocessing.
                noResolve : false,

                // Specify module code generation: 'commonjs' or 'amd'
                module : "amd",

                // Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                target : "ES5"
              }))
              .pipe(lazy.concat("DataServiceModule.js"))
              .pipe(gulp.dest("JavaScript/"));
});

/*
 * * * Gulp Default Task
 */
 gulp.task("default", ["compile-ts"], function () {});
