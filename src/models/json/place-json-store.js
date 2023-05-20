import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";
// eslint-disable-next-line import/no-cycle
import { categoryJsonStore } from "./category-json-store.js";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(categoryId, place) {
    await db.read();
    const category = await categoryJsonStore.getCategoryById(categoryId);
    place._id = v4();
    place.categoryid = categoryId;
    place.categorytitle = category.title;
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlacesByCategoryId(id) {
    await db.read();
    return db.data.places.filter((place) => place.categoryid === id);
  },

  async getPlaceById(id) {
    await db.read();
    let p = db.data.places.find((place) => place._id === id);
    if (p === undefined) p = null;
    return p;
  },

  async deletePlaceById(id) {
    await db.read();
    const p = db.data.places.findIndex((place) => place._id === id);
    if (p !== -1) db.data.places.splice(p, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },

  async updatePlace(place, updatedPlace) {
    place.placename = updatedPlace.placename;
    place.longitude = updatedPlace.longitude;
    place.latitude = updatedPlace.latitude;
    place.description = updatedPlace.description;
    place.categoryid = updatedPlace.categoryid;
    place.categorytitle = updatedPlace.categorytitle;
    await db.write();
  },
};