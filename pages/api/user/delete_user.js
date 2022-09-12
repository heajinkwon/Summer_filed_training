import executeQuery from "../../../../public/lib/db";

export default async function handler(req, res) {
  
  const deleteuser = req.body.deleteuser;

  try {
    const result = await executeQuery({
      query: "DELETE FROM sc_user WHERE loginname=?",
      values: [deleteuser.loginname]
    });

    res.status(200).json({ result: result })
  } catch (error) {
    console.error(error);
  }
}