module.exports = function(body, user, serverCallback) {
    var channel = body.split(' ')[1];
    if (user.subs.indexOf(channel+',') === -1) {
        user.subs += channel+',';
        user.save(function(err, user) {
            if (err) {
                serverCallback('There was an error subscribing to this channel. Please try again later.');
            }
            else {
                serverCallback('You are now subscribed to: '+channel);
            }
        });
    }
    else {
        serverCallback('You are already subscribed to this channel.');
    }
};