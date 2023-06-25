var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT||8080;

app.use(express.static(__dirname));

app.get('/listthemes', (req, res) => {
    var themes = [];
    fs.readdirSync(__dirname + '/themes', {encoding: 'utf8'}).forEach(file => {
        if(file == 'themelist.json') return;
        themes.push(file.substring(0, file.length - 5));
    });
    res.end(`${JSON.stringify(themes)}`);
});
app.listen(port, ()=>{
    console.log("App listening on port " + port);
});