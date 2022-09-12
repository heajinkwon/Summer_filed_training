import executeQuery from '../../../../public/lib/db';
import crypto from 'crypto-js';

export default async function handler(req, res) {
  const modifyuser = req.body.modifyuser;
  //console.log('modifyuser.js :: ', modifyuser.loginname);
  const cryptoUserPW = crypto.SHA256(modifyuser.lgpwd).toString();
  const cryptoUserPHONE = crypto.AES.encrypt(modifyuser.phone, 'phone_encrypt').toString();

  try {
    const result = await executeQuery({
      query: 'UPDATE sc_user SET loginname=?,lgpwd=?,name=?,company=?,phone=?,title=? where loginname=?',
      values: [
        modifyuser.loginname,
        cryptoUserPW,
        modifyuser.name,
        modifyuser.company,
        cryptoUserPHONE,
        modifyuser.title,
        modifyuser.loginname,
      ],
    });

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
  }
}
