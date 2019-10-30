const server = require('./server');

server.listen(process.env.PORT || 3400, () => {
    console.log('listening on ' + (process.env.PORT || 3400));
})