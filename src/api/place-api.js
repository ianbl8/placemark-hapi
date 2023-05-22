import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlaceSpec, PlaceSpecPlus, PlaceArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const placeApi = {

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const place = request.payload;
        place.userid = user._id;
        place.latitude = Number(request.payload.latitude);
        place.longitude = Number(request.payload.longitude);
        const newPlace = await db.placeStore.addPlace(request.payload.categoryid, place);
        if (newPlace) {
          return h.response(newPlace).code(201);
        }
        return Boom.badImplementation("error creating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a place",
    notes: "Creates a new place and returns its saved details.",
    validate: { payload: PlaceSpec },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const oldPlace = await db.placeStore.getPlaceById(request.payload._id);
        const category = await db.categoryStore.getCategoryById(request.payload.categoryid);
        const place = {
          userid: user._id,
          placename: request.payload.placename,
          latitude: Number(request.payload.latitude),
          longitude: Number(request.payload.longitude),
          description: request.payload.description,
          categoryid: category._id,
          categorytitle: category.title,
        };
        const newPlace = await db.placeStore.updatePlace(oldPlace, place);
        if (newPlace) {
          return h.response(newPlace).code(201);
        }
        return Boom.badImplementation("error updating place");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a place",
    notes: "Updates a place and returns its saved details.",
    /*
    validate: { payload: PlaceSpec },
    response: { schema: PlaceSpecPlus, failAction: validationError },
    */
  },

  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const places = await db.placeStore.getAllPlaces();
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all place details",
    notes: "Returns place details (name, location, description etc) for all places",
    response: { schema: PlaceArray, failAction: validationError },
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = request.auth.credentials;
        const places = await db.placeStore.getPlacesByUser(user._id);
        return places;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all place details",
    notes: "Returns place details (name, location, description etc) for all places",
    response: { schema: PlaceArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No place with this id");
        }
        return place;
      } catch (err) {
        return Boom.serverUnavailable("No place with this id");
      }
    },
    tags: ["api"],
    description: "Get a place's details",
    notes: "Returns place details (name, location, description etc) for one specified place",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaceSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const place = await db.placeStore.getPlaceById(request.params.id);
        if (!place) {
          return Boom.notFound("No Place with this id");
        }
        await db.placeStore.deletePlaceById(place._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Place with this id");
      }
    },
    tags: ["api"],
    description: "Delete a place",
    notes: "Deletes data stored for a place",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placeStore.deleteAllPlaces();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all places",
    notes: "Deletes all place data stored",
  },
};
