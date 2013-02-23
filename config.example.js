module.exports = {

    // CHANGE ME: Your Twilio account SID
    accountSid:'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    // CHANGE ME: Your Twilio auth token
    authToken:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    // CHANGE ME: A Twilio number you control
    number:'+15556667777',

    // CHANGE ME: Connection URL to a MongoDB instance, used by Mongoose
    mongoUrl:'mongodb://MONGO_USER:PASSWORD@SERVER.mongohq.com:10069/NAME_OF_DATABASE',

    // CHANGE ME: Phone Numbers of the admins for this server
    admins: [
        '+15556667777',
        '+15556667777'
    ],

    //A friendly name for your server
    serverName:'Kevin\'s Chat Server',

    //Default channel
    defaultChannel: 'ann',

    //channels only administrators can post to
    protectedChannels: [
        'ann'
    ]
};