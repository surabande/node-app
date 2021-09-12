var environments = {};

environments.staging = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'staging'
};

environments.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: 'production'
};

var currentEnv = process.env.NODE_ENV || '';

module.exports = environments[currentEnv] || environments.staging;