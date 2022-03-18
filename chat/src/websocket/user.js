import io from 'socket.io-client';

const WS = 'http://localhost:8081'

class UsersWebSocket {

    socket;
    client;

    constructor() {
        this.socket = io(WS);
        this.socket.on('connect', () => { console.log('Atendente conectado') });
        return this.socket;
    }

}

export { UsersWebSocket }