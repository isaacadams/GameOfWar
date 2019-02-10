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
    babel = require("gulp-babel");

let { createFile } = require('./utilities');

let e = module.exports;

e.Render = function (dist) {

    //the config will tell me what their dist folder is
    //my output is the game script and pictures in a folder to be placed in their dist folder
    let publish = dist + '/gameofwar';

    CreateGameBundle(publish);
    MoveCardImages(publish);
};

function MoveCardImages(publish) {
    return gulp.src(getFullFilePath('app/images/playingcards/1x/**/*.png'))
        .pipe(gulp.dest(publish + '/playingcards'));
}

function CreateGameBundle(publish) {
    var bundle = {
        source: getFullFilePath('app/scripts'),
        entry: 'GameOfWarPage.jsx',
        publish: publish,
        module: 'index.js'
    };

    var customOpts = {
        entries: [`${bundle.source}/${bundle.entry}`]
    };
    var b = browserify(customOpts);

    
    b.transform("babelify", { presets: ['env', 'react'] });
    b.transform(lessify);

    return b.bundle().pipe(createFile(`${bundle.publish}/${bundle.module}`));
}

function getFullFilePath(directPathToFileFromRoot) {
    // __filename is indeed the current file this function is being called from
    let root = path.dirname(__filename);
    // join root with the given path
    let file = path.join(root, directPathToFileFromRoot);
    return file;
}