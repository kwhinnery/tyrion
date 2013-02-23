module.exports = function(body, user, serverCallback) {
    var channel = body.split(' ')[1];
    if (channel === '') {
        serverCallback('Please specify a channel to unsubscribe.');
    }
    else {
        if (user.subs.indexOf(channel+',') === -1) {
            serverCallback('You are not subscribed to this channel.');
        }
        else {
            user.subs = user.subs.replace(channel+',', '');
            user.save(function(err, user) {
                if (err) {
                    serverCallback('There was an error unsubscribing from this channel. Please try again later.');
                }
                else {
                    serverCallback('You are now unsubscribed from: '+channel);
                }
            });
        }
    }
};