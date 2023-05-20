// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { EventEmitter } from "events";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testCredentials, testOneUser, testOneCategory, testMultipleCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {

  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    testOneCategory.userid = user._id;
  });

  teardown(async () => {

  });

  test("Create a category", async () => {
    const returnedCategory = await placemarkService.createCategory(testOneCategory);
    assertSubset(testOneCategory, returnedCategory);
    assert.isNotNull(returnedCategory);
  });

  test("Create multiple categories", async () => {
    for (let i = 0; i < testMultipleCategories.length; i += 1) {
      testMultipleCategories[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCategory(testMultipleCategories[i]);
    }
    let returnedLists = await placemarkService.getAllCategories();
    assert.equal(returnedLists.length, testMultipleCategories.length);
    await placemarkService.deleteAllCategories();
    returnedLists = await placemarkService.getAllCategories();
    assert.equal(returnedLists.length, 0);
  });

  test("Delete a category", async () => {
    const category = await placemarkService.createCategory(testOneCategory);
    const response = await placemarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await placemarkService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("Delete a category - fail", async () => {
    try {
      const response = await placemarkService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

});