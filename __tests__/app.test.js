const { request } = require('express');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

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
       })
   })
    })
})