import executeQuery from '../../../../public/lib/db';
import crypto from 'crypto-js';

export default async function handler(req, res) {
  const adduser = req.body.adduser;
  // password 암호화하여 db에 저장
  const cryptoUserPW = crypto.SHA256(adduser.lgpwd).toString();
  //console.log('cryptoUserPW', cryptoUserPW);
  // phone 암호화하여 db에 저장
  const cryptoUserPHONE = crypto.AES.encrypt(adduser.phone, 'phone_encrypt').toString();
  //console.log('cryptoUserPHONE', cryptoUserPHONE);

  try {
    const result = await executeQuery({
      query: 'INSERT INTO sc_user VALUES(?,?,?,?,?,?,?,NOW())',
      values: [, adduser.loginname, cryptoUserPW, adduser.name, adduser.company, adduser.title, cryptoUserPHONE],
    });

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
  }
}
