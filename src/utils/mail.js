const nodemailer = require("nodemailer");



module.exports = async function({from='',to='',subject='',text='',html=''}){
   const transport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'earline.kautzer42@ethereal.email',
            pass: 'ds7RRteG2XFAcC29yb'
        }
    });
    
    if(!from || !to){
        throw new Error('Missing from/or value');
    }
    await transport.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html // html body
    });
};