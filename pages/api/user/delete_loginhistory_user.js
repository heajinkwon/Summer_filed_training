import executeQuery from '../../../../public/lib/db';

export default async function handler(req, res) {
  const deleteuser = req.body.deleteuser;
  //console.log("deleteuser.js :: ",deleteuser.loginname);

  try {
    const result = await executeQuery({
      query: 'DELETE FROM sc_login_history WHERE userno=(SELECT userno FROM sc_user WHERE loginname=?);',
      values: [deleteuser.loginname, deleteuser.loginname],
    });

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
  }
}
