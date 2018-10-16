let cp = require('child_process');


cp.exec('npm version', function (err, stdout, stderr) {

    if (err) {
        console.log(stderr);
    }
    else {
        console.log(stdout);
        let pattern = "(?<=gameofwar:\\s+\\\')(?!abc)(\\d+(\\.\\d+)*)";
        console.log(pattern);
        let match = stdout.match(pattern);
        let version = match.shift();

        //cp.exec('npm version ' + ++version);
        
        console.log(`${version} ups to ${++version}`);
    }

});

function VersionClass(version) {
    let self = {
        major: 0,
        minor: 0,
        patch: 0
    };


    return self;
}

//String.prototype.insert = function (pattern, text) {
//    this.replace(pattern);
//};


