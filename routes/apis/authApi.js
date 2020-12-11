import * as authService from "../../services/authService.js";

const getUsers = async({}) => {
  await authService.getAllUsers();
}

export { getUsers }