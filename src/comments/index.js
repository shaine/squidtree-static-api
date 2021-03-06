const { createSelector } = require('reselect');
const { sortByCreatedAt } = require('../helpers');
const {
    getUserById
} = require('../users');

const getComments = createSelector(
    state => state,
    state => sortByCreatedAt(state.comments)
);
exports.getComments = getComments;

const getDenormalizedComment = createSelector(
    (state, comment) => comment,
    (state, comment) => getUserById(state, comment.user_id),
    (comment, user) => Object.assign({}, comment, { user })
);
exports.getDenormalizedComment = getDenormalizedComment;

const getPostCommentsById = createSelector(
    state => state,
    getComments,
    (state, postId) => postId,
    (state, comments, postId) => comments.filter(
        comment => comment.post_id === postId && comment.type === 'post'
    ).map(comment => getDenormalizedComment(state, comment))
);
exports.getPostCommentsById = getPostCommentsById;

const getLinkCommentsById = createSelector(
    state => state,
    getComments,
    (state, postId) => postId,
    (state, comments, postId) => comments.filter(
        comment => comment.post_id === postId && comment.type === 'link'
    ).map(comment => getDenormalizedComment(state, comment))
);
exports.getLinkCommentsById = getLinkCommentsById;
