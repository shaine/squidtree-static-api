const { createSelector } = require('reselect');
const { sortByCreatedAt } = require('../helpers');

const getComments = createSelector(
    state => state,
    state => sortByCreatedAt(state.comments)
);
exports.getComments = getComments;

const getCommentsByPostId = createSelector(
    getComments,
    (state, postId) => postId,
    (comments, postId) => comments.filter(comment => comment.post_id === postId)
);
exports.getCommentsByPostId = getCommentsByPostId;
