import { executeQuery } from "../database/database.js";

const getAllUsers = async() => {
  const res = await executeQuery("SELECT * FROM users ORDER BY id DESC LIMIT 50");
  if (res && res.rowCount > 0) {
    return res.rowsOfObjects();
  }
  return [];
}

const getUserByEmail = async(email) => {
  return await executeQuery("SELECT * FROM users WHERE email = $1", email);
}

const isEmailReserved = async(email) => {
  const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
  if (existingUsers.rowCount > 0) {
    return true; // True, if a corresponding user was found
  } else return false //False, if no user was found
}

const createNewUser = async(email, hash) => {
  await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);

}

export { getAllUsers, getUserByEmail, isEmailReserved, createNewUser }
