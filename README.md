# Tyrion: An IRC-like Chat Server for SMS Messaging

Tyrion is an IRC-like chat server for SMS.  Tyrion is powered by [twilio](http://www.twilio.com) and
[node.js](http://www.nodejs.org).

## Configuration and Deployment

1. [Sign up for a Twilio account](http://www.twilio.com) and upgrade it so you can send messages to unverified numbers.
2. [Buy a telephone number](https://www.twilio.com/user/account/phone-numbers/available/local) to use with your server.
3. Configure a MongoDB instance to use as a data store for the application. [MongoHQ](http://www.mongohq.com) provides a great free tier of service you can use.
4. Clone or download the code in this repository.
5. Rename `config.example.js` to `config.js`
6. Open `config.js` and configure your Twilio account details and phone number. Also include your MongoDB connection URL (if you used MongoHQ, this will be available in their admin console).
7. In config.js, specify the phone numbers of the admins of this chat server, who will be able to post to the `#ann` channel.
8. Deploy this node.js application to the server of your choice.  My personal favorite free PaaS for node.js is [Heroku](http://www.heroku.com).
9. In the Twilio dashboard, configure `http://yourserver.com/sms` as the SMS URL for your Twilio number.
10. Your Twilio number is now configured to act as an SMS chat server!

## Usage Guide

Your Twilio number will accept text messages from anyone and subscribe them to the default chat channel (`#ann` by default).
Subscribers can delete their account at any time by texting `STOP` to the Twilio number.

By default, only the `#ann` channel is restricted to administrators for posting messages.  Anyone else can create a channel,
and anyone can post a message to that channel.  Anyone can subscribe or unsubscribe to any channel.

## Command Reference

* `STOP`: Unsubscribe and delete user information.
* `/sub [channel name]`: Subscribe to all messages sent to the given channel name
* `/unsub [channel name]`: Unsubscribe from messages sent to the given channel
* `/help`: print basic command help

## Sending Messages

Except for protected channels, any user can send a message to any channel by prefixing their message with a hash and
the name of the channel they want to post to:

`#twilio hey twilio hackers - let's grab beers after this.`

## PAQ (Potentially Asked Questions)

#### Why might I want to use Tyrion?

When you want to establish an ad-hoc mass notification system, and allow groups of people to organize and communicate
among themselves.  I'm thinking Tyrion will be super useful for conferences, user groups, hackathons, and other events
where timely communication is useful from organizers to attendees, and between the attendees themselves.  E-Mail isn't
immediate enough, and attendees won't know everyone's e-mail.  Tyrion is meant to enable ad hoc groups to quickly
form and coordinate.

#### Hey Kevin, I'm running an event and this sounds really cool, but I need help getting set up.

No problem - shoot me a mail and I'm happy to help: kwhinnery at twilio dot com.

## TODO

* Send messages in a background process (general scaling)
* Implement a white list and black list for phone numbers
* Bulk import phone numbers to a whitelist
* Better help messages, per command
* More granular permissions/controls for chat channels (op mode for channel creator, `/kick`, etc.)
* More robust user identification (`/nick` and so forth)
* Direct message to a specific nick
* Test specs :P
* Web interface?
* Implement MongoHQ REST API to make it easier to provision MongoDB?
