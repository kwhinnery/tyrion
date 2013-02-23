var tyrion = require('../lib');

describe('tyrion\'s SMS message parser', function() {
    it('should print out a list of all available commands for a given user', function() {
        var commandList = tyrion.parseBody('/help')[0].body;
        expect(typeof commandList).toBe('string');
    });
});