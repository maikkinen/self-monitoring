import { executeQuery } from "../database/database.js";

const getAllUsers = async() => {
  const res = await executeQuery("SELECT * FROM users ORDER BY id DESC LIMIT 50");
  if (res && res.rowCount > 0) {
    console.log("users: ", res.rowsOfObjects())
    return res.rowsOfObjects();
  }
  console.log("no users atm")
  return [];
}

const getUserByEmail = async(email) => {
  console.log("email", email)
  return await executeQuery("SELECT * FROM users WHERE email = $1", email);
}

const isEmailReserved = async(email) => {
  console.log("email", email)
  const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", email);
  if (existingUsers.rowCount > 0) {
    console.log('The email is already reserved.');
    return true; // True, if a corresponding user was found
  } else return false //False, if no user was found
}

const createNewUser = async(email, hash) => {
  console.log("creating new account in db");
  console.log("email: ", email);
  console.log("hash: ", hash);
  await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", email, hash);

}

export { getAllUsers, getUserByEmail, isEmailReserved, createNewUser }
