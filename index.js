/*
* Primary file for the API
*/

const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const handlers = require('./lib/handlers')

// http port server
const httpServer = http.createServer((req, res) => { unifiedServer(req, res); });

httpServer.listen(config.httpPort, () => {
    console.log('The server is listening on port '+config.httpPort);
});

//https port server
var httpsServerOptions = {
    'cert': fs.readFileSync('./https/cert.pem'),
    'key': fs.readFileSync('./https/key.pem')
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => { unifiedServer(req, res); })

httpsServer.listen(config.httpsPort, () => {
    console.log('The server is listening on port '+config.httpsPort);
});


var router = {
    'home': handlers.home,
    'users': handlers.users
}

var unifiedServer = (req, res) => {
    const parsedPath = url.parse(req.url, true);
    const trimmedPath = parsedPath.pathname.replace(/^\/+|\/+$/g,'');
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        // chosenHandler is handler function
        var chosenHandler = router[trimmedPath] ? router[trimmedPath] : handlers.noRouteFound;

        var data = {
            trimmedPath,
            'payload': buffer
        };

        chosenHandler(data, function(statusCode, payload){
            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            payload = typeof payload === 'object' ? payload : {};
            var payloadString = JSON.stringify(payload);
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};