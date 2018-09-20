'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var fs= require('fs');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
var rimraf = require('rimraf');
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',upload.single('upfile'),function(req,res){
  res.json({name:req.file.originalname, type: req.file.mimetype, size: req.file.size});
  //rimraf('./uploads', function () { console.log('done'); });
  //console.log(req.file);
  fs.unlink('./uploads/'+req.file.filename , function(err){
    if (err) res.status(500).type('txt').send(err);
    //console.log('done');
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
