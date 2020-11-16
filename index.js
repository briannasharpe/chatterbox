var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
/* ch.15 challenges */
var error = require('./error');
var mime = require('mime');
/* */

/*
var handleError = function (err, res) {
    res.writeHead(404);
    res.end();
};
*/
var errorPage = function (err, res) {
    error(err, res, 'app', 'error.html')
};

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            //handleError(err, res);
            errorPage(err, res);
            return;
        } else {
            var mimeType = mime.getType(filePath);
            res.setHeader('Content-Type', mimeType);
            res.end(data);
        }
    });
});
server.listen(3000);