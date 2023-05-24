import { Place } from "./place.js";
// eslint-disable-next-line import/no-cycle
import { categoryMongoStore } from "./category-mongo-store.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async addPlace(categoryId, place) {
    const category = await categoryMongoStore.getCategoryById(categoryId);
    place.categoryid = categoryId;
    place.categorytitle = category.title;
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getPlacesByCategoryId(id) {
    const places = await Place.find({ categoryid: id }).lean();
    return places;
  },

  async getPlacesByUser(id) {
    const places = await Place.find({ userid: id }).lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      return place;
    }
    return null;
  },

  async deletePlaceById(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  },

  async updatePlace(place, updatedPlace) {
    await Place.updateOne({ _id: place._id }, {
      placename: updatedPlace.placename,
      longitude: updatedPlace.longitude,
      latitude: updatedPlace.latitude,
      description: updatedPlace.description,
      categoryid: updatedPlace.categoryid,
      categorytitle: updatedPlace.categorytitle,
      img: updatedPlace.img,
     });
     return this.getPlaceById(place._id);

  },
};