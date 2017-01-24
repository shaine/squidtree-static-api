const expect = require('chai').expect;
const {
    getDenormalizedPost,
    getPostById,
    getPosts,
    getPostsByPage,
    getPostsHasNextPage
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

    describe('getPostById', () => {
        const posts = getPosts(state);

        it('returns a post by its ID', () => {
            expect(getPostById(state, 3))
                .to.eql(getDenormalizedPost(state, posts[2]));
        });

        it('returns undefined if a post is not found', () => {
            expect(getPostById(state, 'foobar'))
                .to.be.null;
        });
    });

    describe('getPostsByPage', () => {
        const posts = getPosts(state);

        it('gets this first page of posts', () => {
            expect(getPostsByPage(state, 0, 2))
                .to.eql([
                    getDenormalizedPost(state, posts[0]),
                    getDenormalizedPost(state, posts[1])
                ]);
        });

        it('gets the second page of posts', () => {
            expect(getPostsByPage(state, 1, 2))
                .to.eql([
                    getDenormalizedPost(state, posts[2]),
                    getDenormalizedPost(state, posts[3])
                ]);
        });

        it('gets the default number of posts', () => {
            expect(getPostsByPage(state, 0))
                .to.eql(posts.slice(0, 20).map(post => getDenormalizedPost(state, post)));
        });
    });

    describe('getPostsHasNextPage', () => {
        it('returns true if posts size is bigger than end of page', () => {
            const arr = [];
            arr.length = 6;

            expect(getPostsHasNextPage.resultFunc(arr, 0, 5))
                .to.be.true;
        });

        it('returns false if posts size is less than the end of page', () => {
            const arr = [];
            arr.length = 3;

            expect(getPostsHasNextPage.resultFunc(arr, 0, 5))
                .to.be.false;
        });

        it('returns false if posts size is equal to the end of page', () => {
            const arr = [];
            arr.length = 10;

            expect(getPostsHasNextPage.resultFunc(arr, 1, 5))
                .to.be.false;
        });
    });
});
