const { createSelector } = require('reselect');

const getUsers = createSelector(
    state => state,
    state => state.users
);
exports.getUsers = getUsers;

const getUserById = createSelector(
    getUsers,
    (state, id) => id,
    (users, id) => users.find(user => user.id === id)
);
exports.getUserById = getUserById;
