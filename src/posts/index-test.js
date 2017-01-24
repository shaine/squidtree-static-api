const expect = require('chai').expect;
const {
    _getPosts,
    _getPostsByPage
} = require('./index');
const state = require('../../testDb.json');

describe('posts', () => {
    describe('getPosts', () => {
        it('gets the list of all posts', () => {
            expect(_getPosts(state))
                .to.equal(state.posts);
        });
    });

    describe('getPostsByPage', () => {
        it('gets this first page of posts', () => {
            expect(_getPostsByPage(state, 0, 2))
                .to.eql([state.posts[0], state.posts[1]]);
        });

        it('gets the second page of posts', () => {
            expect(_getPostsByPage(state, 1, 2))
                .to.eql([state.posts[2], state.posts[3]]);
        });

        it('gets the default number of posts', () => {
            expect(_getPostsByPage(state, 0))
                .to.eql(state.posts.slice(0, 19));
        });
    });
});
