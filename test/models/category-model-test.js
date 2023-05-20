// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testOneCategory, testMultipleCategories } from "../fixtures.js";

suite("Category model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    for (let i = 0; i < testMultipleCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMultipleCategories[i] = await db.categoryStore.addCategory(testMultipleCategories[i]);
    }
  });

  test("Create a category", async () => {
    const newCategory = await db.categoryStore.addCategory(testOneCategory);
    assertSubset(testOneCategory, newCategory);
    assert.isDefined(newCategory._id);
  });

  test("Find a category", async () => {
    const newCategory = await db.categoryStore.addCategory(testOneCategory);
    const returnedCategory1 = await db.categoryStore.getCategoryById(newCategory._id);
    assertSubset(newCategory, returnedCategory1);
    const returnedCategory2 = await db.categoryStore.getCategoryByTitle(newCategory.title);
    assertSubset(newCategory, returnedCategory2);
  });

  test("Find a category - bad parameters", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
    assert.isNull(await db.categoryStore.getCategoryByTitle(""));
  });

  test("Delete a category", async () => {
    await db.categoryStore.deleteCategoryById(testMultipleCategories[0]._id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, testMultipleCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(testMultipleCategories[0]._id);
    assert.isNull(deletedCategory); 
  });

  test("Delete a category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad_id");
    const allCategories = await db.categoryStore.getAllCategories();
    assert.equal(allCategories.length, testMultipleCategories.length);
  });

  test("Delete all categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 3);
    await db.categoryStore.deleteAllCategories();
    returnedCategories = await db.categoryStore.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

});