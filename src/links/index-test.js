const expect = require('chai').expect;
const {
    _getLinks
} = require('./index');
const state = require('../../testDb.json');

describe('links', () => {
    describe('getLinks', () => {
        it('gets the list of all links', () => {
            expect(_getLinks(state))
                .to.equal(state.links);
        });
    });
});
