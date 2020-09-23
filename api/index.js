import http from 'http';
import socketIO from 'socket.io'


const players = [];
const config = { turn: 0 };

const server = http.createServer((req, res) => {
    res.write('Hello world');
    res.end();
});

const port = 3000;
server.listen(port, () => {
    console.log('server listenning');
});

const io = socketIO(server, {  
    pingTimeout: 60000,
});


io.on('connection', socket => {
    socket.emit('connected', 'test emit');
    addNewPlayer(socket)
    socket.on('disconnect', () => {
        console.log('someone disconnected');
    });
});

function addNewPlayer(socket){
    if(players.length < 2){
        let name = socket.handshake.query.name;
        let number = Math.floor(Math.random() * Math.floor(99999));
        name += '-' + number;
        console.log(name + ' is connected');
        players.push(name);
    }
    else{
        socket.emit('Too many players connected');
        socket.disconnect();
    }
}