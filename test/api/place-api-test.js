// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { EventEmitter } from "events";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testCredentials, testOneUser, testCategoryForPlaces, testOnePlace, testMultiplePlaces } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Place API tests", () => {

  let user = null;
  let placesToVisit = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllPlaces();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    testCategoryForPlaces.userid = user._id;
    placesToVisit = await placemarkService.createCategory(testCategoryForPlaces);
  });

  teardown(async () => {

  });

  test("Create a place", async () => {
    const returnedPlace = await placemarkService.createPlace(placesToVisit._id, testOnePlace);
    assertSubset(testOnePlace, returnedPlace);
  });

  test("Create multiple places", async () => {
    for (let i = 0; i < testMultiplePlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(placesToVisit._id, testMultiplePlaces[i]);
    }
    const returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testMultiplePlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placemarkService.getPlace(returnedPlaces[i]._id);
      assertSubset(place, returnedPlaces[i]);
    }
  });

  test("Delete a place", async () => {
    for (let i = 0; i < testMultiplePlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(placesToVisit._id, testMultiplePlaces[i]);
    }
    let returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, testMultiplePlaces.length);
    for (let i = 0; i < returnedPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const place = await placemarkService.deletePlace(returnedPlaces[i]._id);
    }
    returnedPlaces = await placemarkService.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  test("Test a denormalised category", async () => {
    for (let i = 0; i < testMultiplePlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlace(placesToVisit._id, testMultiplePlaces[i]);
    }
    const returnedCategory = await placemarkService.getCategory(placesToVisit._id);
    assert.equal(returnedCategory.places.length, testMultiplePlaces.length);
    for (let i = 0; i < testMultiplePlaces.length; i += 1) {
      assertSubset(testMultiplePlaces[i], returnedCategory.places[i]);
    }
  });
});