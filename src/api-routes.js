import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/category-api.js";
import { placeApi } from "./api/place-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "GET", path: "/api/categories", config: categoryApi.findByUser },
  { method: "GET", path: "/api/categories/all", config: categoryApi.findAll },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "POST", path: "/api/categories/{id}/places", config: placeApi.create },
  { method: "GET", path: "/api/places", config: placeApi.findByUser },
  { method: "GET", path: "/api/places/all", config: placeApi.findAll },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },
];