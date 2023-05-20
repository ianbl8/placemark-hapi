// MemStores
import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

// JsonStores
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

// MongoStores
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  categoryStore: null,
  placeStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.categoryStore = categoryMongoStore;
        this.placeStore = placeMongoStore;
        connectMongo();
        break;
      case "json":
        this.userStore = userJsonStore;
        this.categoryStore = categoryJsonStore;
        this.placeStore = placeJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.categoryStore = categoryMemStore;
        this.placeStore = placeMemStore;
  }
},
};