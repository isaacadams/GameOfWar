"use strict";

var gulp = require('gulp'),
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
    buffer = require('vinyl-buffer');

var settings = {
    source: './app',
    publish: './test',
    entry: 'test.js',
    module: 'test.js',
    //css: 'site.min.css',
    get vendor() {
        return this.publish + '/vendor';
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

function scripts() {
    var customOpts = {
        entries: [`${settings.source}/${settings.entry}`]
    };
    var b = browserify(customOpts);

    b.transform("babelify", { presets: ["env", "react"] });
    b.transform(lessify);
    
    return b.bundle()
        .pipe(source(settings.module))
        .pipe(buffer())
        .pipe(gulp.dest(settings.publish));
}

gulp.task('test', () => {
    return scripts();
});

//gulp.task('css', css);