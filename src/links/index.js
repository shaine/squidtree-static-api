const { createSelector } = require('reselect');
const { sortByCreatedAt } = require('../helpers');

const getLinks = createSelector(
    state => state,
    state => sortByCreatedAt(state.links)
);
exports.getLinks = getLinks;
