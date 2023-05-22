import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CategorySpec, CategorySpecPlus, CategoryArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const categoryApi = {
  
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const category = request.payload;
        category.userid = user._id;
        const newCategory = await db.categoryStore.addCategory(category);
        if (newCategory) {
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error creating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a category",
    notes: "Creates a new category and returns its saved details.",
    validate: { payload: CategorySpec },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const oldCategory = await db.categoryStore.getCategoryById(request.payload._id);
        const category = {
          userid: user._id,
          title: request.payload.title,
        };
        const newCategory = await db.categoryStore.updateCategory(oldCategory, category);
        if (newCategory) {
          for (let i = 0; i < newCategory.places.length; i += 1) {
            newCategory.places[i].categorytitle = request.payload.title;
            // eslint-disable-next-line no-await-in-loop
            await db.placeStore.updatePlace(oldCategory.places[i], newCategory.places[i]);
          };
          return h.response(newCategory).code(201);
        }
        return Boom.badImplementation("error updating category");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a category",
    notes: "Updates a category and returns its saved details. Also updates the category title for any places within that category.",
    /*
    validate: { payload: CategorySpec },
    response: { schema: CategorySpecPlus, failAction: validationError },
    */
  },

  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const categories = await db.categoryStore.getAllCategories();
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all category details",
    notes: "Returns category details (title) for all categories",
    response: { schema: CategoryArray, failAction: validationError },
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const categories = await db.categoryStore.getCategoriesByUser(user._id);
        return categories;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all category details for one user",
    notes: "Returns category details (title) for one user",
    response: { schema: CategoryArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        return category;
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Get a category's details",
    notes: "Returns category details (title) for one specified category",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CategorySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        await db.categoryStore.deleteCategoryById(category._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Category with this id");
      }
    },
    tags: ["api"],
    description: "Delete a category",
    notes: "Deletes data stored for a category",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.categoryStore.deleteAllCategories();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all categorys",
    notes: "Deletes all category data stored",
  },
};