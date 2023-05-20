import { v4 } from "uuid";

let users = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id) {
    let u = users.find((user) => user._id === id);
    if (!u) u = null;
    return u;
  },

  async getUserByEmail(email) {
    let u = users.find((user) => user.email === email);
    if (!u) u = null;
    return u;
  },

  async deleteUserById(id) {
    const u = users.findIndex((user) => user._id === id);
    if (u !== -1 ) users.splice(u, 1);
  },

  async deleteAllUsers() {
    users = [];
  },
};