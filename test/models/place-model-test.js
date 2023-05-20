// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testCategoryForPlaces, testOnePlace, testMultiplePlaces } from "../fixtures.js";

suite("Place model tests", () => {

  let testCategory = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.placeStore.deleteAllPlaces();
    testCategory = await db.categoryStore.addCategory(testCategoryForPlaces);
    for (let i = 0; i < testMultiplePlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMultiplePlaces[i] = await db.placeStore.addPlace(testCategory._id, testMultiplePlaces[i]);
    }
  });

  test("Create a place", async () => {
    const newCategory = await db.categoryStore.addCategory(testCategoryForPlaces);
    const newPlace = await db.placeStore.addPlace(newCategory._id, testOnePlace);
    assertSubset(testOnePlace, newPlace);
    assert.isDefined(newPlace._id);
  });

  test("Find a place", async () => {
    const newCategory = await db.categoryStore.addCategory(testCategoryForPlaces);
    const newPlace = await db.placeStore.addPlace(newCategory._id, testOnePlace);
    const returnedPlace = await db.placeStore.getPlaceById(newPlace._id);
    assert.deepEqual(newPlace, returnedPlace);
  });

  test("Find a place - fail", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("Delete a place", async () => {
    await db.placeStore.deletePlaceById(testMultiplePlaces[0]._id);
    const returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, testMultiplePlaces.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(testMultiplePlaces[0]._id);
    assert.isNull(deletedPlace); 
  });

  test("Delete a place - fail", async () => {
    await db.placeStore.deletePlaceById("bad_id");
    const allPlaces = await db.placeStore.getAllPlaces();
    assert.equal(allPlaces.length, testMultiplePlaces.length);
  });

  test("Delete all places", async () => {
    let returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, 3);
    await db.placeStore.deleteAllPlaces();
    returnedPlaces = await db.placeStore.getAllPlaces();
    assert.equal(returnedPlaces.length, 0);
  });

  teardown(async () => {
    testCategory = await db.categoryStore.deleteAllCategories();
  });

});