// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { db } from "../../src/models/db.js";
import { testOneUser, testMultipleUsers } from "../fixtures.js";

suite("User model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAllUsers();
    for (let i = 0; i < testMultipleUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMultipleUsers[i] = await db.userStore.addUser(testMultipleUsers[i]);
    }
  });

  test("Create a user", async () => {
    const newUser = await db.userStore.addUser(testOneUser);
    assertSubset(testOneUser, newUser);
    assert.isDefined(newUser._id);
  });

  test("Find a user", async () => {
    const newUser = await db.userStore.addUser(testOneUser);
    const returnedUser1 = await db.userStore.getUserById(newUser._id);
    assert.deepEqual(newUser, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(newUser.email);
    assert.deepEqual(newUser, returnedUser2);
  });

  test("Find a user - bad parameters", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("Delete a user", async () => {
    await db.userStore.deleteUserById(testMultipleUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testMultipleUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testMultipleUsers[0]._id);
    assert.isNull(deletedUser); 
  });

  test("Delete a user - fail", async () => {
    await db.userStore.deleteUserById("bad_id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(allUsers.length, testMultipleUsers.length);
  });

  test("Delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAllUsers();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

});