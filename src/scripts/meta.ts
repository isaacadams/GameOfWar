let packagejson = require('../../package.json');

export default {
    isDevelopment: process.env.NODE_ENV === "development",
    owner: packagejson.author,
    version: 'v' + packagejson.version
}