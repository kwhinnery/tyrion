var config = require('../../config.js');

module.exports = function(body, user, serverCallback) {
    user.remove(function(err, user) {
        if (err) {
            serverCallback('There was an error unsubscribing your user. Please try again later.');
        }
        else {
            serverCallback('Thanks for chatting with '+config.serverName+'! You are unsubscribed.');
        }
    });
};