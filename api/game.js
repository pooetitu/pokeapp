import pokemons from './pokemons';

export const startGame = (players, config) => {
    console.log('Game starting...');
    config['turn'] = Math.floor(Math.random() * 1);
    console.log('player turn is set to ' + config.turn)
    for(const [index, player] of players.entries()){
        const {socket, ...you} = player; 
        const {socket: _, ...opponent} = players.find(player => player.socket.id !== socket.id);
        socket.emit('started',{
            you,
            opponent,
            turn: index === config.turn ? 'you' : 'opponent',
        });
    }
};

export const terminateGame = (socket, players) => {
    console.log('Game terminating...');
    const index = players.findIndex(player=> player.socket.id === socket.id);
    if(index != -1){
        players.splice(index,1)
        console.log('');
    }
    for(const player of players){
        player.pokemon = null;
        socket.emit('terminated');
    }
};

export const handleMove = (moveId, players, config) => {
    let activePlayer = players[config.turn];
    let opponent = players.find(player => player.socket.id !== activePlayer.socket.id);
    let move = activePlayer.pokemon.moves[moveId];

    // Damage randomisation
    let modifier = move.power * 0.5;
    let rndModifier = Math.round(Math.random() * (modifier - (-modifier)) + (-modifier));
    let damage = move.power + rndModifier;
    
    console.log(`${activePlayer.name} with "${activePlayer.pokemon.name}" has played "${move.name}"`);
    console.log(`${opponent.pokemon.name} (${opponent.pokemon.hp}hp) has taken ${damage} damages`);
    if(opponent.pokemon.hp - damage <= 0){
        opponent.pokemon.hp = 0;
        endGame(players);
    }
    else{
        opponent.pokemon.hp -= damage;
        updateGame(moveId, players, config);
    }
};

const updateGame = (moveId, players, config) => {
    config.turn = Number(!config.turn);
    for(const [index, player] of players.entries()){
        const {socket, ...you} = player; 
        const {socket: _, ...opponent} = players.find(player => player.socket.id !== socket);
        player.socket.emit('moved',{
            you,
            opponent,
            moveId,
            turn: index === config.turn ? 'you' : 'opponent',
        });
    }
};

const endGame = players => {
    console.log('Game ending...');
    let winnerIndex = players.findIndex(player => player.pokemon.hp > 0);
    for(const [index, player] of players.entries()){
        const {socket, ...you} = player; 
        const {socket: _, ...opponent} = players.find(player => player.socket.id !== socket);
        player.socket.emit('ended', {
            you,
            opponent,
            win: index === winnerIndex,
        })
    }
};