const expect = require('chai').expect;
const {
    sortByCreatedAt
} = require('./index');

describe('helpers', () => {
    describe('sortByCreatedAt', () => {
        it('sorts object by their created_at field', () => {
            const list = [{
                created_at: '2004-07-19 12:29:13'
            }, {
                created_at: '2004-07-19 21:29:13'
            }, {
                created_at: '2002-07-19 21:29:13'
            }];

            expect(sortByCreatedAt(list))
                .to.eql([list[2], list[0], list[1]]);
        });
    });
});
