var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'miraj4footprints@gmail.com',
        pass: 'getthefuckout'
    }
});

var mailOptions = {
    from: 'miraj4footprints@gmail.com',
    subject: 'Freelancer.com | You have been hired!',
};


module.exports.sendMail = function (to, text,cb) {
    mailOptions.to=to;
    mailOptions.text=text;

    console.log(mailOptions);

    transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
    });

}
