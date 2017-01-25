const expect = require('chai').expect;
const {
    getLinks
} = require('.');
const state = require('../../testDb.json');

describe('links', () => {
    describe('getLinks', () => {
        it('gets the list of all links', () => {
            const links = getLinks(state);

            expect(links)
                .to.exist;
            expect(links[0])
                .to.equal(state.links[2]);
            expect(links[1])
                .to.equal(state.links[0]);
            expect(links[2])
                .to.equal(state.links[1]);
        });
    });
});
