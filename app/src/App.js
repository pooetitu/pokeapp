import React, { useEffect, useState } from 'react';
import GameView from './views/GameView';
import LoginView from './views/LoginView';
import WelcomeView from './views/WelcomeView';
import ChooseView from './views/ChooseView';
import io from 'socket.io-client';

export default () => {
    const [name, setName] = useState();
    const [pokemon, setPokemon] = useState();
    const [socket, setSocket] = useState();
    const [data, setData] = useState();
    const [status, setStatus] = useState('waiting'); // waiting, playing, ended, terminated

    useEffect(() => {
        if (!name) {
            return;
        }

        setSocket(io(`http://localhost:3000?name=${name}`/*&pokemon=${pokemon}`*/));
    }, [name]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        // .on de l'index.html

        socket.on('started', localData => {
            setStatus('playing');
            console.log(localData);
            setData(localData);
        });

        socket.on('connected', () => {
            console.log('connected');
        });

        socket.on('connection_refused', () => {
            console.log('connection_refused :(');
        });


        socket.on('terminated', () => {
            console.log('game terminated');
        });

        socket.on('ended', data => {
            console.log('ended');
            console.log(data);
        })

        socket.on('moved', data => {
            console.log('moved');
            console.log(data);
        })

    }, [socket]);

    return (
        <div className="c-app">
            {name && !pokemon && <GameView data={data} status={status} socket={socket}/>}
            {!name && <LoginView setName={setName} />}
            {/* <WelcomeView /> */}
            {/*name && !pokemon && <ChooseView setPokemon={setPokemon}/>*/}
        </div>
    );
};
