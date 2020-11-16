var fs = require('fs');
var path = require('path');

var showError = function(err, res, folder, fileName) {
    fs.readFile(folder + '/' + fileName, function(err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
};

module.exports = showError;