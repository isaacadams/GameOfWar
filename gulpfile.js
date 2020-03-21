"use strict";

var gulp = require('gulp'),
    rimraf = require("rimraf");

let myPaths = {
    source: 'app',
    publish: 'dist'
};

function MoveCardImages(cb) {
    gulp.src(`${myPaths.source}/images/playingcards/1x/**/*.png`)
        .pipe(gulp.dest(`${myPaths.publish}/playingcards`));
    
    return cb();
}

gulp.task('app.clean', function (cb) {
    return rimraf(myPaths.publish, cb);
});

gulp.task('app.images', MoveCardImages);

gulp.task('app', gulp.series('app.clean', 'app.images'));