// const { request } = require('express');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app')
const request = require('supertest')

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
           expect(categories).toBeInstanceOf(Array)
           expect(categories).toHaveLength(4)
           categories.forEach((category)=> {
               expect(category).toEqual(
                   expect.objectContaining({
                       slug: expect.any(String),
                       description: expect.any(String)
                   })
               )
           })
       })
   })
    })
})

describe.only("/api/reviews/:review_id", () => {
    describe("GET", () => {
        test("200 code and responds with a review object", () => {
            return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then(({ body }) => {
            const { review } = body;
            expect(review).toBeInstanceOf(Object)
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
                    comment_count: expect.any(String)

                })
            )
                    })
        })
        test("400 code and responds with Invalid input for an invalid id",() => {
            return request(app)
            .get("/api/reviews/notanid")
            .expect(400)
            .then((res) => {
            expect(res.body.msg).toBe("Invalid input")
            })
        })
        test("404 code and responds with Not Found for non-existent review id", () => {
            return request(app)
            .get("/api/reviews/99999")
            .expect(404)
            .then((res)=>{
            expect(res.body.msg).toBe("Not found")
            })
        })
    })
})

//need one test with 404 not found with e.g. /api/reviews/999999999
//second test with 400 bad request for /api/reviews/notanid