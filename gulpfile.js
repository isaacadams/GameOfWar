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

function CreateGameBundle(cb) {
    let { createFile } = require('@isaacadams/nodejs-utils');

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

    b.bundle()
        .pipe(createFile(`${bundle.publish}/${bundle.module}`));

    return cb();
}

function MoveCardImages() {
    return gulp.src(`${myPaths.source}/images/playingcards/1x/**/*.png`)
        .pipe(gulp.dest(`${myPaths.publish}/playingcards`));
}

function createIndexHtmlFile(cb) {

    let create = fs.createWriteStream(`${myPaths.publish}/index.html`);

    create.write(
        `<html>
<body>    
    <div id="import_gameofwar"></div>
</body>
</html>

<footer>
    <script src="index.js"></script>
</footer>`
    );

    create.close();

    return cb();
}

gulp.task('app.clean', function (cb) {
    return rimraf(myPaths.publish, cb);
});

gulp.task('app.images', MoveCardImages);
gulp.task('app.bundle', CreateGameBundle);
gulp.task('app.index', createIndexHtmlFile);

gulp.task('app.build', gulp.parallel('app.images', 'app.bundle'));

gulp.task('app', gulp.series('app.clean', 'app.build', 'app.index'));
