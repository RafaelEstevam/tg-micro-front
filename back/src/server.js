// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const routes = require('./routes');
// // const interceptor = require('./utils/interceptor');

// const app = express();
// app.use(cors());
// const server = http.Server(app);
// const io = socketIo(server, {
//     cors: {
//         origin: '*',
//     }
// });

// mongoose.connect('mongodb+srv://tg:NxXEECNTK70X0a2O@tg.eftsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// let interval;

// io.on("connection", (socket) => {
//     console.log("New client connected");
//     if (interval) {
//         clearInterval(interval);
//     }
//     interval = setInterval(() => getApiAndEmit(socket), 1000);
//     socket.on("disconnect", () => {
//         // console.log("Client disconnected");
//         clearInterval(interval);
//     });
// });

// const getApiAndEmit = socket => {
//     const response = new Date();
//     // Emitting a new message. Will be consumed by the client
//     socket.emit("FromAPI", response);
// };


// // app.use(function(req, res, next) {
// //     // console.log(req.url);
// //     // console.log(req.method);
// //     interceptor(req, res);
// //     next();
// // });

// app.use(express.json());
// app.use(routes);
// const porta = process.env.PORT || 8081;

const { server } = require('./http');
const userWebsocket = require('./websocket/users');

const porta = process.env.PORT || 8081;

server.listen(porta);