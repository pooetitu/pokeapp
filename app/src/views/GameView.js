import React from 'react';

export default ({ data, status, socket, setPokemon }) => {
    let message = '';
    if( status === 'waiting'){
        message = 'En attente d\'un autre joueur...';
    }else if(status ==='playing') {
        message = 'Le combat commence';
    } else if (status === 'terminated'){
        message = 'Partie terminé';
        setPokemon(null);
        socket.disconnect();
    } else if(status === 'ended'){

    }

    const triggerAction = (index) =>{
        if(data.turn === 'you'){
            socket.emit('move', index);
        }
    }
    const triggerAction1 =() =>{
        triggerAction(0);
    }
    const triggerAction2 =() =>{
        triggerAction(1);
    }
    const triggerAction3 =() =>{
        triggerAction(2);
    }
    const triggerAction4 =() =>{
        triggerAction(3);
    }
    return (
        <>
            <div className="c-game">
                <div className="c-game-row">
                {data?.opponent?.pokemon && (
                    <div className="c-pokemon-info">
                    {data.opponent.pokemon.name}
                        <div className="c-pokemon__hp" style={{ '--pokemon-hp-percent': data.opponent.pokemon.hp }} />
                    </div>
                )}
                    <div className="c-pokemon">
                        <div className="c-pokemon__image">
                            {data?.opponent?.pokemon && (
                                <img alt="Opponent Pokemon" src={data.opponent.pokemon.image} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="c-game-row">
                    <div className="c-pokemon">
                        <div className="c-pokemon__image">
                                {data?.you?.pokemon && (
                                <img 
                                alt="Mine Pokemon" 
                                src={data.you.pokemon.image}
                                />
                                )}
                        </div>
                    </div>
                    {data?.you?.pokemon && (
                    <div className="c-pokemon-info">
                        {data.you.pokemon.name}
                        <div className="c-pokemon__hp" style={{ '--pokemon-hp-percent': data.you.pokemon.hp }} />
                    </div>
                    )}
                </div>
            </div>
            <div className="c-game-info">
                <div className="c-message">
                    {message}
                    <div className="c-form u-mt-base">
                        <button onClick={() => {socket.disconnect(); setPokemon(null);}}>Retourner au menu</button>
                    </div>
                </div>
                {data?.you?.pokemon && (
                <div className="c-actions">
                    <button className="c-actions__action" onClick={(triggerAction1)  }>
                    {data.you.pokemon.moves[0].name}
                    </button>
                    <button className="c-actions__action" onClick={(triggerAction2) }>
                    {data.you.pokemon.moves[1].name}
                    </button>
                    <button className="c-actions__action" onClick={(triggerAction3) }>
                    {data.you.pokemon.moves[2].name}
                    </button>
                    <button className="c-actions__action" onClick={(triggerAction4) } >
                    {data.you.pokemon.moves[3].name}
                    </button>
                </div>
                )}
            </div>
        </>
    );
};
