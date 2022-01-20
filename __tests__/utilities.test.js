const { Test } = require("supertest");
const { checkReviewExists } = require("../Utilities/utilities");

describe("makeReviewObject", () => {
  test("Returns true for an existing house ID", () => {
    return checkReviewExists(1).then((res) => {
      expect(res).toBe(true);
    });
  });
  test("Returns false for a non-existent house ID", () => {
    return checkReviewExists(12345).then((res) => {
      expect(res).toBe(false);
    });
  });
});
