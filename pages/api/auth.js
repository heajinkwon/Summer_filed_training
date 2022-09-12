import executeQuery from "../../../public/lib/db";

export default async function handler(req, res) {
  try {

    const result = await executeQuery({
      query: 'select * from sc_user',
      values: [1]
    });
    res.status(200).json({ result: result })
  } catch (error) {
    console.error(error);
  }
}