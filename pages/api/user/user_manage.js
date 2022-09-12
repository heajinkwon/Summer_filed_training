import executeQuery from '../../../../public/lib/db';

export default async function handler(req, res) {
  const userno = req.body.userno;
  const login_status = req.body.login_status;

  //console.log("user_manage : ",userno, login_status);

  try {
    const result = await executeQuery({
      query: 'INSERT INTO sc_login_history VALUES(?,?,?,?,NOW())',
      values: [, userno, login_status, '1234.234'],
    });

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
  }
}
