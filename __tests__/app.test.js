// const { request } = require('express');
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");
const { get } = require("express/lib/response");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    test("200 code and responds with an array of category objects with slug and description properties", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          const { categories } = body;
          expect(categories).toBeInstanceOf(Array);
          expect(categories).toHaveLength(4);
          categories.forEach((category) => {
            expect(category).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});

describe("GET /api/reviews/:review_id", () => {
  describe("GET", () => {
    test("200 code and responds with a review object", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          const { review } = body;
          expect(review).toBeInstanceOf(Object);
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              review_body: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            })
          );
        });
    });
    test("400 code and responds with Bad request for an invalid id", () => {
      return request(app)
        .get("/api/reviews/notanid")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
    test("404 code and responds with Not Found for non-existent review id", () => {
      return request(app)
        .get("/api/reviews/99999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  describe("PATCH", () => {
    test("200 code and responds with the updated review", () => {
      const newVote = {
        inc_votes: 50,
      };
      return request(app)
        .patch("/api/reviews/3")
        .send(newVote)
        .expect(200)
        .then(({ body }) => {
          const { review } = body;
          expect(review).toBeInstanceOf(Object);
          expect(review.votes).toBe(55);
        });
    });
    test("400 code and responds with Bad request for invalid request object", () => {
      const invalidObj = {
        invalid: "string",
      };
      return request(app)
        .patch("/api/reviews/1")
        .send(invalidObj)
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
    test("404 code and responds with not found for non-existent review ID", () => {
      const newVote = {
        inc_votes: 50,
      };
      return request(app)
        .patch("/api/reviews/123456789")
        .send(newVote)
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});
describe("GET /api/reviews", () => {
  describe("GET", () => {
    test("200 code and responds with a review array of reviews objects with no queries", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const { reviews } = body;
          expect(reviews).toBeInstanceOf(Array);
          reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
        });
    });
    test("reviews sorted by descending date by default", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const { reviews } = body;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("reviews sorted by ascending review_id with correct request", () => {
      return request(app)
        .get("/api/reviews?order=asc&sort_by=review_id")
        .expect(200)
        .then(({ body }) => {
          const { reviews } = body;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews).toBeSortedBy("review_id", { ascending: true });
        });
    });
    test("400 code and responds with bad request for invalid request", () => {
      return request(app)
        .get("/api/reviews?order=asc&sort_by=invalid")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
  });
});

describe.only("GET /api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    test("200 and responds with array of comments for the given review_id", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeInstanceOf(Array);
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("200 and returns an empty array if review_id is correct but there are no comments", () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments.length).toBe(0);
        });
    });
    test("404 and responds with not found if review_id doesn't exist", () => {
      return request(app)
        .get("/api/reviews/1234567/comments")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
    test("400 and responds with bad request if review_id is invalid", () => {
      return request(app)
        .get("/api/reviews/invalid/comments")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
  });
});
