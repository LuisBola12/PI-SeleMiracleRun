const nodemailer = require( 'nodemailer' );

const getTransporter = function () {
  let transporter;
  transporter = nodemailer.createTransport( 
    {
      host: '',
      port: 465,
      secure: true,
      auth: {
        user: '',
        pass: ''
      },
      tls: {
        rejectUnauthorized: false
      }
    } );
  return transporter;
};

exports.sendEmail = async ( emailFormat ) => {
  let transporter = getTransporter();
  await transporter.sendMail( emailFormat );
};
