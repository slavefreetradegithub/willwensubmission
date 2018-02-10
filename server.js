var express = require("express");
var path = require("path")
var app = express();
var bodyParser = require("body-parser"); //handles form submission data from post
//Server anything in the webpage directory
app.use(express.static(path.join(__dirname ,'webpage/')))
app.use(bodyParser.urlencoded());
app.post("/data", (req, res) => { //access body of post request

//make variables for each data point (in form.html, name="XYZ" --> var XYZ=req.body.XYZ)
    var optionsRadios=req.body.optionsRadios;


//do what u want w data here, before res.end
    console.log(optionsRadios);


    res.end("data!") //ends ur processing


});

app.listen(9000, () => console.log('Slavefreetrade on port 9000!'))