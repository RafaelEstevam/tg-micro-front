const userController = require("../controller/userController");
const User = require("../schemas/userService");
const Talk = require("../schemas/talkService");
const { io } = require('../http');

io.on('connect', (socket) => {

  socket.on('user_connected', (params) => {
    io.emit('reload_users_online', params);

    const { user_id } = params;
    const connection_id = socket.id;

    userController.refreshConnection({ user_id, connection_id });

  });

  socket.on('send_message', async (params) => {
    const {id, text, from_id, name, email} = params;

    let user = await User.findById(id);
    const created_at = new Date();

    const postMessage = {name, email, from_id, text, to_id: id, created_at};

    const talk = await Talk.create(postMessage);
    talk.save();

    io.to(user.connection_id).emit('recieve_message', (params));

  });

  socket.on('user_is_writing', async (params) => {
    const id = params["_id"];
    let user = await User.findById(id, {connection_id: 1, _id: 0});
    console.log(user);
    io.to(user.connection_id).emit('user_writing', (params));
  })

  socket.on('user_disconnected', () => {
    io.emit('reload_users_online');
  });

  socket.on('reload_connection', (params) => {
    io.emit('reload_chat_connection', (params));
  })

  // socket.on('access_attendant', (params) => {
  //   console.log('Atendente se conectou');
  // })

  // socket.on('i_am_offline', (params) => {
  //   io.emit('attendant_off_line', params);
  // });

  // socket.on('delivery_to_attendant', (params) => {
  //   io.to(params.attendant.from).emit('recieve_client', (params));
  // })

});