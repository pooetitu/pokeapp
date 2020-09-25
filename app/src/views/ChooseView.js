import React, { useState } from 'react';

export default ({ setPokemon }) => {
    return (
        <div className="c-page">
            <div className="c-choose">
                <div className="c-box">
                    <div className="u-color-white u-mb-lg">Choisissez votre Pokemon</div>
                    <div className="u-d-flex">
                        <img
                            alt="Opponent Pokemon"
                            onClick={() =>setPokemon(0)}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                        />
                        <img
                            alt="Opponent Pokemon"
                            onClick={() => setPokemon(1)}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                        />
                        <img
                            alt="Opponent Pokemon"
                            onClick={() => setPokemon(2)}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
                        />
                        <img
                            alt="Opponent Pokemon"
                            onClick={() => setPokemon(3)}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        />
                        <img
                            alt="Opponent Pokemon"
                            onClick={() => setPokemon(4)}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
