"use strict";

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    merge = require('merge-stream'),
    rimraf = require("rimraf"),
    fs = require("fs"),
    browserify = require("browserify"),
    lessify = require('lessify'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babel = require("gulp-babel");

var bundles = {
    main: {
        source: './app',
        entry: 'Components/GameOfWarPage.jsx',
        publish: './',        
        module: 'main.js'
    },
    test: {
        source: './',
        entry: 'test.js',
        publish: './test',
        module: 'index.js'
    },
    bundle: {
        source: './app',
        entry: '**/*.{js,jsx}',
        publish: './dist',
        module: 'bundle.js'
    }
};

//function css() {

//    var cssFiles = gulp.src(`${settings.source}/**/*.css`);

//    var lessFiles = gulp.src([`${settings.source}/**/*.less`])
//        .pipe(less());

//    return merge(cssFiles, lessFiles)
//        .pipe(minify())
//        .pipe(concat(settings.css))
//        .pipe(gulp.dest(settings.publish));
//}

//gulp.task('build', function () {
//    var bundle = bundles.main;

//    var customOpts = {
//        entries: [`${bundle.source}/${bundle.entry}`],
//        opts: {
//            browserField: false,
//            bare: true
//        }
//    };
//    var b = browserify(customOpts);

//    b.transform("babelify", { presets: ['env', 'react'] });
//    b.transform(lessify);

//    return b.bundle()
//        .pipe(source(bundle.module))
//        .pipe(buffer())
//        .pipe(uglify())
//        .pipe(gulp.dest(bundle.publish));
//});

gulp.task('bundle', function () {
    var bundle = bundles.bundle;
    let streams = [];


    streams.push(
        gulp.src(`${bundle.source}/${bundle.entry}`)
        .pipe(babel({
            presets: ['@babel/env', '@babel/react']
        }))
        //.pipe(lessify())
        //.pipe(concat(bundle.module))
        .pipe(gulp.dest(bundle.publish))
    );

    //streams.push(
    //    gulp.src(`${bundle.source}/**/*.{less,png}`)
    //    .pipe(gulp.dest(bundle.publish))
    //);

    return merge(streams);
});

gulp.task('build', function () {
    var bundle = bundles.test;

    var customOpts = {
        entries: [`${bundle.source}/${bundle.entry}`]
    };
    var b = browserify(customOpts);

    b.transform("babelify", { presets: ['env', 'react'] });
    b.transform(lessify);

    return b.bundle()
        .pipe(source(bundle.module))
        .pipe(buffer())
        .pipe(gulp.dest(bundle.publish));
});
