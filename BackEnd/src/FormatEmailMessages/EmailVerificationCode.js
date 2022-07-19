export const emailVerificationCode = ( email, randomToken ) => {
  const emailFormat = `
  <div>
  <div style='
    background: #133c54; 
    color: white; font-size: 22px; 
    font-weight: bold; 
    text-align: center; 
    line-height: 48px;
    margin-bottom: 30px;'>
    SeleMiracleRun
  </div>
  
  <div>${email} this email contains a verification code to change your password.</div>
  <br></br>
  <div>Your code is: <strong>${randomToken}</strong></div>
  <div>Expires in 15 minutes.</div>
  <br></br>
  <br></br>
  <div>Please do not share this message, it is for your security.</div>
  `;
  return emailFormat;
};