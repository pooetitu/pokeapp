import React, { useEffect, useState } from 'react';
import GameView from './views/GameView';
import LoginView from './views/LoginView';
import WelcomeView from './views/WelcomeView';
import ChooseView from './views/ChooseView';
import io from 'socket.io-client';

export default () => {
    const [name, setName] = useState();
    const [socket, setSocket] = useState();
    const [data, setData] = useState();
    const [status, setStatus] = useState('waiting'); // waiting, playing, ended, terminated

    useEffect(() => {
        if (!name) {
            return;
        }

        setSocket(io(`http://localhost:3000?name=${name}`));
    }, [name]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('started', localData => {
            setStatus('playing');
            console.log(localData);
            setData(localData);
            if ('you' === localData.turn) {
                socket.emit('move', 3);
            }
        });
        // .on de l'index.html

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

            if ('you' === data.turn) {
                socket.emit('move', 3);
            }
        })

    }, [socket]);

    return (
        <div className="c-app">
            {name && <GameView data={data} status={status}/>}
            {!name && <LoginView setName={setName} />}
            {/* <WelcomeView /> */}
            {/* <ChooseView /> */}
        </div>
    );
};
