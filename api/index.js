import http from 'http';
import socketIO from 'socket.io'

const server = http.createServer((req, res) => {
    res.write('Hello world');
    res.end();
});

const port = 3000;
server.listen(port, () => {
    console.log('server listenning');
});

const io = socketIO(server);
io.onconnection('connection', socket => {
    console.log('someone is connected');
});