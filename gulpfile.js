"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    rimraf = require("rimraf"),
    fs = require("fs"),
    browserify = require("browserify"),
    lessify = require('lessify'),
    path = require('path');

let myPaths = {
    source: 'app',
    publish: 'gameofwar'
};

function CreateGameBundle() {
    let { createFile } = require('./utilities');
    let bundle = {
        source: `${myPaths.source}/scripts`,
        entry: 'GameOfWarPage.jsx',
        publish: myPaths.publish,
        module: 'index.js'
    };

    var customOpts = {
        entries: [`${bundle.source}/${bundle.entry}`]
    };
    var b = browserify(customOpts);

    b.transform("babelify", { presets: ['env', 'react'] });
    b.transform(lessify);

    return b.bundle()
        .pipe(createFile(`${bundle.publish}/${bundle.module}`));
}

function MoveCardImages() {
    return gulp.src(`${myPaths.source}/images/playingcards/1x/**/*.png`)
        .pipe(gulp.dest(`${myPaths.publish}/playingcards`));
}

gulp.task('app.clean', function (cb) {
    return rimraf(myPaths.publish, cb);
});

gulp.task('app.build', function () {
    MoveCardImages();
    return CreateGameBundle();
});

gulp.task('app', gulp.series('app.clean', 'app.build'));
