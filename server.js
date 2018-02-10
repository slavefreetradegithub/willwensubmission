var express = require("express");
var path = require("path")
var app = express();
//Server anything in the webpage directory
app.use(express.static(path.join(__dirname ,'webpage/')))
// app.get("/light_on_max", (req, res) => {
// });

app.listen(9000, () => console.log('Example app listening on port 9000!'))