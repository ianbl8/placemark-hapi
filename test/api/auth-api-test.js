import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { testCredentials, testOneUser } from "../fixtures.js";
import { decodeToken } from "../../src/api/jwt-utils.js";

suite("Authentication API tests", async () => {

  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(testOneUser);
    await placemarkService.authenticate(testCredentials);
    await placemarkService.deleteAllUsers();
  });

  test("Authenticate", async () => {
    const returnedUser = await placemarkService.createUser(testOneUser);
    const response = await placemarkService.authenticate(testCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("Verify token", async () => {
    const returnedUser = await placemarkService.createUser(testOneUser);
    const response = await placemarkService.authenticate(testCredentials);
    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("Check unauthorized", async () => {
    placemarkService.clearAuth();
    try {
      await placemarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});