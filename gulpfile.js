"use strict";

var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    merge = require('merge-stream'),
    uglify = require('gulp-uglify'),
    rimraf = require("rimraf"),
    fs = require("fs"),
    watchify = require('watchify'),
    browserify = require("browserify"),
    lessify = require('lessify'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    assign = require('lodash.assign'),
    log = require('gulplog');

var settings = {
    source: './src',
    publish: './dir',
    entry: 'app.jsx',
    module: 'gameofwar.js',
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
        entries: [`${settings.source}/${settings.entry}`],
        debug: true,
        paths: ['./node_modules'],
        opts: {
            standalone: 'index'
        }
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts));

    b.transform("babelify", { presets: ["env", "react"] });
    b.transform(lessify);

    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', log.info); // output build logs to terminal

    function bundle() {
        return b.bundle()
            .on('error', log.error.bind(log, 'Browserify Error'))
            .pipe(source(settings.module))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./dir'));
    }

    return bundle();
}

// Dependency Dirs
var deps = {
    "bootstrap": {
        "dist/**/*": ""
    },
    "jquery": {
        "dist/*": ""
    },
    "jquery-validation": {
        "dist/**/*": ""
    },
    "jquery-validation-unobtrusive": {
        "dist/*": ""
    },
    "popper.js": {
        "dist/**/*": ""
    }
};


function vendors() {

    //Clean the directory
    //rimraf(settings.vendor + '/', );

    var streams = [];

    for (var prop in deps) {
        console.log("Prepping Scripts for: " + prop);
        for (var itemProp in deps[prop]) {
            streams.push(gulp.src("node_modules/" + prop + '/' + itemProp)
                .pipe(gulp.dest(settings.vendor + '/' + prop + '/' + deps[prop][itemProp])));
        }
    }

    return merge(streams);
}

var build = gulp.series(/*css, */scripts, vendors);

gulp.task('build', () => {
    return build();
});

//gulp.task('css', css);