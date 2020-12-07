import { Client } from "../deps.js";
import { Pool } from "../deps.js";
import { config } from "../config/config.js";


// Will have to modify this one!
const getClient = () => {
  return new Client(config.database);
}

/**
 * 
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "wapwbqll",
  user: "wapwbqll",
  password: "QeHFQbN-ADSS7ECBJ4XWdhNzZ71nDJFp",
  port: 5432
}, 5);
 * 
 * 
 * 
 */

const executeQuery = async (query, ...args) => {
  const client = getClient();
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

export { executeQuery };

/**
 * const executeQuery = async (query, ...params) => {
  const client = await connectionPool.connect();
  try {
    return await client.query(query, ...params);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
  }

  return null;
};
 *
 *
 *
 *
 */