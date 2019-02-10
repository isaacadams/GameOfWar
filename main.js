let r = require;
let path = r('path'),
    ncp = r('ncp');

let e = module.exports;

e.CreateApp = function (dist) {

    //the config will tell me what their dist folder is
    //my output is the game script and pictures in a folder to be placed in their dist folder
    ncp(getFullFilePath('gameofwar'), `${dist}/gameofwar`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('done!');
    });
};


function getFullFilePath(directPathToFileFromRoot) {
    // __filename is indeed the current file this function is being called from
    let root = path.dirname(__filename);
    // join root with the given path
    let file = path.join(root, directPathToFileFromRoot);
    return file;
}