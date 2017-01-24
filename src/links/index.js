const { createSelector } = require('reselect');

const getLinks = createSelector(
    state => state,
    state => state.links
);
exports.getLinks = getLinks;
