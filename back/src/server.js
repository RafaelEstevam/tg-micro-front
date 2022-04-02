
const { server } = require('./http');
const userWebsocket = require('./websocket/users');

const porta = process.env.PORT || 8081;

server.listen(porta);