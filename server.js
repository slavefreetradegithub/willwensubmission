var express = require("express");
var path = require("path")
//npm install express
var app = express();
//npm install body-parser
var bodyParser = require("body-parser"); //handles form submission data from post
//(or just npm install in correct directory and install everything needed automatically)

//

//Server anything in the webpage directory
app.use(express.static(path.join(__dirname ,'webpage/')))
app.use(bodyParser.urlencoded());
app.post("/data", (req, res) => { //access body of post request

//make variables for each data point (in form.html, name="XYZ" --> var XYZ=req.body.XYZ)
    var isPaidTooLow=req.body.isPaidTooLow;
    var isDangerInEmergency=req.body.isDangerInEmergency;
    var district=req.body.district;

//    var isDangerForSpeakingOut=req.body.isDangerForSpeakingOut;
//    var isDifferentJobDescription=req.body.isDifferentJobDescription;
//    var isIdentityRansomed=req.body.isIdentityRansomed;
//    var isChildLabor=req.body.isChildLabor;
//    var isCoercion=req.body.isCoercion;
//    var isInDebt=req.body.isInDebt;
//    var isRestrictedToLeave=req.body.isRestrictedToLeave;
//    var isDiscriminated=req.body.isDiscriminated;

//do what u want w data here, before res.end
//print on console to confirm
    console.log(isPaidTooLow);
    console.log(isDangerInEmergency);
    console.log(district);
//    console.log(isDangerForSpeakingOut);
//    console.log(isDifferentJobDescription);
//    console.log(isIdentityRansomed);
//    console.log(isChildLabor);
//    console.log(isCoercion);
//    console.log(isInDebt);
//    console.log(isRestrictedToLeave);
//    console.log(isDiscriminated);

    res.end("data!") //ends ur processing

});

app.listen(9000, () => console.log('Slavefreetrade on port 9000!'))
