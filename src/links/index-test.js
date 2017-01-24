const expect = require('chai').expect;
const {
    getLinks
} = require('./index');
const state = require('../../testDb.json');

describe('links', () => {
    describe('getLinks', () => {
        it('gets the list of all links', () => {
            expect(getLinks(state))
                .to.exist
                .to.equal(state.links);
        });
    });
});
