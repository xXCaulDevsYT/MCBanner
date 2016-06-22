const app = require('express')(),
    cors = require('cors');
const gen = require('./lib/generator.js');

app.use(cors());
app.listen(8080);

app.get("/img/:id", function(req, res) {
    var id = req.params.id;
    gen.check(id, function(file, err) {
        if (err) {
            res.status(404).send("Not Found");
        } else {
            res.sendFile(file, {
                root: __dirname
            });
        }
    });
});

app.get("/new/:ip/:template", function(req, res) {
    var ip = req.params.ip;
    var template = req.params.template;
    gen.generate(ip, template, function(file) {
      console.log(file);
        res.sendFile(file, {
            root: __dirname + "/cache"
        });
    });
});
