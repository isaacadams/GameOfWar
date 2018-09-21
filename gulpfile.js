"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    merge = require('merge-stream'),
    fs = require("fs"),
    watchify = require('watchify'),
    browserify = require("browserify"),
    path = require('path'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    assign = require('lodash.assign'),
    log = require('gulplog');

function css() {

    var lessFiles = gulp.src('./src/**/*.less')
        .pipe(less());

    return merge(lessFiles)
        .pipe(concat('styles.min.css'))
        .pipe(minify())
        .pipe(gulp.dest('./dir'));
}

function scripts() {
    var customOpts = {
        entries: ['./src/app.jsx'/*, './src/GameOfWar/app.jsx'*/],
        debug: true,
        paths: ['./node_modules'],
        opts: {
            standalone: 'index'
        }
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts));

    b.transform("babelify", { presets: ["env", "react"] });

    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', log.info); // output build logs to terminal

    function bundle() {
        return b.bundle()
            .on('error', log.error.bind(log, 'Browserify Error'))
            .pipe(source('gameofwar.js'))
            .pipe(buffer())
            .pipe(gulp.dest('./dir'));
    }

    return bundle();
}

var build = gulp.series(css, scripts);

gulp.task('build', () => {
    return build();
});

gulp.task('css', css);