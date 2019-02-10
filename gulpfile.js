"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    rimraf = require("rimraf"),
    fs = require("fs"),
    browserify = require("browserify"),
    lessify = require('lessify'),
    path = require('path'),
    babel = require("gulp-babel");

var bundles = {
    test: {
        source: './',
        entry: 'test.js',
        publish: './test',
        module: 'index.js'
    },
    bundle: {
        source: 'app',
        entry: 'scripts/**/*.{js,jsx}',
        publish: 'dist',
        module: 'bundle.js'
    }
};

gulp.task('bundle.clean', function (cb) {
    var bundle = bundles.bundle;
    return rimraf(bundle.publish, cb);
});

gulp.task('bundle.build', function () {
    var bundle = bundles.bundle;
    let streams = [];
    
    streams.push(
        gulp.src(`${bundle.source}/${bundle.entry}`)
        .pipe(babel({
            presets: ['@babel/env', '@babel/react']
        }))
        //.pipe(lessify())
        //.pipe(concat(bundle.module))
        .pipe(gulp.dest(bundle.publish + '/scripts'))
    );

    //streams.push(
    //    gulp.src(`${bundle.source}/**/*.{less,png}`)
    //    .pipe(gulp.dest(bundle.publish))
    //);

    return merge(streams);
});

gulp.task('bundle', gulp.series('bundle.clean', 'bundle.build'));

gulp.task('test', function () {
    var bundle = bundles.test;

    var customOpts = {
        entries: [`${bundle.source}/${bundle.entry}`]
    };
    var b = browserify(customOpts);

    b.transform("babelify", { presets: ['env', 'react'] });
    b.transform(lessify);

    return b.bundle()
        .pipe(fs.createWriteStream(`${bundle.publish}/${bundle.module}`));
});
