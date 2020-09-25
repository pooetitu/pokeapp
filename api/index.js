import http from 'http';
import socketIO from 'socket.io'
import { startGame, terminateGame, handleMove } from './game';
import pokemons from './pokemons';


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
    const name = socket.handshake.query.name || 'Someone';
    const pokemonIndex = socket.handshake.query.pokemon || 0;
    console.log('chosen pokemon' + pokemonIndex);
    console.log(`${name} is connected`);
    socket.emit('connected');

    if (players.length < 2) {
        players.push({ name, socket, pokemon: {...pokemons[pokemonIndex]} });
        
    } else {
        socket.emit('connection_refused');
        socket.disconnect();
    }

    if (2 === players.length) {
        startGame(players, config);
    }

    socket.on('disconnect', () => {
        console.log(`${name} has disconnected`);
        terminateGame(socket, players);
    });

    socket.on('move', moveId => {
        handleMove(moveId, players, config);
    });
});