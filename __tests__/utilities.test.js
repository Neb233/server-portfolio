const { Test } = require("supertest");
const {
  checkReviewExists,
  checkUserExists,
  checkCommentExists,
} = require("../Utilities/utilities");
const db = require("../db/connection.js");
const TestAgent = require("supertest/lib/agent");

afterAll(() => db.end());

describe("Function that checks if the review exists in the DB", () => {
  test("Returns true for an existing review ID", () => {
    return checkReviewExists(1).then((res) => {
      expect(res).toBe(true);
    });
  });
  test("Returns false for a non-existent review ID", () => {
    return checkReviewExists(12345).then((res) => {
      expect(res).toBe(false);
    });
  });
});

describe("Function that checks if the user exists in the DB", () => {
  test("Returns true for an existing Username", () => {
    return checkUserExists("mallionaire").then((res) => {
      expect(res).toBe(true);
    });
  });
  test("Returns false for an non-existen Username", () => {
    return checkUserExists("test").then((res) => {
      expect(res).toBe(false);
    });
  });
});
describe("Function that checks if the comment exists in the DB", () => {
  test("Returns true for an existing comment", () => {
    return checkCommentExists(1).then((res) => {
      expect(res).toBe(true);
    });
  });
  test("Returns false for a non-existent comment", () => {
    return checkCommentExists(1234567).then((res) => {
      expect(res).toBe(false);
    });
  });
});
