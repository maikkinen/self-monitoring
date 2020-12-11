import * as authService from "../../services/authService.js";

const getUsers = async({}) => {
  await authService.getAllUsers();
}

const login = async({}) => {
  console.log('login')
}

export { getUsers, login }