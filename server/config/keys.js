if(process.env.NODE_ENV == 'production') {
    // use production keys
    module.exports = require('./prod');
} else {
    // use development keys
    module.exports = require('./dev');
}