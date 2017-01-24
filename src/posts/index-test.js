const expect = require('chai').expect;
const {
    _getDenormalizedPost,
    _getPosts,
    _getPostsByPage
} = require('./index');
const {
    _getUserById
} = require('../users');
const state = require('../../testDb.json');

describe('posts', () => {
    describe('getPosts', () => {
        it('gets the list of all posts', () => {
            expect(_getPosts(state))
                .to.exist
                .to.equal(state.posts);
        });
    });

    describe('getDenormalizedPost', () => {
        it('denormalizes a post entity', () => {
            expect(_getDenormalizedPost(state, {
                user_id: 1
            })).to.eql({
                user_id: 1,
                user: _getUserById(state, 1)
            });
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
                .to.eql(state.posts.slice(0, 20));
        });
    });
});
