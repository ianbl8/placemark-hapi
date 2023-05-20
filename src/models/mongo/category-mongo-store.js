import { Category } from "./category.js";
// eslint-disable-next-line import/no-cycle
import { placeMongoStore } from "./place-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoriesByUser(id) {
    const category = await Category.find({ userid: id }).lean();
    return category;
  },

  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.places = await placeMongoStore.getPlacesByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async getCategoryByTitle(title) {
    if (title) {
      const category = await Category.findOne({ title: title }).lean();
      if (category) {
        category.places = await placeMongoStore.getPlacesByCategoryId(category._id);
      }
      return category;
    }
    return null;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await Category.deleteMany({});
  },

  async updateCategory(category, updatedCategory) {
    await Category.updateOne({ _id: category._id}, { title: updatedCategory.title });
  },
};