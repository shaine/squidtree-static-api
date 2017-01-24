const expect = require('chai').expect;
const {
    getComments,
    getCommentsByPostId,
    getDenormalizedComment
} = require('./index');
const {
    getUserById
} = require('../users');
const state = require('../../testDb.json');

describe('comments', () => {
    describe('getComments', () => {
        it('gets the list of all comments in order', () => {
            const comments = getComments(state);

            expect(comments)
                .to.exist;
            expect(comments[0])
                .to.equal(state.comments[2]);
            expect(comments[1])
                .to.equal(state.comments[0]);
            expect(comments[2])
                .to.equal(state.comments[1]);
        });
    });

    describe('getDenormalizedComment', () => {
        it('denormalizes a comment entity', () => {
            expect(getDenormalizedComment(state, {
                id: 1,
                user_id: 1
            })).to.eql({
                id: 1,
                user_id: 1,
                user: getUserById(state, 1)
            });
        });
    });

    describe('getCommentsByPostId', () => {
        const comments = getComments(state);

        it('gets comments by post ID', () => {
            expect(getCommentsByPostId(state, 1))
                .to.eql([
                    getDenormalizedComment(state, comments[0]),
                    getDenormalizedComment(state, comments[2])
                ]);
        });
    });
});
