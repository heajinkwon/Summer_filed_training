import executeQuery from "../../../public/lib/db";
export default async function handler(req, res) {

  jobData = req.body.jobData;

  try {
    const result = await executeQuery({
      query: 'INSERT INTO sc_job VALUES (, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      values: [jobData.name, jobData.check1, jobData.check2, jobData.check3, jobData.check4, 123, jobData.startDate, jobData.startDate, 1, jobData.status,0, jobData.target, jobData.startDate]
    });
    res.status(200).json(result)
  } catch (error) {
    console.error(error);
  }


}