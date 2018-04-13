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
    subject: 'You have been hired!',
};


module.exports.sendMail = function (to, text,cb) {
    mailOptions.to=to;
    mailOptions.text=text;

    transporter.sendMail(to,text,cb);

}
