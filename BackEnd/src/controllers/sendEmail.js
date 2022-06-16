import { sendEmail } from '../config/Mailer';

const format = 
`
<div style="background: #133c54; color: white; font-size: 22px; font-weight: bold; text-align: center; height: 45px; line-height: 45px">
SeleMiracleRun
</div>
<p style="margin-top:20px; ">Buenas Javier Molina, la contraseña de su nueva cuenta de la empresa SeleMiracle Run es:</p>
<p style="font-weight: bold;">1234</p>
`;

// const nana = () =>{
//   return (
//     <>
//         <div style="background: #133c54; color: white; font-size: 18px; font-weight: bold">
//             SeleMiracleRun
//         </div>
//     </>

//   )
// }

// emailFormat
export const sendEMail = async ( ) => { 
  let mailFormat = {
    from: 'selemiraclerun22@gmail.com',
    to: 'jdvenegas50@gmail.com',
    subject: 'Nueva Cuenta SeleMiracleRun',
    html: format,
  }; 
  await sendEmail( mailFormat );
  console.log( 'Se envio correctamente' );
};