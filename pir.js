var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://thedidip%40gmail.com:9851200610@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Smart Thermostat <thedidip@gmail.com>', // sender address
    to: 'dipesh009@gmail.com', // list of receivers
    subject: 'Intruder Detected ', // Subject line
    text: 'Someone is stealing your Magic Pencil ', // plaintext body
    html: '<b>Someone is stealing your Magic Pencil</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

