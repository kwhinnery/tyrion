var express = require('express'),
    http = require('http'),
    path = require('path'),
    twilio = require('twilio'),
    tyrion = require('./lib'),
    pkg = require('./package.json'),
    config = require('./config'),
    mongoose = require('mongoose');

//Initialize the MongoDB connection
mongoose.connect(config.mongoUrl);

//initialize Tyrion from config
tyrion.init();

//Express app configuration
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

//Print server status
app.get('/', function(request, response) {
    response.type('text/html')
    response.send('<html><body><h1>Tyrion SMS Chat Server (v.'+pkg.version+')</h1> <p>Text <b>'+config.number+'</b> to subscribe.</p></body></html>');
});

//Handle incoming SMS
app.post('/sms', function(request, response) {
    //Only handle incoming requests from Twilio
    if (twilio.validateExpressRequest(request, config.authToken)) {
        //Create TwiML response
        var resp = new twilio.TwimlResponse();

        //Parse and handle the incoming message with tyrion
        tyrion.parseBody(request.body.Body, request.body.From, function(message) {
            if (message) resp.sms(message);
            response.type('text/xml');
            response.send(resp.toString());
        });
    }
    else {
        response.status(403);
        response.send('Forbidden');
    }
});

//Start express server
http.createServer(app).listen(app.get('port'), function () {
    console.log("Tyrion express.js server listening on port " + app.get('port'));
});
