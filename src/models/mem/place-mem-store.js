import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { categoryMemStore } from "./category-mem-store.js";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(categoryId, place) {
    const category = await categoryMemStore.getCategoryById(categoryId);
    place._id = v4();
    place.categoryid = category._id;
    place.categorytitle = category.title;
    places.push(place);
    return place;
  },

  async getPlacesByCategoryId(categoryId) {
    return places.filter((place) => place.categoryid === categoryId);
  },

  async getPlaceById(id) {
    let p = places.find((place) => place._id === id);
    if (!p) p = null;
    return p;
  },

  async deletePlaceById(id) {
    const p = places.findIndex((place) => place._id === id);
    if (p !== -1 ) places.splice(p, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.placename = updatedPlace.placename;
    place.longitude = updatedPlace.longitude;
    place.latitude = updatedPlace.latitude;
    place.description = updatedPlace.description;
    place.categoryid = updatedPlace.categoryid;
    place.categorytitle = updatedPlace.categorytitle;
  },
};