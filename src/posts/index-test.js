const expect = require('chai').expect;
const {
    getDenormalizedPost,
    getPosts,
    getPostsByPage
} = require('./index');
const {
    getCommentsByPostId
} = require('../comments');
const {
    getUserById
} = require('../users');
const state = require('../../testDb.json');

describe('posts', () => {
    describe('getPosts', () => {
        it('gets the list of all posts in order', () => {
            const posts = getPosts(state);
            expect(posts[0])
                .to.equal(state.posts[2]);
            expect(posts[1])
                .to.equal(state.posts[0]);
            expect(posts[2])
                .to.equal(state.posts[1]);
        });
    });

    describe('getDenormalizedPost', () => {
        it('denormalizes a post entity', () => {
            expect(getDenormalizedPost(state, {
                id: 1,
                user_id: 1
            })).to.eql({
                id: 1,
                user_id: 1,
                user: getUserById(state, 1),
                comments: getCommentsByPostId(state, 1)
            });
        });
    });

    describe('getPostsByPage', () => {
        const posts = getPosts(state);

        it('gets this first page of posts', () => {
            expect(getPostsByPage(state, 0, 2))
                .to.eql([posts[0], posts[1]]);
        });

        it('gets the second page of posts', () => {
            expect(getPostsByPage(state, 1, 2))
                .to.eql([posts[2], posts[3]]);
        });

        it('gets the default number of posts', () => {
            expect(getPostsByPage(state, 0))
                .to.eql(posts.slice(0, 20));
        });
    });
});
