const nodemailer = require( 'nodemailer' );

const getTransporter = function () {
  let transporter;
  transporter = nodemailer.createTransport( 
    {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'selemiraclerun22@gmail.com',
        pass: 'qfmlmammasmpbtcj'
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
