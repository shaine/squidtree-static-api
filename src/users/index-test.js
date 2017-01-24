const expect = require('chai').expect;
const {
    _getUsers,
    _getUserById
} = require('./index');
const state = require('../../testDb.json');

describe('users', () => {
    describe('getUsers', () => {
        it('gets the list of all users', () => {
            expect(_getUsers(state))
                .to.exist
                .to.equal(state.users);
        });
    });

    describe('getUserById', () => {
        it('gets a user by ID', () => {
            expect(_getUserById(state, 3))
                .to.exist
                .to.equal(state.users[1]);
        });
    });
});
