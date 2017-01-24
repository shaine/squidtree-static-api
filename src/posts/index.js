const { createSelector } = require('reselect');
const {
    _getUserById
} = require('../users');

const DEFAULT_PAGE_SIZE = 20;

const getPosts = createSelector(
    state => state,
    state => state.posts
);
exports._getPosts = getPosts;

const getDenormalizedPost = createSelector(
    (state, post) => _getUserById(state, post.user_id),
    (state, post) => post,
    (user, post) => Object.assign({}, post, { user })
);
exports._getDenormalizedPost = getDenormalizedPost;

const getPostsByPage = createSelector(
    getPosts,
    (state, page) => page,
    (state, page, size) => size,
    (posts, page, size = DEFAULT_PAGE_SIZE) => {
        const offset = page * size;

        return posts.slice(offset, offset + size);
    }
);
exports._getPostsByPage = getPostsByPage;
