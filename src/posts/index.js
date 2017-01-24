const { createSelector } = require('reselect');

const DEFAULT_PAGE_SIZE = 20;

const getPosts = createSelector(
    state => state,
    state => state.posts
);
exports._getPosts = getPosts;

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
