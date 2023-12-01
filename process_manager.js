
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(__dirname +'public/css'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/process_manager.html');
   
});

app.post('/write-file', function (req, res) {
    const body = req.body; // your request body

    var os = require('os');

    console.log(os.cpus());
    console.log(os.totalmem());

});

/* 3, 2, 1, Launch ! */
app.listen(process.env.PORT || 3000, function() {
});