import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
import { PlaceSpec } from "../models/joi-schemas.js";

export const placeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const categories = await db.categoryStore.getCategoriesByUser(loggedInUser._id);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const viewData = {
        title: "Edit Place",
        user: loggedInUser,
        category: category,
        categories: categories,
        place: place,
      };
      return h.view("place-edit", viewData);
    },
  },

  updatePlace: {
    validate: {
      payload: PlaceSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("category-view", { title: "New place error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newCategory = await db.categoryStore.getCategoryByTitle(request.payload.categorytitle);
      const place = await db.placeStore.getPlaceById(request.params.placeid);
      const newPlace = {
        userid: loggedInUser._id,
        placename: request.payload.placename,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
        categoryid: newCategory._id,
        categorytitle: newCategory.title,
      };
      await db.placeStore.updatePlace(place, newPlace);
      return h.redirect(`/category/${category._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const category = await db.categoryStore.getCategoryById(request.params.id);
        const place = await db.placeStore.getPlaceById(request.params.placeid);
        const newPlace = place;
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          newPlace.img = url;
          await db.placeStore.updatePlace(place, newPlace);
        }
        return h.redirect(`/category/${category._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/category/${category._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
}