const { createSelector } = require('reselect');
const { sortByCreatedAt } = require('../helpers');
const {
    getUserById
} = require('../users');
const {
    getCommentsByPostId
} = require('../comments');

const DEFAULT_PAGE_SIZE = 20;

const getPosts = createSelector(
    state => state,
    state => sortByCreatedAt(state.posts)
);
exports.getPosts = getPosts;

const getDenormalizedPost = createSelector(
    (state, post) => post,
    (state, post) => getUserById(state, post.user_id),
    (state, post) => getCommentsByPostId(state, post.id),
    (post, user, comments) => Object.assign({}, post, { user }, { comments })
);
exports.getDenormalizedPost = getDenormalizedPost;

const getPostsByPage = createSelector(
    getPosts,
    (state, page) => page,
    (state, page, size) => size,
    (posts, page, size = DEFAULT_PAGE_SIZE) => {
        const offset = page * size;

        return posts.slice(offset, offset + size);
    }
);
exports.getPostsByPage = getPostsByPage;
