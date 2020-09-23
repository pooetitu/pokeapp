import pokemons from './pokemons';

export const startGame = (players, config) => {
    console.log('Game starting...');
    config['turn'] = Math.floor(Math.random() * 1);
    console.log('player turn is set to ' + config.turn)
    for (let player of players){
        let rndPokemon = Math.floor(Math.random() * pokemons.length);
        console.log(pokemons[rndPokemon].name + ' Assigned to ' + player['name']);
        player['pokemon'] = pokemons[rndPokemon];
    }
    for (let i=0;i<players.length;i++) {

        let you = {name: players[i].name, pokemon: players[i].pokemon}
        let opponent = {name: players[!i | 0].name, pokemon: players[!i | 0].pokemon}
        players[i].socket.emit('started', {
            you: you,
            opponent: opponent,
            turn: i === config.turn ? 'you' : 'opponent',
        });
    }
};

export const terminateGame = (socket, players) => {
    console.log('Game terminating...');

    // TODO
};

export const handleMove = (moveId, players, config) => {
    // console.log(`${activePlayer.name} with "${activePlayer.pokemon.name}" has played "${move.name}"`);
    // console.log(`${opponent.pokemon.name} (${opponent.pokemon.hp}hp) has taken ${move.power} damages`);

    // TODO
};

const updateGame = (moveId, players, config) => {
    // TODO
};

const endGame = players => {
    console.log('Game ending...');

    // TODO
};