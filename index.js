const express = require('express');
const app = express();

const config = require('./config');
const client = require('twilio')(config.accountSID, config.authToken);

const port = 3000;


app.get('/login', (req,res) => {
    if(req.query.phonenumber){
        client
        .verify
        .services(config.serviceID)
        .verifications
        .create({
            to : `+${req.query.phonenumber}`,
            channel : req.query.channel
        })
        .then((data) => {
            res.status(200).send({
                message: "Verification is sent!!",
                phonenumber: req.query.phonenumber,
                data
            })
        })

    }else {
        res.status(400).send({
            message: "Wrong phone number :(",
            phonenumber: req.query.phonenumber,
            data
        })
     }
    

});

app.get('/verify', (req,res) => {
    if(req.query.phonenumber && req.query.code){
        client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to : `+${req.query.phonenumber}`,
            code : req.query.code
        })
        .then((data) => {
            res.status(200).send({
                message: "user is verified",
                data
            })
        })

    }else {
        res.status(400).send({
            message: "Wrong phone number or code :(",
            phonenumber: req.query.phonenumber,
            data
        })
    }
    
});










app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
});

