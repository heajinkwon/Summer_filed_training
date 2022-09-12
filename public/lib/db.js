import mysql from 'serverless-mysql';

const db = mysql({
    config: {
      host: '192.168.0.85',
      port: 23306,
      database: 'sccheck',
      user: 'sysclein',
      password: 'sysclein'
    }
});

export default async function executeQuery({ query, values }) {
    try {
      const results = await db.query(query, values);
      await db.end();
      return results;
    } catch (error) {
      return { error };
    }
}
