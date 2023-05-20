/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
import axios from "axios";
import { serviceUrl, testOneUser } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return response.data;
  },

  async getAllUsers() {
    const response = await axios.get(`${this.placemarkUrl}/api/users`);
    return response.data;
  },

  async getUser(id) {
    const response = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return response.data;
  },

  async deleteAllUsers() {
    const response = await axios.delete(`${this.placemarkUrl}/api/users`);
    return response.data;
  },

  async createCategory(category) {
    const response = await axios.post(`${this.placemarkUrl}/api/categories`, category);
    return response.data;
  },

  async getCategory(id) {
    const response = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
    return response.data;
  },

  async getAllCategories() {
    const response = await axios.get(`${this.placemarkUrl}/api/categories`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
    return response;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.placemarkUrl}/api/categories`);
    return response.data;
  },

  async createPlace(id, place) {
    const response = await axios.post(`${this.placemarkUrl}/api/categories/${id}/places`, place);
    return response.data;
  },

  async getPlace(id) {
    const response = await axios.get(`${this.placemarkUrl}/api/places/${id}`);
    return response.data;
  },

  async getAllPlaces() {
    const response = await axios.get(`${this.placemarkUrl}/api/places`);
    return response.data;
  },

  async deletePlace(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/places/${id}`);
    return response;
  },

  async deleteAllPlaces() {
    const response = await axios.delete(`${this.placemarkUrl}/api/places`);
    return response.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

};