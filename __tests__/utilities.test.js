const { Test } = require('supertest')
const { makeReviewObject } = require('../utilities/utilities')

describe('makeReviewObject', () => {
    test('Returns an empty object if passed no arguments', () =>{
        expect(makeReviewObject()).toEqual({})
    })
    test('Adds a comment_count key value pair to a single review object', () => {
        const Comments = [{
            comment_id: 1,
            author: 'bainesface',
            review_id: 2,
            votes: 16,
            created_at: '2017-11-22 12:43:33.389+00',
            body: 'I loved this game too!'
          }]
        const Reviews = []
    })
})