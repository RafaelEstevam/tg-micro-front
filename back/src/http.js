const express = require('express');
const mysql = require('mysql');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');
const etl = require('./etl');
const routes = require('./routes');
// const interceptor = require('./utils/interceptor');

const app = express();
app.use(cors());
const server = http.Server(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

// mongoose.connect('mongodb+srv://tg:NxXEECNTK70X0a2O@tg.eftsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "educalytics"
});

let interval;

io.on("connection", (socket) => {
  if (interval) {
    clearInterval(interval);
  }
  socket.on("disconnect", () => {
    // console.log("Client disconnected");
    // clearInterval(interval);
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};


// app.use(function(req, res, next) {
//     // console.log(req.url);
//     // console.log(req.method);
//     interceptor(req, res);
//     next();
// });

app.use(express.json());
app.use(routes);

setInterval(() => {
  etl.executeETL();
}, 3600000);

module.exports = { server, io, con };