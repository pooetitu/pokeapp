import React from 'react';

export default () => {
    return (
        <div className="c-page">
            <div className="c-welcome">
                <div className="c-box">
                    <div className="c-form u-color-white">
                        <div className="u-mb-lg">Bonjour Quentin !</div>
                        <div className="u-font-size-xl u-mb-lg">Classement</div>
                        <ul className="u-mb-lg">
                            <li>1. Quentin | 12 wins</li>
                            <li>2. Marion | 7 wins</li>
                            <li>3. Alex | 4 wins</li>
                            <li>4. Greg | 2 wins</li>
                            <li>5. Noob | 0 win</li>
                        </ul>
                        <button type="submit" onClick={() => console.log('TODO')}>
                            Lancer une partie
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
