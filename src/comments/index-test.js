const expect = require('chai').expect;
const {
    getComments,
    getCommentsByPostId
} = require('./index');
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

    describe('getCommentsByPostId', () => {
        const comments = getComments(state);

        it('gets comments by post ID', () => {
            expect(getCommentsByPostId(state, 1))
                .to.eql([comments[0], comments[2]]);
        });
    });
});
