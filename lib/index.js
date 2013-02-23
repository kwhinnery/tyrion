var twilio = require('twilio'),
    config = require('../config');

// Expose models
var User = require('./User');
exports.User = User;

//create client
var client = twilio(config.accountSid, config.authToken);

//Supported commands
var CMD = [
    'STOP',
    '/help',
    '/sub',
    '/unsub'
];

//Parse an incmoing message for supported commands
function isCommand(message) {
    for (var i = 0, l = CMD.length; i<l; i++) {
        if (message.indexOf(CMD[i]) === 0) {
            return true;
        }
    }
    return false;
}

//Initialize server environment
exports.init = function() {
    //Create admin users, if they don't already exist
    config.admins.forEach(function(adminPhone) {
        User.findOne({
            phone:adminPhone
        }, function(err, admin) {
            if (!admin) {
                var user = new User({
                    phone:adminPhone,
                    admin:true,
                    subs:config.defaultChannel+','
                });

                user.save(function(err, user) {
                    console.log(user.phone+' added as admin');
                });
            }
            else {
                console.log('admin already created for '+adminPhone);
            }
        });
    });
};

// Parse and handle the body of an incoming SMS text message
exports.parseBody = function(body, from, serverCallback) {
    //Start the pyramid of doom with finding the user...
    User.findOne({
        phone:from
    }, function(err, user) {
        //If there was no user, create one and subscribe them to the default channel
        if (!user) {
            var u = new User({
                phone:from,
                subs:config.defaultChannel+','
            });
            u.save(function(saveError, u) {
                if (!saveError) {
                    serverCallback(
                        'Thanks for subscribing to '+config.serverName+
                        '! Text "STOP" to unsubscribe, "/help" for more options'
                    );
                }
                else {
                    serverCallback('There was an error subscribing you to '+config.serverName+'. Please try again later.');
                }
            });
        }

        //Otherwise, parse their message and process accordingly
        else {
            if (isCommand(body)) {
                //load and execute command
                var command;
                if (body.indexOf('STOP') === 0) {
                    command = require('./commands/STOP');
                }
                else {
                    var cmdString = body.substring(1).split(' ')[0];
                    command = require('./commands/'+cmdString);
                }
                command(body, user, serverCallback);
            }
            else {
                //If it's not a command, it's either a post or junk
                if (body.indexOf('#') === 0) {
                    var bodyParts = body.split(' ');

                    var displayChan = bodyParts[0],
                        content = bodyParts.slice(1).join(' ');

                    var channel = displayChan.substring(1);

                    //Determine if this is a protected channel
                    if ((config.protectedChannels.indexOf(channel) > -1) && !user.admin) {
                        serverCallback('Sorry - you do not have the ability to post on this channel.');
                    }
                    else {
                        //Send the message to all subscribed users
                        User.find({
                            subs:new RegExp(channel+',', 'i')
                        }, function(err, users) {
                            if (err) {
                                serverCallBack('Couldn\'t post message to channel #'+channel);
                            }
                            else {
                                console.log(users.length);
                                users.forEach(function(user) {
                                    client.sendSms({
                                        to:user.phone,
                                        from:config.number,
                                        body:'['+displayChan+'] '+content
                                    });
                                });
                                serverCallback();
                            }
                        });
                    }
                }
                else {
                    serverCallback("I'm sorry, I didn't understand that. Text /help for options, STOP to unsubscribe.");
                }
            }
        }
    });
};