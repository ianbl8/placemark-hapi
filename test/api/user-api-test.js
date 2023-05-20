// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { testCredentials, testOneUser, testMultipleUsers } from "../fixtures.js";

const users = new Array(testMultipleUsers.length);

suite("User API tests", () => {

  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    await placemarkService.deleteAllUsers();
    for (let i = 0; i < testMultipleUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await placemarkService.createUser(testMultipleUsers[i]);
    }
    await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
  });

  teardown(async () => {

  });

  test("Create a user", async () => {
    const newUser = await placemarkService.createUser(testOneUser);
    assertSubset(testOneUser, newUser);
    assert.isDefined(newUser._id);
  });
  
  test("Find a user", async () => {
    const returnedUser = await placemarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });
  
  test("Find a user - bad parameters", async () => {
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("Find a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    try {
      const returnedUser = await placemarkService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("Delete all users", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

});