var handlers = {};
handlers.home = function(data, callback) {
    callback(200, {'route': 'home', 'process': process});
};
handlers.noRouteFound = function(data, callback) {
    callback(404);
};
handlers.users = function(data, callback) {
    var acceptableMethods = ['get','post', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
}

handlers._users = {};

handlers._users.post = function(data, callback) {

}

handlers._users.get = function(data, callback) {
    
}

handlers._users.put = function(data, callback) {
    
}

handlers._users.delete = function(data, callback) {
    
}

module.exports = handlers;