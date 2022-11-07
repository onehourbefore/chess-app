import React from 'react';
import cl from './Buttons.module.scss';


interface ButtonsProps {
    restart: () => void;
    startGame: () => void;
}

const Buttons: React.FC <ButtonsProps> = (
    {
        restart,
        startGame
    }
) => {
    return (
        <div className={cl.root}>
            <button
                className={cl.root_button}
                onClick={startGame}>
                Начать игру
            </button>
            <button
                className={cl.root_button}
                onClick={restart}>
                Рестарт
            </button>
        </div>
    );
};

export default Buttons;