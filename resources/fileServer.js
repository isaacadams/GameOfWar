var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    cors = require('cors');

var express = require('express');
var app = express();
app.use(cors());
app.use(function onRequest(req, res) {

    try {

        let query = url.parse(req.url, true).query;
        let pic = query.image;

        let picture_Path = './resources/playingcards/1x/' + pic + '.png';
        
        fs.readFile(picture_Path, function (err, content) {
            if (err) {
                error(err);
            } else {
                //specify the content type in the response will be an image               
                res.writeHead(200, { 'Content-type': 'image/png' });
                res.end(content);
            }

        });


    }
    catch (err) {
        error(err);
    }

    function error(err) {
        res.writeHead(400, { 'Content-type': 'text/html' });
        console.log(err);
        res.end("No such image");
    }

});


app.listen(3000);