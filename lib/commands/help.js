module.exports = function(body, user, serverCallback) {
    serverCallback('Available commands: STOP, /sub [channel name], /unsub [channel name]. To send a message, text "#channel [your message]"');
};