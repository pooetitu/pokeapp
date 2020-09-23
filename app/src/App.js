import React, { useEffect, useState } from 'react';
import GameView from './views/GameView';
import LoginView from './views/LoginView';
import WelcomeView from './views/WelcomeView';
import ChooseView from './views/ChooseView';
import io from 'socket.io-client';
export default () => {
    const [name, setName] = useState();
    const [socket, setSocket] = useState();

    useEffect(() => {
        if(!name){
            return;
        }
        setSocket(io(`http://localhost:3000?name=${name}`));
    }, [name]);

    return (
        <div className="c-app">
            {name && <GameView />}
            {!name && <LoginView setName = {setName}/>}
            {/* <WelcomeView /> */}
            {/* <ChooseView /> */}
        </div>
    );
};
