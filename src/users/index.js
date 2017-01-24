const { createSelector } = require('reselect');

const getUsers = createSelector(
    state => state,
    state => state.users
);
exports.getUsers = getUsers;

const getUserById = createSelector(
    getUsers,
    (state, id) => id,
    (users, id) => {
        const user = users.find(user => user.id === id)

        return {
            id: user.id,
            handle: user.handle
        }
    }
);
exports.getUserById = getUserById;
