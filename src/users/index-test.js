const expect = require('chai').expect;
const {
    getUsers,
    getUserById
} = require('./index');
const state = require('../../testDb.json');

describe('users', () => {
    describe('getUsers', () => {
        it('gets the list of all users', () => {
            expect(getUsers(state))
                .to.exist
                .to.equal(state.users);
        });
    });

    describe('getUserById', () => {
        it('gets a user by ID', () => {
            expect(getUserById(state, 3))
                .to.exist
                .to.equal(state.users[1]);
        });
    });
});
