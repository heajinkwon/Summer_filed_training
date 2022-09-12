import executeQuery from '../../../../public/lib/db';

export default async function handler(req, res) {
  try {
    const result = await executeQuery({
      query:
        'SELECT sc_user.userno, loginname, name, logindate, ipaddr, success FROM sc_user JOIN sc_login_history ON sc_user.userno = sc_login_history.userno;',
      values: [1],
    });

    res.status(200).json({ result: result });
  } catch (error) {
    console.error(error);
  }
}
