const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

var getFile = function(path, cb) { 
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) cb({error: err});
        cb({
            content: data
        });
    });
};

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.get("/documents:path(*)", function(req, res){
    var documentPath = req.params.path.replace(/^\/|\/$/g, '');
    if (documentPath.match(/\.\.\//g) !== null) {
        res.status(400).json({
            error: "Invalid path"
        });
    }

    var relativePath = path.join(__dirname, '../../../content/', documentPath);

    // Ensure the path is within the allowed directory
    if (!relativePath.startsWith(path.join(__dirname, '../../../content/'))) {
        res.status(400).json({
            error: 'Invalid path'
        });
        return;
    }

    getFile(relativePath, function (cb) {
        if (!cb.error) {
           res.json(cb);
        }
    }); 
});

app.listen(3001, function() {
    console.log("Server running on port 3001");
});
