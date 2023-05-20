import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { placeMemStore } from "./place-mem-store.js";

let categories = [];

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async getCategoriesByUser(userid) {
    return categories.filter((category) => category.userid === userid);
  },

  async addCategory(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id) {
    let c = categories.find((category) => category._id === id);
    if (!c) {
      c = null;
    } else {
      c.places = await placeMemStore.getPlacesByCategoryId(c._id);
    }
    return c;
  },

  async getCategoryByTitle(title) {
    let c = categories.find((category) => category.title === title);
    if (!c) {
      c = null;
    } else {
      c.places = await placeMemStore.getPlacesByCategoryId(c._id);
    }
    return c;
  },

  async deleteCategoryById(id) {
    const c = categories.findIndex((category) => category._id === id);
    if (c !== -1 ) categories.splice(c, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },

  async updateCategory(category, updatedCategory) {
    category.title = updatedCategory.title;
  },
};